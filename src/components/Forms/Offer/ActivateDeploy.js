import React from 'react'
import { useIntl } from 'react-intl'
import {
  CustomViewer,
  CustomDate,
  CustomButton,
  CustomRadio,
} from 'components/UI'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'

const blankFormData = {
  monitoring_start_date: '',
  first_repayment_date: '',
  scenario_id: undefined,
}

const ActivateDeploy = ({
  formData = blankFormData,
  currency,
  selectedDeploy,
  goBack,
  goNext,
}) => {
  const { formatMessage, formatNumber } = useIntl()

  const { handleSubmit, register, setValue, errors, watch } = useForm({
    mode: 'onSubmit',
    defaultValues: formData,
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const multiplier = 0.01

  return (
    <form id="activate-deploy-form" onSubmit={handleSubmit(goNext)} noValidate>
      <h2 className="rform__section--title">
        <b>
          {formatMessage({
            id: 'components.activateDeployment.selectMonitoringDates',
          })}
        </b>
      </h2>
      <div className="rform__section--row">
        <CustomDate
          name="monitoring_start_date"
          title={formatMessage({ id: 'components.offerForm.start_date' })}
          required
          {...{ register, setValue, errors }}
        />
        <CustomDate
          name="first_repayment_date"
          title={formatMessage({ id: 'components.offerForm.first_repayment' })}
          required
          {...{ register, setValue, errors }}
        />
      </div>
      <h2 className="rform__section--title">
        <b>
          {formatMessage({
            id: `components.activateDeployment.selectScenario`,
          })}
        </b>
      </h2>
      {errors?.scenario_id && (
        <span className="rform__item--error">
          {formatMessage({
            id: 'components.activateDeployment.selectOptionError',
          })}
        </span>
      )}
      {selectedDeploy.scenarios.map((scenario, j) => (
        <div key={scenario.id}>
          <div className={'rform__confirmation--row'}>
            <CustomRadio
              name="scenario_id"
              title={`${formatMessage({
                id: 'common.Option',
              })} ${j + 1}`}
              classes={{
                item: classNames('rform__checkbox--item', {
                  'first-item': j === 0,
                }),
                label: 'rform__checkbox--label',
              }}
              value={scenario.id}
              selected={watch('scenario_id') === scenario.id}
              required
              {...{ register, setValue, errors }}
            />
          </div>
          <div className="rform__confirmation--row">
            <CustomViewer
              name={selectedDeploy.scenarios[j].raw_amount}
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
              name={selectedDeploy.scenarios[j].covenants[0].target_value}
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
          type="submit"
          label={formatMessage({ id: 'common.Next' })}
          color="alert"
          position="right"
          classes="rform__confirmation--footer-button"
        />
      </div>
    </form>
  )
}

export default ActivateDeploy
