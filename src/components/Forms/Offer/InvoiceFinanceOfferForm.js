import { CustomButton, CustomNumber, CustomSelect } from 'components/UI'
import { currencies } from 'data/data'
import React, { Fragment } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'

const blankFormData = {
  amortization_plans: [
    {
      period: '',
      commission_rate: '',
    },
    {
      period: '',
      commission_rate: '',
    },
  ],
  currency: 'EUR',
  total_credit_limit: '',
}

const InvoiceFinanceOffer = ({
  formData = { ...blankFormData },
  onSubmit,
  goBack,
}) => {
  const { formatMessage } = useIntl()
  const { handleSubmit, register, control, getValues, setValue, errors } =
    useForm({
      mode: 'onSubmit',
      defaultValues: formData,
      shouldFocusError: false,
      shouldUnregister: false,
    })

  const CommisionArray = () => {
    const { fields, remove, append } = useFieldArray({
      control,
      name: 'amortization_plans',
      shouldUnregister: false,
    })
    return (
      <>
        {fields.map((plan, index) => (
          <Fragment key={plan.id}>
            <div className="rform__section--row title">
              <span className="rform__section--subtitle">
                {formatMessage({ id: 'common.Option' })} {index + 1}
              </span>
              {index > 0 && (
                <span
                  className="rform__section--delete"
                  onClick={() => {
                    remove(index)
                  }}
                />
              )}
            </div>
            <div className="rform__section--row">
              <CustomNumber
                name={`amortization_plans[${index}].period`}
                title={formatMessage({
                  id: 'components.panel.form.if_offer.period',
                })}
                defaultValue={plan.period}
                required
                {...{ register, getValues, setValue, errors }}
              />
              <CustomNumber
                name={`amortization_plans[${index}].commission_rate`}
                title={formatMessage({
                  id: 'common.Commission_rate',
                })}
                defaultValue={plan.commission_rate}
                required
                {...{ register, getValues, setValue, errors }}
              />
            </div>
          </Fragment>
        ))}
        <div className="rform__section--row">
          <CustomButton
            variant="text"
            position="right"
            label={formatMessage({
              id: 'components.panel.form.if_offer.add_option',
            })}
            onClick={() => {
              append({
                period: '',
                commission_rate: '',
              })
            }}
          />
        </div>
      </>
    )
  }

  return (
    <div className="panel__content--scroll--wrapper">
      <div className="panel__content--scroll">
        <form
          id="create-offer-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h2 className="rform__section--title">
            <b>
              {formatMessage({
                id: 'components.panel.form.if_offer.offer_details',
              })}
            </b>
          </h2>
          <div className="rform__section--row">
            <CustomSelect
              name="currency"
              title={formatMessage({ id: 'common.Currency' })}
              options={currencies.map(({ value, labelId }) => ({
                value: value,
                label: formatMessage({ id: labelId }),
              }))}
              classes={{
                menu: {
                  marginTop: -2,
                },
              }}
              defaultValue={formData.currency}
              required
              {...{ register, getValues, setValue, errors }}
            />
            <CustomNumber
              name="total_credit_limit"
              type="number"
              title={formatMessage({
                id: 'components.panel.form.if_offer.total_credit_limit',
              })}
              defaultValue={formData.total_credit_limit}
              required
              {...{ register, getValues, setValue, errors }}
            />
          </div>
          <div className="rform__header">
            <h2 className="rform__section--title">
              <b>
                {formatMessage({
                  id: 'components.panel.form.if_offer.allowed_repayments',
                })}
              </b>
            </h2>
          </div>
          <CommisionArray />
          <div className="rform__confirmation--footer">
            <CustomButton
              label={formatMessage({ id: 'common.Back' })}
              onClick={goBack}
              position="left"
              color="cancel"
            />
            <CustomButton
              label={formatMessage({ id: 'common.Next' })}
              position="right"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default InvoiceFinanceOffer
