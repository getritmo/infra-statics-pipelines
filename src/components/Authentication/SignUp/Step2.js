import { CustomButton, CustomText } from 'components/UI'
import translate from 'i18n/translate'
import { useIntl } from 'react-intl'
import React from 'react'
import { useForm } from 'react-hook-form'
import { registrationStep2FormSchema } from './registrationSchema'
import Title from 'components/Title'
import OpenPrivacy from 'components/OpenPrivacy'
import CustomCheckbox from 'components/UI/CustomCheckbox'

const textClasses = {
  item: 'login__text--item',
  label: 'login__text--label',
  input: 'login__text--input',
  error: 'login__text--error',
}

const checkboxClasses = {
  item: 'login__checkbox--container',
}

const Step2 = ({ onSubmit, setModal, goBack }) => {
  const { formatMessage } = useIntl()
  const { handleSubmit, register, getValues, setValue, errors } = useForm({
    mode: 'onSubmit',
    defaultValues: Object.keys(registrationStep2FormSchema).reduce(
      (acc, curr) => ({
        ...acc,
        [registrationStep2FormSchema[curr].id]:
          registrationStep2FormSchema[curr].defaultValue,
      }),
      {},
    ),
    shouldFocusError: false,
    shouldUnregister: false,
  })

  const validateName = (input) => {
    const expression = new RegExp(
      /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.]{1,30}$/,
    )
    return (
      expression.test(input) ||
      translate('components.create_account_form.fill_field')
    )
  }

  const validatePhone = (input) => {
    const expression = new RegExp(
      /([0-9\s-]{9,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/,
    )
    return (
      expression.test(input) ||
      translate('components.create_account_form.fill_phone')
    )
  }

  return (
    <div className="step step-2">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="layout-columns__title centered">
          <Title tag="H1">
            {translate('components.create_account_form.almost_have_it')}
          </Title>
        </div>
        <div className="layout-columns__form--container">
          <CustomText
            name="firstName"
            title={formatMessage({ id: 'common.Name' })}
            defaultValue={registrationStep2FormSchema.firstName.defaultValue}
            required={registrationStep2FormSchema.firstName.required}
            validate={{
              invalid: (value) => validateName(value),
            }}
            hideErrors
            classes={textClasses}
            {...{ register, getValues, setValue, errors }}
          />
          <CustomText
            name="surname"
            title={formatMessage({ id: 'common.Lastname' })}
            defaultValue={registrationStep2FormSchema.surname.defaultValue}
            required={registrationStep2FormSchema.surname.required}
            validate={{
              invalid: (value) => validateName(value),
            }}
            hideErrors
            classes={textClasses}
            {...{ register, getValues, setValue, errors }}
          />
          <CustomText
            name="phone_number"
            title={formatMessage({ id: 'common.Phone' })}
            defaultValue={registrationStep2FormSchema.phone_number.defaultValue}
            required={registrationStep2FormSchema.phone_number.required}
            validate={{
              invalid: (value) => validatePhone(value),
            }}
            hideErrors
            classes={textClasses}
            {...{ register, getValues, setValue, errors }}
          />
          <CustomCheckbox
            name="subscribe_newsletter"
            singleCol
            title={
              <>
                {translate('components.create_account_form.checkbox1')}{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link__full"
                  href={formatMessage({
                    id: 'components.create_account_form.privacy_policy_url',
                  })}
                  onClick={(e) => e.stopPropagation()}
                >
                  {translate('components.create_account_form.ahref1')}
                </a>{' '}
                {translate('components.create_account_form.checkbox2')}
                <OpenPrivacy {...{ setModal }} />
              </>
            }
            hideErrors
            classes={checkboxClasses}
            {...{ register, setValue, errors }}
          />
          <CustomCheckbox
            name="has_accepted_conditions"
            singleCol
            title={
              <>
                {translate('components.create_account_form.checkbox3')}{' '}
                <a
                  data-cy="legal-notice-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link__full"
                  href={formatMessage({
                    id: 'components.create_account_form.legal_notice_url',
                  })}
                  onClick={(e) => e.stopPropagation()}
                >
                  {translate('components.create_account_form.ahref2')}
                </a>
                .
              </>
            }
            required
            hideErrors
            classes={checkboxClasses}
            {...{ register, setValue, errors }}
          />

          <div className="active layout-columns__submit layout-columns__submit--items">
            <a href="/" className="link link__back" onClick={goBack}>
              {translate('components.create_account_form.review_data')}
            </a>
            <CustomButton type="submit" label={translate('common.Continue')} />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Step2
