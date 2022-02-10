import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { CustomButton, CustomViewer } from 'components/UI'
import { useSelector } from 'react-redux'
import { LoadingSize } from 'components/Loading'

const ValidatePaymentForm = ({ goBack, onSubmit }) => {
  const {
    globalState: {
      panel: { formData, mode },
    },
  } = useSelector((state) => state)

  const isConfirmation = mode === 'validate'
  const { formatMessage, formatNumber, formatDate } = useIntl()
  const [loading, setLoading] = useState(false)
  const multiplier = isConfirmation ? 1 : 0.01
  const percentageMultiplier = isConfirmation ? 100 : 10000

  return (
    <div className="panel__content--scroll--wrapper">
      <form id="view-payment-form">
        <h2 className="rform__section--title">
          <b>{formatMessage({ id: 'components.paymentForm.paymentData' })}</b>
        </h2>
        <div className="rform__confirmation--row">
          <CustomViewer
            name="id_deployment"
            title={formatMessage({ id: 'components.paymentForm.idDeployment' })}
            value={formData.id_deployment}
          />
          <CustomViewer
            name="invoice_number"
            title={formatMessage({
              id: 'common.invoice_number',
            })}
            value={formData.invoice_number}
          />
        </div>
        <div className="rform__confirmation--row">
          <CustomViewer
            name="start_date"
            title={formatMessage({ id: 'components.paymentForm.startDate' })}
            value={formatDate(formData.start_date)}
          />
          <CustomViewer
            name="end_date"
            title={formatMessage({ id: 'components.paymentForm.endDate' })}
            value={formatDate(formData.end_date)}
          />
        </div>
        <div className="rform__confirmation--row">
          <CustomViewer
            name="income"
            title={formatMessage({ id: 'common.Income' })}
            value={formatNumber(multiplier * formData.income, {
              style: 'currency',
              currency: formData.currency.toUpperCase(), // Tengo que traerme la currency!
              minimumFractionDigits: 2,
            })}
          />
          <CustomViewer
            name="revenue_share"
            title={formatMessage({ id: 'components.paymentForm.revenueShare' })}
            value={formatNumber(formData.revenue_share / percentageMultiplier, {
              style: 'percent',
              minimumFractionDigits: 2,
            })}
          />
        </div>
        <div className="rform__confirmation--row">
          <CustomViewer
            name="quantity"
            title={formatMessage({ id: 'common.Quantity' })}
            value={formatNumber(multiplier * formData.quantity, {
              style: 'currency',
              currency: formData.currency.toUpperCase(), // Tengo que traerme la currency!
              minimumFractionDigits: 2,
            })}
          />
          <CustomViewer
            name="outstanding_balance"
            title={formatMessage({
              id: 'components.paymentForm.outstandingBalance',
            })}
            value={formatNumber(multiplier * formData.outstanding_balance, {
              style: 'currency',
              currency: formData.currency.toUpperCase(), // Tengo que traerme la currency!
              minimumFractionDigits: 2,
            })}
          />
        </div>

        {isConfirmation && formData.invoice && (
          <>
            <div className="rform__section--separator" />
            <h2 className="rform__section--title">
              <b>{formatMessage({ id: 'common.Files' })}</b>
            </h2>
            <div className="rform__item--file-container">
              <div className="rform__item--file-icon offer-file" />
              <div className="rform__item--file-name">
                <span>{formData.invoice}</span>
              </div>
            </div>
          </>
        )}

        {isConfirmation && (
          <div className="rform__confirmation--footer">
            {!loading && (
              <CustomButton
                label={formatMessage({ id: 'common.Back' })}
                onClick={goBack}
                color="cancel"
                variant="outlined"
                position="left"
                classes="rform__confirmation--footer-button"
              />
            )}
            {loading ? (
              <div className={'rform__confirmation--footer-loader float-right'}>
                <LoadingSize size={48} />
              </div>
            ) : (
              <CustomButton
                label={formatMessage({ id: 'common.Save' })}
                color="alert"
                position="right"
                classes="rform__confirmation--footer-button"
                onClick={() => {
                  setLoading(true)
                  onSubmit()
                }}
              />
            )}
          </div>
        )}
      </form>
    </div>
  )
}

ValidatePaymentForm.propTypes = {
  /** formData, object containing information to source the form default data. It might be left empty. */
  // formData: PropTypes.object,
  /** isConfirmation: boolean value indicating if is a form confirmation view or just a payment data consulting */
  // isConfirmation: PropTypes.bool,
  /** goBack, function to handle step back in form submission */
  goBack: PropTypes.func,
  /** onSubmit, function that will be executed when the form is submitted. */
  onSubmit: PropTypes.func,
}

export default ValidatePaymentForm
