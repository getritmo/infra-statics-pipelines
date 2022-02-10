import React, { Fragment, useState } from 'react'
import CustomViewer from '../../UI/CustomViewer'
import { useIntl } from 'react-intl'
import { stringifyNumber } from '../utils'
import { CustomButton } from '../../UI'
import Dialog from '../../Dialog/Dialog'
import useAPI from 'hooks/useAPI'
import FileComponent from 'components/UI/FileComponent'
import { useParams } from 'react-router-dom'
import UndeployedDeployment from './UndeployedDeployment'
import DeployedDeployment from './DeployedDeployment'
import useAsyncActions from 'hooks/useAsyncActions'
import { v4 } from 'uuid'

const ViewOffer = ({
  formData,
  isConfirmation = false,
  goBack,
  setSelectedDeploy,
  onSubmit,
  onDelete,
  type,
  onClose,
  goNext,
}) => {
  const { formatMessage, formatNumber, formatDate } = useIntl()
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogProps, setDialogProps] = useState(undefined)
  const [loadingDeploy, setLoadingDeploy] = useState(undefined)

  const { apiFileDownload, apiCallApplicationsAdmin } = useAPI()
  const { applicationId } = useParams()
  const { getApplicationById } = useAsyncActions()

  const multiplier = isConfirmation ? 1 : 0.01
  const percentageMultiplier = isConfirmation ? 100 : 10000

  const handleDeployActivation = async (
    deployId,
    monitoringStartDate,
    firstRepaymentDate,
  ) => {
    setLoadingDeploy(deployId)
    try {
      await apiCallApplicationsAdmin(
        `/applications/${applicationId}/offers/${
          type === 'offer' ? formData.id : formData.offerId
        }/deployments/${deployId}/activate`,
        'POST',
        {
          monitoring_start_date: monitoringStartDate,
          first_repayment_date: firstRepaymentDate,
        },
      )
      getApplicationById(applicationId)
      onClose()
    } catch (e) {
      console.error('ERROR on ACTIVATING deployment: ', e)
    }
  }

  const DeployActions = ({ deploy, handleDeployActivation, disabled }) => (
    <div className={'rform__section--deployment-container'}>
      {deploy.status === 'created' && (
        <CustomButton
          label={formatMessage({
            id: 'components.offerForm.activate',
          })}
          onClick={handleDeployActivation}
          size="small"
          variant={disabled ? 'outlined' : 'contained'}
          classes="rform__section--deployment-button"
          disabled={disabled || false}
          loading={loadingDeploy === deploy.id}
        />
      )}
    </div>
  )

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
    await apiFileDownload(
      `/admin/uploads/${fileId}`,
      'GET',
      formData.files[0].name,
    )
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
            </div>

            {formData.deployments.map((deploy, i) => {
              if (i === 0) {
                return (
                  <div key={`first-deploy`}>
                    {/* First deployment */}
                    <div className="rform__section--separator" />
                    <div className="rform__section--header">
                      <div className="rform__section--header-title">
                        <h2 className="rform__confirmation--title">
                          <b>
                            {formatMessage({
                              id: `data.ordinals.${stringifyNumber(1)}`,
                            })}{' '}
                            Deployment
                          </b>
                        </h2>
                        {!isConfirmation && (
                          <span
                            className={`rform__section--deployment-status ${deploy.status}`}
                          >
                            {formatMessage({
                              id: `components.offerForm.${deploy.status}`,
                            })}
                          </span>
                        )}
                      </div>
                      <div className="rform__section--header-actions">
                        {!isConfirmation && (
                          <DeployActions
                            deploy={deploy}
                            handleDeployActivation={() => {
                              handleDeployActivation(
                                deploy.id,
                                deploy.monitoring_start_date,
                                deploy.first_repayment_date,
                              )
                            }}
                          />
                        )}
                      </div>
                    </div>

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
                  <Fragment key={deploy.id || v4()}>
                    {deploy.status === 'deployed' ? (
                      <DeployedDeployment
                        deploy={deploy}
                        deployNum={i}
                        currency={formData.currency}
                        isConfirmation={isConfirmation}
                      />
                    ) : (
                      <UndeployedDeployment
                        deploy={deploy}
                        deployNum={i}
                        currency={formData.currency}
                        isConfirmation={isConfirmation}
                        isDeployable={
                          formData.deployments[i - 1].status === 'deployed'
                        }
                        handleDeployActivation={() => {
                          setSelectedDeploy({ ...deploy, deployNumber: i })
                          goNext()
                        }}
                        loadingDeploy={loadingDeploy}
                      />
                    )}
                  </Fragment>
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
                  {formData.files.map((file, i) => (
                    <FileComponent
                      key={`offer-file-${i}`}
                      icon={'offer'}
                      filename={file.name}
                      onDownload={() => downloadFile(file.id)}
                      onDelete={onDelete}
                    />
                  ))}
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
