import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { stringifyNumber } from '../utils'
import { CustomNumber, CustomDate } from '../../UI'
import { useIntl } from 'react-intl'
import moment from 'moment/moment'

const FirstDeployment = ({
  formData,
  index,
  register,
  watch,
  getValues,
  setValue,
  errors,
}) => {
  const { formatMessage } = useIntl()

  const loanAmount = watch('deployments[0].scenarios[0].raw_amount').replace(
    ',',
    '.',
  )
  const commissionRate = watch('deployments[0].commission_rate').replace(
    ',',
    '.',
  )

  useEffect(() => {
    // Recalculate values of viewOnly fields
    setValue(
      'deployments[0].total_refund_amount',
      (loanAmount * (1 + commissionRate / 100)).toFixed(2),
    )
    setValue(
      'deployments[0].commission',
      (loanAmount * (commissionRate / 100)).toFixed(2),
    )
  }, [loanAmount, commissionRate, setValue])

  return (
    <>
      <div className="rform__section--separator" />
      <h2 className="rform__section--title">
        <b>
          {formatMessage({
            id: `data.ordinals.${stringifyNumber(index + 1)}`,
          })}{' '}
          Deployment
        </b>
      </h2>
      <div className="rform__section--row">
        <CustomNumber
          name="deployments[0].scenarios[0].raw_amount"
          title={formatMessage({ id: 'components.offerForm.loan_amount' })}
          defaultValue={formData.deployments[0].scenarios[0].raw_amount}
          required
          {...{ register, getValues, setValue, errors }}
        />
        <CustomNumber
          name="deployments[0].commission_rate"
          title={formatMessage({ id: 'components.offerForm.commission_rate' })}
          defaultValue={formData.deployments[0].commission_rate}
          required
          {...{ register, getValues, setValue, errors }}
        />
      </div>
      <div className="rform__section--row">
        <CustomNumber
          name="deployments[0].total_refund_amount"
          title={formatMessage({ id: 'components.offerForm.total_refund' })}
          defaultValue={0}
          readOnly
          {...{ register, getValues, setValue, errors }}
        />
        <CustomNumber
          name="deployments[0].commission"
          title={formatMessage({ id: 'components.offerForm.commission' })}
          defaultValue={0}
          readOnly
          {...{ register, getValues, setValue, errors }}
        />
      </div>
      <div className="rform__section--row">
        <CustomNumber
          name="deployments[0].revenue_share"
          title={formatMessage({ id: 'components.offerForm.revenue_share' })}
          defaultValue={formData.deployments[0].revenue_share}
          required
          {...{ register, getValues, setValue, errors }}
        />
        <CustomDate
          name="deployments[0].deploy_date"
          title={formatMessage({ id: 'components.offerForm.deploy_date' })}
          defaultValue={formData.deployments[0].deploy_date}
          required
          {...{ register, setValue, errors }}
        />
      </div>
      <div className="rform__section--row">
        <CustomDate
          name="deployments[0].monitoring_start_date"
          title={formatMessage({ id: 'components.offerForm.start_date' })}
          min={watch('deployments[0].deploy_date')}
          defaultValue={formData.deployments[0].monitoring_start_date}
          validate={{
            aboveDeployDate: (date) =>
              moment(getValues('deployments[0].deploy_date')).isSameOrBefore(
                date,
              ) || 'Start date is before deploy date',
          }}
          required
          {...{ register, setValue, errors }}
        />
        <CustomDate
          name="deployments[0].first_repayment_date"
          title={formatMessage({ id: 'components.offerForm.first_repayment' })}
          min={moment(watch('deployments[0].deploy_date'))
            .add(parseInt(watch('grace_days')) + 1, 'days')
            .format('YYYY-MM-DD')}
          defaultValue={formData.deployments[0].first_repayment_date}
          validate={{
            aboveDeployAndGrace: (date) =>
              moment(getValues('deployments[0].deploy_date'))
                .add(getValues('grace_days'), 'days')
                .isSameOrBefore(date) || 'Not accomplishing grace period',
          }}
          required
          {...{ register, setValue, errors }}
        />
      </div>
    </>
  )
}

FirstDeployment.propTypes = {
  index: PropTypes.number.isRequired,
  register: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
}

export default FirstDeployment
