import React from 'react'
import { CustomButton, CustomNumber, CustomText } from '../../../UI'
import { useFieldArray } from 'react-hook-form'
import { useIntl } from 'react-intl'

const blankOption = {
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
}

const OptionsArray = ({
  index,
  control,
  register,
  getValues,
  setValue,
  errors,
}) => {
  const { formatMessage } = useIntl()
  const { fields, append, remove } = useFieldArray({
    control,
    name: `deployments[${index}].scenarios`,
    shouldUnregister: false,
  })

  return (
    <>
      {fields.map((formData, i) => (
        <div key={`deployment-${index}-option-${i}`}>
          <div className="rform__section--row">
            <span className="rform__section--subtitle">
              {formatMessage({ id: 'common.Option' })} {i + 1}
            </span>
            {i > 0 && (
              <span
                className="rform__section--delete"
                onClick={() => {
                  remove(i)
                }}
              />
            )}
          </div>
          <div className="rform__section--row">
            <CustomNumber
              name={`deployments[${index}].scenarios[${i}].raw_amount`}
              title={formatMessage({ id: 'components.offerForm.loan_amount' })}
              defaultValue={formData.raw_amount}
              required
              {...{ register, getValues, setValue, errors }}
            />
            <CustomNumber
              name={`deployments[${index}].scenarios[${i}].covenants[0].target_value`}
              title={formatMessage({ id: 'components.offerForm.rev_target' })}
              defaultValue={formData.covenants[0]?.target_value ?? 0}
              required
              {...{ register, getValues, setValue, errors }}
            />
            <CustomText
              name={`deployments[${index}].scenarios[${i}].covenants[0].kpi`}
              title="KPI"
              defaultValue={formData.covenants[0]?.kpi ?? ''}
              required
              hidden
              {...{ register, getValues, setValue, errors }}
            />
            <CustomText
              name={`deployments[${index}].scenarios[${i}].covenants[0].comparator`}
              title="Comparator"
              defaultValue={formData.covenants[0]?.comparator ?? ''}
              required
              hidden
              {...{ register, getValues, setValue, errors }}
            />
          </div>
        </div>
      ))}
      <div className="rform__section--row">
        <CustomButton
          variant="text"
          position="right"
          label={formatMessage({ id: 'components.offerForm.add_option' })}
          onClick={() => {
            append(blankOption)
          }}
        />
      </div>
    </>
  )
}

export default OptionsArray
