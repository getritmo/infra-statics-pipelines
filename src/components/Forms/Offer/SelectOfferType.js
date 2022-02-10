import { CustomButton } from 'components/UI'
import React from 'react'
import { useIntl } from 'react-intl'

const SelectOfferType = ({ setFormType }) => {
  const { formatMessage } = useIntl()
  return (
    <div className="panel__select">
      <h2 className="panel__select--title">
        <b>
          {formatMessage({ id: 'components.selectOfferForm.select_product' })}
        </b>
      </h2>
      <div className="panel__select--buttons">
        <CustomButton
          variant="outlined"
          onClick={() => {
            setFormType('createOffer')
          }}
          label={formatMessage({
            id: 'components.selectOfferForm.growth_capital',
          })}
        />
        <CustomButton
          variant="outlined"
          onClick={() => {
            setFormType('createInvoiceOffer')
          }}
          label={formatMessage({
            id: 'components.selectOfferForm.invoice_finance',
          })}
        />
      </div>
    </div>
  )
}

export default SelectOfferType
