/* eslint-disable */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { panelFormGoNext, panelFormGoBack, closePanel } from 'actions/global'
import useAPI from 'hooks/useAPI'
import { offerFormSchema } from './offerFormSchema'
import CreateOfferForm from '../Offer/future/CreateOfferForm'
import { setCompany } from 'actions/appData'

const OfferForm = () => {
  const [loading, setLoading] = useState(false)

  const mode = useSelector((state) => state.globalState.panel.mode)
  const formData = useSelector((state) => state.globalState.panel.formData)

  const dispatch = useDispatch()
  const { apiCallApplicationsAdmin } = useAPI()

  const goNext = (form) => {
    dispatch(
      panelFormGoNext({
        formData: form,
        mode: 'validate',
      }),
    )
  }

  const goBack = () => {
    dispatch(
      panelFormGoBack({
        mode: 'update',
      }),
    )
  }

  const onSubmit = async () => {
    setLoading(true)
    const body = {}

    for await (const item of updateCompanyFormSchema) {
      body[item.id] = item.parseValue(formData[item.id])
    }

    try {
      // Request changes
      await apiCallApplicationsAdmin(
        `/companies/${formData.company_id}`,
        'PATCH',
        body,
      )
      let data = await apiCallApplicationsAdmin(
        `/companies/${formData.company_id}`,
        'GET',
      )
      dispatch(setCompany(data))
      dispatch(closePanel())
    } catch (e) {
      setLoading(false)
      //TODO show error message
      console.error('ERROR on SUBMITTING offer form: ', e)
    }
  }

  switch (mode) {
    case 'create':
      return <CreateOfferForm onSubmit={goNext} />
    // case 'update':
    //   return <UpdateCompanyForm onSubmit={goNext} />
    // case 'validate':
    //   return (
    //     <ReadCompanyForm
    //       loading={loading}
    //       onSubmit={onSubmit}
    //       goBack={goBack}
    //     />
    //   )
    default:
      return null
  }
}

export default OfferForm
