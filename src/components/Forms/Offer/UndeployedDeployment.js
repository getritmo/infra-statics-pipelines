import { CustomViewer } from 'components/UI'
import CustomCheckbox from 'components/UI/CustomCheckbox'
import React from 'react'
import { useIntl } from 'react-intl'
import { v4 } from 'uuid'
import { stringifyNumber } from '../utils'
import DeployActions from './DeployActions'

const UndeployedDeployment = ({
  deploy,
  deployNum,
  currency,
  isConfirmation,
  isDeployable,
  handleDeployActivation,
  loadingDeploy,
}) => {
  const { formatMessage, formatDate, formatNumber } = useIntl()

  const multiplier = isConfirmation ? 1 : 0.01
  const percentageMultiplier = isConfirmation ? 100 : 10000

  return (
    <div key={`confirm-deploy-${deployNum + 1}`}>
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
        <div className="rform__section--header-actions">
          {!isConfirmation && isDeployable && (
            <DeployActions
              handleDeployActivation={handleDeployActivation}
              loadingDeploy={loadingDeploy}
            />
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
        <span className="rform__confirmation--row-subsection">
          {formatMessage({
            id: 'components.offerForm.covenants',
          })}
        </span>
      </div>
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
      {deploy.scenarios.map((scenario, j) => (
        <div key={scenario.id || v4()}>
          <div className="rform__confirmation--row">
            <CustomCheckbox
              type="checkbox"
              title={`${formatMessage({
                id: 'common.Option',
              })} ${j + 1}`}
              classes={{
                item: 'rform__checkbox--item',
                label: 'rform__checkbox--label',
              }}
              readOnly
              value={false}
            />
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

export default UndeployedDeployment
