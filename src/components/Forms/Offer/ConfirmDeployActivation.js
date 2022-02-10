import React, { useState } from 'react'
import CustomViewer from '../../UI/CustomViewer'
import { useIntl } from 'react-intl'
import { stringifyNumber } from '../utils'
import { CustomButton } from '../../UI'
import useAPI from 'hooks/useAPI'
import CustomCheckbox from 'components/UI/CustomCheckbox'
import { useParams } from 'react-router-dom'
import useAsyncActions from 'hooks/useAsyncActions'

const ConfirmDeployActivation = ({
  selectedDeploy,
  activationData,
  currency,
  offerId,
  goBack,
  onClose,
}) => {
  const { formatMessage, formatNumber, formatDate } = useIntl()
  const [loadingDeploy, setLoadingDeploy] = useState(undefined)
  const [error, setError] = useState(false)

  const { apiCallApplicationsAdmin } = useAPI()
  const { applicationId } = useParams()
  const { getApplicationById } = useAsyncActions()

  const multiplier = 0.01
  const percentageMultiplier = 10000

  const handleDeployActivation = async (deployId) => {
    setLoadingDeploy(deployId)
    try {
      await apiCallApplicationsAdmin(
        `/applications/${applicationId}/offers/${offerId}/deployments/${selectedDeploy.id}/activate`,
        'POST',
        {
          monitoring_start_date: activationData.monitoring_start_date,
          first_repayment_date: activationData.first_repayment_date,
          scenario_id: activationData.scenario_id,
        },
      )
      getApplicationById(applicationId)
      onClose()
    } catch (e) {
      console.error('ERROR on ACTIVATE deployment: ', e)
      setError(true)
      setLoadingDeploy(false)
    }
  }

  return (
    <>
      <h2 className="rform__section--title">
        <b>
          {formatMessage({
            id: `data.ordinals.${stringifyNumber(
              selectedDeploy.deployNumber + 1,
            )}`,
          })}{' '}
          Deployment
        </b>
      </h2>
      <div className="rform__confirmation--row">
        <CustomViewer
          name={`deployments[${selectedDeploy.deployNumber}].commission_rate`}
          title={formatMessage({
            id: 'components.offerForm.commission_rate',
          })}
          value={formatNumber(
            selectedDeploy.commission_rate / percentageMultiplier,
            {
              style: 'percent',
              minimumFractionDigits: 2,
            },
          )}
        />
        <CustomViewer
          name={`deployments[${selectedDeploy.deployNumber}].revenue_share`}
          title={formatMessage({
            id: 'components.offerForm.revenue_share',
          })}
          value={formatNumber(
            selectedDeploy.revenue_share / percentageMultiplier,
            {
              style: 'percent',
              minimumFractionDigits: 2,
            },
          )}
        />
      </div>
      <div className="rform__confirmation--row single-col">
        <CustomViewer
          name={`deployments[${selectedDeploy.deployNumber}].deploy_date`}
          title={formatMessage({
            id: 'components.offerForm.deploy_date',
          })}
          value={formatDate(selectedDeploy.deploy_date)}
          singleCol
        />
      </div>
      <div className="rform__confirmation--row">
        <CustomViewer
          name="deployment_date"
          title={formatMessage({
            id: 'components.offerForm.start_date',
          })}
          value={formatDate(selectedDeploy.monitoring_start_date)}
        />
        <CustomViewer
          name="first_repayment_date"
          title={formatMessage({
            id: 'components.offerForm.first_repayment',
          })}
          value={formatDate(selectedDeploy.first_repayment_date)}
        />
      </div>
      <br />
      <h2 className="rform__section--title">
        <b>
          {
            formatMessage({
              id: 'components.offerForm.covenants',
            })[0]
          }
          {formatMessage({
            id: 'components.offerForm.covenants',
          })
            .slice(1)
            .toLowerCase()}
        </b>
      </h2>
      <div className="rform__confirmation--row">
        <CustomViewer
          name={`deployments[${selectedDeploy.deployNumber}].covenants_check_start_date`}
          title={formatMessage({
            id: 'components.offerForm.start_date',
          })}
          value={formatDate(selectedDeploy.covenants_check_start_date)}
        />
        <CustomViewer
          name={`deployments[${selectedDeploy.deployNumber}].covenants_check_end_date`}
          title={formatMessage({
            id: 'components.offerForm.end_date',
          })}
          value={formatDate(selectedDeploy.covenants_check_end_date)}
        />
      </div>
      <br />
      <h2 className="rform__section--title">
        <b>
          {formatMessage({
            id: 'components.confirmDeployActivation.selectedOption',
          })}
        </b>
      </h2>
      {selectedDeploy.scenarios
        .filter((scenario) => scenario.selected === true)
        .map((scenario, j) => (
          <div key={`deploy-${selectedDeploy.deployNumber}-scenario-${j}`}>
            <div className="rform__confirmation--row">
              {selectedDeploy.status !== 'deployed' ? (
                <CustomCheckbox
                  type="checkbox"
                  title={`${formatMessage({
                    id: 'common.Option',
                  })} ${scenario.pos + 1}`}
                  classes={{
                    item: 'rform__checkbox--item',
                    label: 'rform__checkbox--label',
                  }}
                  defaultChecked={true}
                  readOnly
                />
              ) : (
                <span className="rform__confirmation--row-subtitle">
                  {`${formatMessage({
                    id: 'common.Option',
                  })} ${j + 1}`}
                </span>
              )}
            </div>
            <div className="rform__confirmation--row">
              <CustomViewer
                name={`deployments[${selectedDeploy.deployNumber}].scenarios[${j}].raw_amount`}
                title={formatMessage({
                  id: 'components.offerForm.loan_amount',
                })}
                value={formatNumber(multiplier * scenario.raw_amount, {
                  style: 'currency',
                  currency: currency.toUpperCase(),
                  minimumFractionDigits: 2,
                })}
              />
              <CustomViewer
                name={`deployments[${selectedDeploy.deployNumber}].scenarios[${j}].covenants[0].target_value`}
                title={formatMessage({
                  id: 'components.offerForm.rev_target',
                })}
                value={formatNumber(
                  multiplier * (scenario.covenants[0]?.target_value ?? 0),
                  {
                    style: 'currency',
                    currency: currency.toUpperCase(),
                    minimumFractionDigits: 2,
                  },
                )}
              />
            </div>
          </div>
        ))}
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
          label={formatMessage({ id: 'common.Activate' })}
          position="right"
          onClick={handleDeployActivation}
          classes="rform__confirmation--footer-button"
          loading={loadingDeploy}
        />
      </div>
      <br />
      <br />
      {error && (
        <span className="rform__confirmation--footer-error">
          {formatMessage({ id: 'components.panel.upload.error' })}
        </span>
      )}
    </>
  )
}

export default ConfirmDeployActivation
