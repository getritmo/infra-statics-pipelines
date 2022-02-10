import React from 'react'
import CreateOfferForm from './CreateOfferForm'
import ReadOfferForm from './ReadOfferForm'

const OfferForm = ({
  type,
  subtype,
  formData,
  onSubmit,
  onFileSelect,
  onFileDelete,
  goNext,
  goBack,
  isConfirmation,
  onDelete,
  applicationId,
  getApplicationId,
}) => {
  switch (subtype) {
    case 'create':
      return (
        <CreateOfferForm
          onSubmit={goNext}
          {...{ formData, onFileSelect, onFileDelete }}
        />
      )
    case 'read':
      return (
        <ReadOfferForm
          {...{
            formData,
            type,
            isConfirmation,
            onDelete,
            onSubmit,
            goBack,
            applicationId,
            getApplicationId,
          }}
        />
      )
    default:
      return null
  }
}

export default OfferForm
