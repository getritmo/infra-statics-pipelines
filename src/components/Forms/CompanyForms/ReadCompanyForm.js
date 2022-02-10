import { CustomButton, CustomViewer } from 'components/UI'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { businessType, monthlyIncomeByCurrency } from 'data/data'
import { useSelector } from 'react-redux'
import { LoadingSize } from 'components/Loading'

const ReadCompanyForm = ({ onSubmit, goBack, loading = false }) => {
  const formData = useSelector((state) => state.globalState.panel.formData)

  const { handleSubmit } = useForm({
    mode: 'onSubmit',
    defaultValues: formData,
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const { formatMessage } = useIntl()

  return (
    <form id="create-offer-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="rform__section--title">
        <b>{formatMessage({ id: 'components.companyForm.title' })}</b>
      </h2>
      <div className="rform__section--row">
        <CustomViewer
          name="name"
          title={formatMessage({ id: 'common.Name' })}
          value={formData.name}
          required
        />
        <CustomViewer
          name="monthly_income"
          title={formatMessage({
            id: 'common.monthly_income',
          })}
          value={formatMessage({
            id: monthlyIncomeByCurrency(formData.currency).find(
              (item) => item.value == formData.monthly_income,
            ).name,
          })}
        />
      </div>
      <div className="rform__section--row">
        <CustomViewer
          name="business_type"
          title={formatMessage({
            id: 'common.business_type',
          })}
          value={formatMessage({
            id: businessType.find(
              (item) => item.value == formData.business_type,
            ).name,
          })}
        />
        <CustomViewer
          name="website"
          title={formatMessage({ id: 'common.website' })}
          value={formData.website}
        />
      </div>
      <div className="rform__section--row">
        <CustomViewer
          name="currency"
          title={formatMessage({ id: 'common.Currency' })}
          value={formatMessage({
            id: `common.currency.${formData.currency}`,
          })}
        />
        <CustomViewer
          name="country"
          title={formatMessage({ id: 'common.Country' })}
          value={formatMessage({
            id: `data.countries.${formData.country}`,
          })}
        />
      </div>
      <h2 className="rform__confirmation--title company-form">
        <b>
          {formatMessage({ id: 'components.companyForm.notification_email' })}
        </b>
      </h2>
      <div className="rform__section--row">
        {formData.notification_email.split(',').length === 0 ? (
          <span>
            {formatMessage({ id: 'components.companyForm.no_email' })}
          </span>
        ) : (
          <ul className="emails-list">
            {formData.notification_email.split(',').map((email, i) => (
              <li key={`email-${i}-${email}`}>
                <div>
                  <span>{email}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        <CustomViewer name="notification_email" hidden />
      </div>
      <div className="rform__confirmation--footer">
        {loading ? (
          <div className={'rform__confirmation--footer-loader float-right'}>
            <LoadingSize size={48} />
          </div>
        ) : (
          <>
            <CustomButton
              label={formatMessage({ id: 'common.Back' })}
              onClick={goBack}
              color="cancel"
              variant="outlined"
              position="left"
              classes="rform__confirmation--footer-button"
            />
            <CustomButton
              label={formatMessage({ id: 'common.Save' })}
              color="alert"
              position="right"
              classes="rform__confirmation--footer-button"
              onClick={onSubmit}
            />
          </>
        )}
      </div>
    </form>
  )
}

export default ReadCompanyForm
