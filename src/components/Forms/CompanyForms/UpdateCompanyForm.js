import { CustomButton, CustomSelect, CustomText } from 'components/UI'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { businessType, monthlyIncomeByCurrency } from '../../../data/data'
import { currencies } from 'data/data'
import { useSelector } from 'react-redux'
import { countries } from 'data/countries'

const esOrder = ['ES', 'GB', 'MX', 'FR']

const UpdateCompanyForm = ({ onSubmit }) => {
  const { formatMessage } = useIntl()

  const formData = useSelector((state) => state.globalState.panel.formData)
  const [monthlyIncomeOptions, setMonthlyIncomeOptions] = useState(
    monthlyIncomeByCurrency(formData.currency || 'EUR').map((item) => ({
      value: item.value,
      label: formatMessage({ id: item.name }),
    })),
  )
  const [newEmails, setNewEmails] = useState('')
  const [emailToRemove, setEmailToRemove] = useState('')

  const { handleSubmit, register, getValues, setValue, errors, watch } =
    useForm({
      mode: 'onSubmit',
      defaultValues: formData,
      shouldFocusError: false,
      shouldUnregister: false,
    })

  const currency = watch('currency')
  const notificationEmails = watch('notification_email') || ''

  useEffect(() => {
    setMonthlyIncomeOptions(
      monthlyIncomeByCurrency(currency).map((item) => ({
        value: item.value,
        label: formatMessage({ id: item.name }),
      })),
    )
  }, [currency, formatMessage])

  useEffect(() => {
    if (setEmailToRemove) {
      const newNotList = notificationEmails
        .split(',')
        .filter((el) => el !== emailToRemove)
        .join(',')
      setEmailToRemove('')
      setValue('notification_email', newNotList)
    }
  }, [emailToRemove, setValue, notificationEmails])

  return (
    <form id="create-offer-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="rform__section--title">
        <b>{formatMessage({ id: 'components.companyForm.title' })}</b>
      </h2>
      <div className="rform__section--row">
        <CustomText
          name="name"
          title={formatMessage({ id: 'common.Name' })}
          defaultValue={formData.name}
          required
          {...{ register, getValues, setValue, errors }}
        />
        <CustomSelect
          name="monthly_income"
          title={formatMessage({
            id: 'common.monthly_income',
          })}
          options={monthlyIncomeOptions}
          defaultValue={formData.monthly_income}
          required
          {...{ register, getValues, setValue, watch, errors }}
        />
      </div>
      <div className="rform__section--row">
        <CustomSelect
          name="business_type"
          title={formatMessage({
            id: 'common.business_type',
          })}
          options={businessType.map((item) => ({
            value: item.value,
            label: formatMessage({ id: item.name }),
          }))}
          defaultValue={formData.business_type}
          required
          {...{ register, getValues, setValue, watch, errors }}
        />
        <CustomText
          name="website"
          title={formatMessage({ id: 'common.website' })}
          defaultValue={formData.website}
          required
          {...{ register, getValues, setValue, errors }}
        />
      </div>
      <div className="rform__section--row">
        <CustomSelect
          name="currency"
          title={formatMessage({ id: 'common.Currency' })}
          options={currencies.map(({ value, labelId }) => ({
            value: value,
            label: formatMessage({ id: labelId }),
          }))}
          defaultValue={formData.currency}
          required
          {...{ register, getValues, setValue, watch, errors }}
        />
        <CustomSelect
          name="country"
          title={formatMessage({ id: 'common.Country' })}
          options={[
            ...esOrder.map((countryId) => {
              const country = countries.find((item) => item.id === countryId)
              return {
                id: 'initial-country',
                value: countryId,
                label: `${country.emoji} ${formatMessage({
                  id: `data.countries.${countryId}`,
                })}`,
              }
            }),
            {
              id: 'separator',
              disabled: true,
              value: 'separator',
              label: '________________________',
            },
            ...countries
              .sort((a, b) =>
                formatMessage({
                  id: `data.countries.${a.id}`,
                }).localeCompare(
                  formatMessage({ id: `data.countries.${b.id}` }),
                ),
              )
              .map((country) => {
                return {
                  value: country.id,
                  label: `${country.emoji}  ${formatMessage({
                    id: `data.countries.${country.id}`,
                  })}`,
                }
              }),
          ]}
          defaultValue={formData.country}
          required
          {...{ register, getValues, setValue, watch, errors }}
        />
      </div>
      <h2 className="rform__section--title">
        <b>
          {formatMessage({ id: 'components.companyForm.notification_email' })}
        </b>
      </h2>
      <div className="rform__section--row">
        {notificationEmails.split(',').length === 0 ? (
          <>No notification emails registered</>
        ) : (
          <ul className="emails-list">
            {notificationEmails.split(',').map((email, i) => (
              <li key={`email-${email}`}>
                <div>
                  <span>{email}</span>
                  {((i === 0 && notificationEmails.split(',').length > 1) ||
                    i > 0) && (
                    <span
                      className="rform__section--delete"
                      onClick={() => setEmailToRemove(email)}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        <CustomText
          name="notification_email"
          defaultValue={formData.notification_email}
          required
          hidden
          {...{ register, getValues, setValue, errors }}
        />
      </div>
      <div className="rform__section--row">
        <CustomText
          name="notification_email_textbox"
          title={formatMessage({ id: 'components.companyForm.emails' })}
          inputValue={newEmails}
          onChange={(e) => setNewEmails(e.target.value)}
          hideErrors
          classes={{ item: 'email-notification' }}
        />
        <CustomButton
          label={formatMessage({ id: 'common.Add' })}
          onClick={() => {
            const currentEmails = notificationEmails.split(',')
            newEmails.split(',').forEach((newEmail) => {
              let emailToAdd = newEmail.replaceAll(' ', '')
              if (!currentEmails.some((email) => email === emailToAdd)) {
                currentEmails.push(emailToAdd)
              }
            })
            setValue('notification_email', currentEmails.join(','))
            setNewEmails('')
            document.getElementById('notification_email_textbox').value = ''
          }}
        />
      </div>
      <CustomButton
        type="submit"
        label={formatMessage({ id: 'common.Next' })}
        classes="rform__item--file-button"
      />
    </form>
  )
}

export default UpdateCompanyForm
