import React from 'react'
import CompanyForm from './CompanyForms'
import { useSelector } from 'react-redux'
import PaymentForm from './Payments/PaymentsForms'

const Forms = () => {
  const subtype = useSelector((state) => state.globalState.panel.subtype)

  return (
    <div>
      {subtype === 'company' && <CompanyForm />}
      {subtype === 'payment' && <PaymentForm />}
    </div>
  )
}

export default Forms
