import React, { useState } from 'react'
import UpdateCompanyForm from './UpdateCompanyForm'
import ReadCompanyForm from './ReadCompanyForm'
import { useSelector, useDispatch } from 'react-redux'
import { panelFormGoNext, panelFormGoBack, closePanel } from 'actions/global'
import useAPI from 'hooks/useAPI'
import { updateCompanyFormSchema } from './companyFormSchema'
import { setCompany } from 'actions/appData'

const CompanyForm = () => {
  const {
    globalState: {
      panel: { mode, formData },
    },
  } = useSelector((state) => state)

  const dispatch = useDispatch()
  const { apiCallApplicationsAdmin } = useAPI()
  const [loading, setLoading] = useState(false)

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
      console.error('ERROR when SUBMITTING company form: ', e)
    }
  }

  switch (mode) {
    case 'update':
      return <UpdateCompanyForm onSubmit={goNext} />
    case 'validate':
      return (
        <ReadCompanyForm
          loading={loading}
          onSubmit={onSubmit}
          goBack={goBack}
        />
      )
    default:
      return null
  }
}

export default CompanyForm
