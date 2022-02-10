import React from 'react' // useState
import CustomViewer from '../../UI/CustomViewer'
import { useIntl } from 'react-intl'
import { CustomButton } from '../../UI'
// import Dialog from '../../Dialog/Dialog'
import { v4 } from 'uuid'

const ViewInvoiceOffer = ({
  formData,
  isConfirmation = false,
  goBack,
  onSubmit,
  // onDelete,
  // type,
}) => {
  const { formatMessage, formatNumber } = useIntl()
  // const [openDialog, setOpenDialog] = useState(false)
  // const [dialogProps, setDialogProps] = useState(undefined)

  const percentageMultiplier = isConfirmation ? 100 : 10000
  const multiplier = isConfirmation ? 1 : 0.01

  // NOT AVAILABLE YET

  // const openDeleteDialog = () => {
  //   setDialogProps({
  //     title: formatMessage(
  //       { id: 'components.dialog.oneItem' },
  //       {
  //         action: formatMessage({ id: 'components.dialog.deleteAction' }),
  //         type: formatMessage({ id: `components.dialog.${type}` }),
  //         id: formData.id,
  //       },
  //     ),
  //     acceptLabel: formatMessage({ id: 'common.Delete' }),
  //     cancelLabel: formatMessage({ id: 'common.Cancel' }),
  //     onCancel: () => {
  //       setOpenDialog(false)
  //       setDialogProps(undefined)
  //     },
  //     onAccept: async () => {
  //       onDelete()
  //     },
  //   })
  //   setOpenDialog(true)
  // }

  return (
    <>
      {/* {openDialog && (
        <Dialog
          title={dialogProps.title}
          acceptLabel={dialogProps.acceptLabel}
          cancelLabel={dialogProps.cancelLabel}
          disableClose
          onAccept={dialogProps.onAccept}
          onCancel={dialogProps.onCancel}
        />
      )} */}

      <div className="panel__content--scroll--wrapper">
        <div className="panel__content--scroll">
          <form id="view-offer-form">
            <h2 className="rform__confirmation--title">
              <b>
                {formatMessage({
                  id: 'components.panel.form.if_offer.offer_details',
                })}
              </b>
            </h2>
            <div className="rform__confirmation--row">
              <CustomViewer
                name="currency"
                title={formatMessage({ id: 'common.Currency' })}
                value={formatMessage({
                  id: `common.currency.${formData.currency}`,
                })}
              />
              <CustomViewer
                name="total_credit_limit"
                title={formatMessage({ id: 'common.Product' })}
                value={formatNumber(multiplier * formData.total_credit_limit, {
                  style: 'currency',
                  currency: formData.currency.toUpperCase(),
                  minimumFractionDigits: 2,
                })}
              />
            </div>
            <h2 className="rform__confirmation--title if-form">
              <b>
                {formatMessage({
                  id: 'components.panel.form.if_offer.allowed_repayments',
                })}
              </b>
            </h2>
            <div className="rform__confirmation--options-section">
              {formData.amortization_plans.map((plan, i) => (
                <div key={v4()} className="rform__confirmation--option">
                  <div className="rform__confirmation--row">
                    <CustomViewer
                      name={`amortization_plans[${i}].period`}
                      title={formatMessage({
                        id: 'components.panel.form.if_offer.period',
                      })}
                      value={plan.period}
                    />
                    <CustomViewer
                      name={`.amortization_plans[${i}].commission_rate`}
                      title={formatMessage({
                        id: 'common.Commission_rate',
                      })}
                      value={formatNumber(
                        plan.commission_rate / percentageMultiplier,
                        {
                          style: 'percent',
                          minimumFractionDigits: 2,
                        },
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
            {isConfirmation ? (
              <div className="rform__confirmation--footer">
                <CustomButton
                  label={formatMessage({ id: 'common.Back' })}
                  onClick={goBack}
                  color="cancel"
                  variant="outlined"
                  position="left"
                  classes="rform__confirmation--footer-button"
                />
                <CustomButton
                  label={formatMessage({ id: 'common.Save' })}
                  color="alert"
                  position="right"
                  classes="rform__confirmation--footer-button"
                  onClick={onSubmit}
                />
              </div>
            ) : (
              <div className="rform__confirmation--footer">
                {/* NOT AVAILABLE AT THE MOMENT */}
                {/* <CustomButton
                  label={formatMessage({ id: 'common.Delete' })}
                  onClick={openDeleteDialog}
                  color="alert"
                  variant="outlined"
                  position="right"
                  classes="rform__confirmation--footer-button"
                /> */}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default ViewInvoiceOffer
