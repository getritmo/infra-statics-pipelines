import { CustomViewer } from 'components/UI'
import React from 'react'
import { useIntl } from 'react-intl'
import { stringifyNumber } from '../utils'

const DeployedDeployment = ({
  deploy,
  deployNum,
  isConfirmation,
  currency,
}) => {
  const { formatMessage, formatNumber, formatDate } = useIntl()

  const multiplier = isConfirmation ? 1 : 0.01
  const percentageMultiplier = isConfirmation ? 100 : 10000

  return (
    <div key="confirm-deploy-1">
      <div className="rform__section--separator" />
      <div className="rform__section--header">
        <div className="rform__section--header-title">
          <h2 className="rform__confirmation--title">
            <b>
              {formatMessage({
                id: `data.ordinals.${stringifyNumber(deployNum + 1)}`,
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
      </div>

      <div className="rform__confirmation--row">
        <CustomViewer
          name={`deployments[${deployNum}].commission_rate`}
          title={formatMessage({
            id: 'components.offerForm.commission_rate',
          })}
          value={formatNumber(deploy.commission_rate / percentageMultiplier, {
            style: 'percent',
            minimumFractionDigits: 2,
          })}
        />
        <CustomViewer
          name={`deployments[${deployNum}].revenue_share`}
          title={formatMessage({
            id: 'components.offerForm.revenue_share',
          })}
          value={formatNumber(deploy.revenue_share / percentageMultiplier, {
            style: 'percent',
            minimumFractionDigits: 2,
          })}
        />
      </div>
      <div className="rform__confirmation--row single-col">
        <CustomViewer
          name={`deployments[${deployNum}].deploy_date`}
          title={formatMessage({
            id: 'components.offerForm.deploy_date',
          })}
          value={formatDate(deploy.deploy_date)}
          singleCol
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
          name={`deployments[${deployNum}].covenants_check_start_date`}
          title={formatMessage({
            id: 'components.offerForm.start_date',
          })}
          value={formatDate(deploy.covenants_check_start_date)}
        />
        <CustomViewer
          name={`deployments[${deployNum}].covenants_check_end_date`}
          title={formatMessage({
            id: 'components.offerForm.end_date',
          })}
          value={formatDate(deploy.covenants_check_end_date)}
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
      {deploy.scenarios
        .filter((scenario) => scenario.selected === true)
        .map((scenario, j) => (
          <div key={`deploy-${deployNum}-scenario-${j}`}>
            <div className="rform__confirmation--row">
              <span className="rform__confirmation--row-subtitle">
                {formatMessage({
                  id: 'common.Option',
                })}
              </span>
            </div>
            <div className="rform__confirmation--row">
              <CustomViewer
                name={`deployments[${deployNum}].scenarios[${j}].raw_amount`}
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
                name={`deployments[${deployNum}].scenarios[${j}].covenants[0].target_value`}
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
    </div>
  )
}

export default DeployedDeployment
