import { closePanel, panelFormGoBack, panelFormGoNext } from 'actions/global'
import { paymentFormSchema } from 'components/Forms/formsSchema'
import { parseForm, parsePaymentNumericInputs } from 'components/Forms/utils'
import useAPI from 'hooks/useAPI'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CreatePaymentForm from './CreatePaymentForm'
import ValidatePaymentForm from './ValidatePaymentForm'
import useAsyncActions from 'hooks/useAsyncActions'
import { LoadingSize } from 'components/Loading'

const PaymentForm = () => {
  const {
    application: { application_id },
  } = useSelector((state) => state.appData)
  const {
    panel: { mode, formData, paymentId, fileId, isLoading = false },
  } = useSelector((state) => state.globalState)
  const dispatch = useDispatch()

  const { apiCallApplicationsAdminFormData, apiFileFetch } = useAPI()
  const { getPaymentsByApplicationId } = useAsyncActions()

  const [formToSend, setFormToSend] = useState(new FormData())
  const [initialMode] = useState(mode)

  useEffect(() => {
    //Fetch file
    const fetchFile = async (fileId) => {
      const file = await apiFileFetch(`admin/uploads/${fileId}`, 'GET')
      setFormToSend((s) => {
        s.append('file', file)
        return s
      })
    }
    if (mode === 'update' && !formToSend.get('file')) {
      fetchFile(fileId)
    }
  }, [apiFileFetch, fileId, mode, formToSend])

  const goNext = (form) => {
    dispatch(
      panelFormGoNext({
        formData: parsePaymentNumericInputs(form),
        mode: 'validate',
      }),
    )
  }

  const goBack = () => {
    dispatch(
      panelFormGoBack({
        mode: initialMode,
      }),
    )
  }

  const onFileSelect = async (file) => {
    setFormToSend((s) => {
      s.append('invoice', file)
      return s
    })
  }

  const onFileDelete = async () => {
    setFormToSend((s) => {
      s.delete('invoice')
      return s
    })
  }

  const onSubmit = async () => {
    // 1 - Parse FormData
    const parsedFormData = await parseForm(
      parsePaymentNumericInputs(formData),
      paymentFormSchema,
    )
    // 2 - Append data to form to send
    const paymentToSave = formToSend
    const formKeys = Object.keys(parsedFormData)
    await formKeys.forEach((field) =>
      paymentToSave.append(field, parsedFormData[field]),
    )

    // 3 - Submit FormData
    try {
      const url = `/applications/${application_id}/offers/${formData.offerId}/deployments/${formData.id_deployment}/payments`
      await apiCallApplicationsAdminFormData(url, 'POST', paymentToSave)
      getPaymentsByApplicationId()
    } catch (e) {
      console.error('ERROR when submiting payment form: ', e)
    } finally {
      dispatch(closePanel())
    }
  }

  const onUpdate = async () => {
    // 1 - Parse FormData
    const parsedFormData = await parseForm(
      parsePaymentNumericInputs(formData),
      paymentFormSchema,
    )
    // 2 - Append data to form to send
    const paymentToSave = formToSend
    const formKeys = Object.keys(parsedFormData)
    await formKeys.forEach((field) =>
      paymentToSave.append(field, parsedFormData[field]),
    )
    // 3 - Submit FormData

    try {
      const url = `/payments/${paymentId}`
      await apiCallApplicationsAdminFormData(url, 'PUT', paymentToSave)
      getPaymentsByApplicationId()
    } catch (e) {
      // Here has to be set the alert error
    } finally {
      dispatch(closePanel())
    }
  }

  if (isLoading)
    return (
      <div className="spinner__container--top">
        <LoadingSize size={60} />
      </div>
    )

  switch (mode) {
    case 'create':
    case 'update':
      return (
        <CreatePaymentForm
          onSubmit={goNext}
          onFileSelect={onFileSelect}
          onFileDelete={onFileDelete}
          editMode={mode === 'update'}
        />
      )
    case 'validate':
      return (
        <ValidatePaymentForm
          // loading={loading}
          onSubmit={initialMode === 'create' ? onSubmit : onUpdate}
          goBack={goBack}
        />
      )
    default:
      return null
  }
}

export default PaymentForm
