import React from 'react'
import PropTypes from 'prop-types'
import { stringifyNumber } from '../utils'
import { CustomDate, CustomNumber } from '../../UI'
import OptionsArray from './OptionsArray'
import { useIntl } from 'react-intl'
import moment from 'moment/moment'

const OtherDeployment = ({
  formData,
  index,
  register,
  getValues,
  errors,
  setValue,
  watch,
  control,
  onDelete,
}) => {
  const { formatMessage } = useIntl()

  return (
    <>
      <div className="rform__section--separator" />
      <div className="rform__header">
        <h2 className="rform__section--title">
          <b>
            {formatMessage({
              id: `data.ordinals.${stringifyNumber(index + 1)}`,
            })}{' '}
            Deployment
          </b>
        </h2>
        {index > 0 && (
          <span className="rform__section--delete" onClick={onDelete} />
        )}
      </div>
      <div className="rform__section--row">
        <CustomNumber
          name={`deployments[${index}].commission_rate`}
          title={formatMessage({ id: 'components.offerForm.commission_rate' })}
          defaultValue={formData.commission_rate}
          required
          {...{ register, getValues, setValue, errors }}
        />
        <CustomNumber
          name={`deployments[${index}].revenue_share`}
          title={formatMessage({ id: 'components.offerForm.revenue_share' })}
          defaultValue={formData.revenue_share}
          required
          {...{ register, getValues, setValue, errors }}
        />
      </div>
      <div className="rform__section--row single-col">
        <CustomDate
          name={`deployments[${index}].deploy_date`}
          title={formatMessage({ id: 'components.offerForm.deploy_date' })}
          defaultValue={formData.deploy_date}
          min={moment(
            watch(`deployments[${index - 1}].deploy_date`) || undefined,
          ).format('YYYY-MM-DD')}
          validate={{
            aboveLastDeployDate: (date) =>
              moment(
                getValues(`deployments[${index - 1}].deploy_date`),
              ).isBefore(date) ||
              formatMessage({
                id: 'components.offerForm.errors.startBeforeLastDeploy',
              }),
          }}
          singleCol
          required
          {...{ register, setValue, errors }}
        />
      </div>
      <div className="rform__section--row">
        <span className="rform__section--subtitle">
          {formatMessage({ id: 'components.offerForm.covenants' })}
        </span>
      </div>
      <div className="rform__section--row">
        <CustomDate
          name={`deployments[${index}].covenants_check_start_date`}
          min={moment(
            watch(`deployments[${index - 1}].deploy_date`) || undefined,
          ).format('YYYY-MM-DD')}
          max={moment(watch(`deployments[${index}].deploy_date`))
            .subtract(1, 'days')
            .format('YYYY-MM-DD')}
          title={formatMessage({ id: 'components.offerForm.start_date' })}
          defaultValue={formData.covenants_check_start_date}
          validate={{
            beforeDeployDate: (date) =>
              moment(getValues(`deployments[${index}].deploy_date`)).isAfter(
                date,
              ) ||
              formatMessage({ id: 'components.offerForm.errors.beforeDeploy' }),
            aboveDeployDate: (date) =>
              moment(
                getValues(`deployments[${index - 1}].deploy_date`),
              ).isSameOrBefore(date) ||
              formatMessage({
                id: 'components.offerForm.errors.startBeforeLastDeploy',
              }),
          }}
          required
          {...{ register, setValue, errors }}
        />
        <CustomDate
          name={`deployments[${index}].covenants_check_end_date`}
          min={
            watch(`deployments[${index}].covenants_check_start_date`) === ''
              ? moment(
                  watch(`deployments[${index - 1}].deploy_date`) || undefined,
                ).format('YYYY-MM-DD')
              : moment
                  .max(
                    moment(
                      watch(`deployments[${index - 1}].deploy_date`) ||
                        undefined,
                    ),
                    moment(
                      watch(
                        `deployments[${index}].covenants_check_start_date`,
                      ) || undefined,
                    ),
                  )
                  .format('YYYY-MM-DD')
          }
          max={moment(watch(`deployments[${index}].deploy_date`))
            .subtract(1, 'days')
            .format('YYYY-MM-DD')}
          title={formatMessage({ id: 'components.offerForm.end_date' })}
          defaultValue={formData.covenants_check_end_date}
          validate={{
            beforeDeployDate: (date) =>
              moment(getValues(`deployments[${index}].deploy_date`)).isAfter(
                date,
              ) ||
              formatMessage({ id: 'components.offerForm.errors.beforeDeploy' }),
            aboveStartDate: (date) =>
              moment(
                getValues(`deployments[${index}].covenants_check_start_date`),
              ).isBefore(date) ||
              formatMessage({
                id: 'components.offerForm.errors.endAfterStart',
              }),
          }}
          required
          {...{ register, setValue, errors }}
        />
      </div>
      <div className="rform__section--separator-small" />
      <OptionsArray
        {...{ index, control, register, getValues, setValue, errors }}
      />
    </>
  )
}

OtherDeployment.propTypes = {
  index: PropTypes.number.isRequired,
  register: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
}

export default OtherDeployment
