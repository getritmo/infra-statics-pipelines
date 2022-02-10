import React, { Fragment, useState } from 'react'
import CustomViewer from '../../UI/CustomViewer'
import { useIntl } from 'react-intl'
import { stringifyNumber } from '../utils'
import { CustomButton } from '../../UI'
import Dialog from '../../Dialog/Dialog'
import useAPI from 'hooks/useAPI'

const ViewOffer = ({
  formData,
  isConfirmation = false,
  goBack,
  onSubmit,
  onDelete,
  type,
}) => {
  const { formatMessage, formatNumber, formatDate } = useIntl()
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogProps, setDialogProps] = useState(undefined)

  const { apiFileDownload } = useAPI()

  const multiplier = isConfirmation ? 1 : 0.01
  const percentageMultiplier = isConfirmation ? 100 : 10000

  const openDeleteDialog = () => {
    setDialogProps({
      title: formatMessage(
        { id: 'components.dialog.oneItem' },
        {
          action: formatMessage({ id: 'components.dialog.deleteAction' }),
          type: formatMessage({ id: `components.dialog.${type}` }),
          id: formData.id,
        },
      ),
      acceptLabel: formatMessage({ id: 'common.Delete' }),
      cancelLabel: formatMessage({ id: 'common.Cancel' }),
      onCancel: () => {
        setOpenDialog(false)
        setDialogProps(undefined)
      },
      onAccept: async () => {
        onDelete()
      },
    })
    setOpenDialog(true)
  }

  const downloadFile = async (fileId) => {
    const url = `/admin/uploads/${fileId}`
    await apiFileDownload(url, 'GET', formData.files[0].name)
  }

  return (
    <>
      {openDialog && (
        <Dialog
          title={dialogProps.title}
          acceptLabel={dialogProps.acceptLabel}
          cancelLabel={dialogProps.cancelLabel}
          disableClose
          onAccept={dialogProps.onAccept}
          onCancel={dialogProps.onCancel}
        />
      )}

      <div className="panel__content--scroll--wrapper">
        <div className="panel__content--scroll">
          <form id="view-offer-form">
            <h2 className="rform__confirmation--title">
              <b>{formatMessage({ id: 'common.Contract' })}</b>
            </h2>
            <div className="rform__confirmation--row">
              <CustomViewer
                name="product"
                title={formatMessage({ id: 'common.Product' })}
                value={formatMessage({
                  id: `components.offerForm.${formData.type}`,
                })}
              />
              <CustomViewer
                name="currency"
                title={formatMessage({ id: 'common.Currency' })}
                value={formatMessage({
                  id: `common.currency.${formData.currency}`,
                })}
              />
            </div>
            <div className="rform__confirmation--row">
              <CustomViewer
                name="grace_days"
                type="number"
                title={formatMessage({
                  id: 'components.offerForm.grace_period',
                })}
                value={formData.grace_days ?? 0}
              />
              <CustomViewer
                name="is_accepted"
                title={formatMessage({ id: 'components.offerForm.accepted' })}
                value={formatMessage({
                  id: `components.offerForm.${
                    formData.is_accepted === true ||
                    formData.is_accepted === 'true'
                  }`,
                })}
              />
            </div>

            {formData.deployments.map((deploy, i) => {
              if (i === 0) {
                return (
                  <div key="confirm-deploy-1">
                    {/* First deployment */}
                    <div className="rform__section--separator" />
                    <h2 className="rform__confirmation--title">
                      <b>
                        {formatMessage({
                          id: `data.ordinals.${stringifyNumber(1)}`,
                        })}{' '}
                        Deployment
                      </b>
                    </h2>
                    <div className="rform__confirmation--row">
                      <CustomViewer
                        name="loan_amount"
                        title={formatMessage({
                          id: 'components.offerForm.loan_amount',
                        })}
                        value={formatNumber(
                          multiplier * deploy.scenarios[0].raw_amount,
                          {
                            style: 'currency',
                            currency: formData.currency.toUpperCase(),
                            minimumFractionDigits: 2,
                          },
                        )}
                      />
                      <CustomViewer
                        name="commission_rate"
                        title={formatMessage({
                          id: 'components.offerForm.commission_rate',
                        })}
                        value={formatNumber(
                          deploy.commission_rate / percentageMultiplier,
                          {
                            style: 'percent',
                            minimumFractionDigits: 2,
                          },
                        )}
                      />
                    </div>
                    <div className="rform__confirmation--row">
                      <CustomViewer
                        name="total_refund_amount"
                        title={formatMessage({
                          id: 'components.offerForm.total_refund',
                        })}
                        value={formatNumber(
                          multiplier *
                            deploy.scenarios[0].raw_amount *
                            (1 + (multiplier * deploy.commission_rate) / 100),
                          {
                            style: 'currency',
                            currency: formData.currency.toUpperCase(),
                            minimumFractionDigits: 2,
                          },
                        )}
                      />
                      <CustomViewer
                        name="commission"
                        title={formatMessage({
                          id: 'components.offerForm.commission',
                        })}
                        value={formatNumber(
                          multiplier *
                            deploy.scenarios[0].raw_amount *
                            ((multiplier * deploy.commission_rate) / 100),
                          {
                            style: 'currency',
                            currency: formData.currency.toUpperCase(),
                            minimumFractionDigits: 2,
                          },
                        )}
                      />
                    </div>
                    <div className="rform__confirmation--row">
                      <CustomViewer
                        name="revenue_share"
                        title={formatMessage({
                          id: 'components.offerForm.revenue_share',
                        })}
                        value={formatNumber(
                          deploy.revenue_share / percentageMultiplier,
                          {
                            style: 'percent',
                            minimumFractionDigits: 2,
                          },
                        )}
                      />
                      <CustomViewer
                        name="monitoring_start_date"
                        title={formatMessage({
                          id: 'components.offerForm.deploy_date',
                        })}
                        value={formatDate(deploy.deploy_date)}
                      />
                    </div>
                    <div className="rform__confirmation--row">
                      <CustomViewer
                        name="deployment_date"
                        title={formatMessage({
                          id: 'components.offerForm.start_date',
                        })}
                        value={formatDate(deploy.monitoring_start_date)}
                      />
                      <CustomViewer
                        name="first_repayment_date"
                        title={formatMessage({
                          id: 'components.offerForm.first_repayment',
                        })}
                        value={formatDate(deploy.first_repayment_date)}
                      />
                    </div>
                  </div>
                )
              } else {
                return (
                  <div key={`confirm-deploy-${i + 1}`}>
                    <div className="rform__section--separator" />
                    <h2 className="rform__confirmation--title">
                      <b>
                        {formatMessage({
                          id: `data.ordinals.${stringifyNumber(i + 1)}`,
                        })}{' '}
                        Deployment
                      </b>
                    </h2>
                    <div className="rform__confirmation--row">
                      <CustomViewer
                        name={`deployments[${i}].commission_rate`}
                        title={formatMessage({
                          id: 'components.offerForm.commission_rate',
                        })}
                        value={formatNumber(
                          deploy.commission_rate / percentageMultiplier,
                          {
                            style: 'percent',
                            minimumFractionDigits: 2,
                          },
                        )}
                      />
                      <CustomViewer
                        name={`deployments[${i}].revenue_share`}
                        title={formatMessage({
                          id: 'components.offerForm.revenue_share',
                        })}
                        value={formatNumber(
                          deploy.revenue_share / percentageMultiplier,
                          {
                            style: 'percent',
                            minimumFractionDigits: 2,
                          },
                        )}
                      />
                    </div>
                    <div className="rform__confirmation--row single-col">
                      <CustomViewer
                        name={`deployments[${i}].deploy_date`}
                        title={formatMessage({
                          id: 'components.offerForm.deploy_date',
                        })}
                        value={formatDate(deploy.deploy_date)}
                        singleCol
                      />
                    </div>
                    <div className="rform__confirmation--row">
                      <span className="rform__confirmation--row-subsection">
                        {formatMessage({
                          id: 'components.offerForm.covenants',
                        })}
                      </span>
                    </div>
                    <div className="rform__confirmation--row">
                      <CustomViewer
                        name={`deployments[${i}].covenants_check_start_date`}
                        title={formatMessage({
                          id: 'components.offerForm.start_date',
                        })}
                        value={formatDate(deploy.covenants_check_start_date)}
                      />
                      <CustomViewer
                        name={`deployments[${i}].covenants_check_end_date`}
                        title={formatMessage({
                          id: 'components.offerForm.end_date',
                        })}
                        value={formatDate(deploy.covenants_check_end_date)}
                      />
                    </div>
                    {deploy.scenarios.map((scenario, j) => (
                      <div key={`deploy-${i}-scenario-${j}`}>
                        <div className="rform__confirmation--row">
                          <span className="rform__confirmation--row-subtitle">
                            {formatMessage({
                              id: 'common.Option',
                            })}{' '}
                            {j + 1}
                          </span>
                        </div>
                        <div className="rform__confirmation--row">
                          <CustomViewer
                            name={`deployments[${i}].scenarios[${j}].raw_amount`}
                            title={formatMessage({
                              id: 'components.offerForm.loan_amount',
                            })}
                            value={formatNumber(
                              multiplier * scenario.raw_amount,
                              {
                                style: 'currency',
                                currency: formData.currency.toUpperCase(),
                                minimumFractionDigits: 2,
                              },
                            )}
                          />
                          <CustomViewer
                            name={`deployments[${i}].scenarios[${j}].covenants[0].target_value`}
                            title={formatMessage({
                              id: 'components.offerForm.rev_target',
                            })}
                            value={formatNumber(
                              multiplier *
                                (scenario.covenants[0]?.target_value ?? 0),
                              {
                                style: 'currency',
                                currency: formData.currency.toUpperCase(),
                                minimumFractionDigits: 2,
                              },
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }
            })}

            {isConfirmation && formData.file && (
              <>
                <div className="rform__section--separator" />
                <div className="rform__confirmation--row single-col col-arrangement">
                  <h2 className="rform__confirmation--title">
                    <b>{formatMessage({ id: 'common.Files' })}</b>
                  </h2>
                  <div className="rform__item--file-container">
                    <div className="rform__item--file-icon downloable offer-file" />
                    <div className="rform__item--file-name">
                      <span>{formData.file}</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!isConfirmation && formData.files?.length > 0 && (
              <>
                <div className="rform__section--separator" />
                <div className="rform__confirmation--row single-col col-arrangement">
                  <h2 className="rform__confirmation--title">
                    <b>{formatMessage({ id: 'common.Files' })}</b>
                  </h2>
                  <div className="rform__item--file-container">
                    {formData.files.map((file, index) => (
                      <Fragment key={`file-${index}`}>
                        <div
                          className="rform__item--file-icon downloable offer-file"
                          onClick={() => downloadFile(file.id)}
                        />
                        <div className="rform__item--file-name">
                          <span>{file.name}</span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </>
            )}

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
                <CustomButton
                  label={formatMessage({ id: 'common.Delete' })}
                  onClick={openDeleteDialog}
                  color="alert"
                  variant="outlined"
                  position="right"
                  classes="rform__confirmation--footer-button"
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

export default ViewOffer
