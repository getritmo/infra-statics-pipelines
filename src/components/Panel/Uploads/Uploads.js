import React from 'react'
import FinanceUploads from './FinanceUploads'
import { useSelector } from 'react-redux'
import CsvUploads from './CsvUploads'

const Uploads = () => {
  const subtype = useSelector((state) => state.globalState.panel.subtype)

  switch (subtype) {
    case 'financeDocuments':
    case 'bankStatement':
      return <FinanceUploads />
    case 'csv':
      return <CsvUploads />
    default:
      return null
  }
}

export default Uploads
