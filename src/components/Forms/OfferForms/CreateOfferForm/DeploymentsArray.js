import React from 'react'
import { useFieldArray } from 'react-hook-form'
import FirstDeployment from './FirstDeployment'
import OtherDeployment from './OtherDeployment'
import CustomButton from '../../../UI/CustomButton'
import { useIntl } from 'react-intl'

const DeploymentsArray = ({
  register,
  watch,
  getValues,
  setValue,
  errors,
  control,
  formData,
}) => {
  const { formatMessage } = useIntl()
  const { fields, remove } = useFieldArray({
    control,
    name: 'deployments',
    shouldUnregister: false,
  })

  return (
    <>
      {fields.map((deploy, index) => {
        if (index === 0) {
          return (
            <FirstDeployment
              key={`deploy-${index}`}
              {...{
                formData,
                index,
                register,
                watch,
                getValues,
                setValue,
                errors,
              }}
            />
          )
        } else {
          return (
            <OtherDeployment
              key={`deploy-${index}`}
              formData={deploy}
              onDelete={() => remove(index)}
              {...{
                index,
                register,
                watch,
                getValues,
                setValue,
                errors,
                control,
              }}
            />
          )
        }
      })}
      <div className="rform__section--row">
        <CustomButton
          variant="outlined"
          position="left"
          label={formatMessage({ id: 'components.offerForm.add_deploy' })}
          classes="rform__section--row-button"
          onClick={() => {
            const firstDeployment = getValues('deployments')[0]
            setValue('deployments', [
              ...getValues().deployments,
              {
                commission_rate: firstDeployment.commission_rate,
                revenue_share: firstDeployment.revenue_share,
                deploy_date: '',
                monitoring_start_date: '',
                first_repayment_date: '',
                scenarios: [
                  {
                    raw_amount: '',
                    covenants_check_start_date: '',
                    covenants_check_end_date: '',
                    covenants: [
                      {
                        kpi: 'revenue',
                        comparator: 'gte',
                        target_value: '',
                      },
                    ],
                  },
                  {
                    raw_amount: '',
                    covenants_check_start_date: '',
                    covenants_check_end_date: '',
                    covenants: [
                      {
                        kpi: 'revenue',
                        comparator: 'gte',
                        target_value: '',
                      },
                    ],
                  },
                ],
              },
            ])
          }}
        />
      </div>
    </>
  )
}

export default DeploymentsArray
