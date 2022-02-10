import { CustomButton, CustomSelect, CustomText } from 'components/UI'
import translate from 'i18n/translate'
import { useIntl } from 'react-intl'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { registrationStep1FormSchema } from './registrationSchema'
import Title from 'components/Title'
import { countries } from 'data/countries'
import { businessType, getCurrency, monthlyIncomeByCurrency } from 'data/data'
import useWindowSize from 'hooks/useWindowSize'

const enOrder = ['GB', 'ES', 'MX', 'FR']
const esOrder = ['ES', 'MX', 'GB', 'FR']

const textClasses = {
  item: 'login__text--item',
  container: 'login__text--container',
  label: 'login__text--label',
  input: 'login__text--input',
  error: 'login__text--error',
}

const selectClasses = {
  item: 'login__select--item',
  container: {
    marginBottom: 14,
  },
  control: {
    height: 56,
  },
  placeholder: {
    paddingLeft: 15,
    top: 9,
  },
  singleValue: {
    padding: '23px 0 0 16px',
    lineHeight: '23px',
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    lineHeight: '16px',
    width: 'calc(100% - 20px)',

    div: {
      top: 0,
      height: '100%',
      padding: '23px 0 0 16px',

      input: {
        fontFamily: 'Gilroy Light',
        border: '1px solid red',
        position: 'absolute',
        top: 25,
        paddingLeft: 2,

        '&::focus': {
          backgroundColor: 'white',
        },
      },
    },
  },
  menu: {
    marginTop: 4,
  },
}

const Step1 = ({ isPublic, onboardProduct, onSubmit }) => {
  const [lastLocale, setLastLocale] = useState(undefined)
  const size = useWindowSize()
  const { formatMessage, locale } = useIntl()
  const { handleSubmit, register, watch, getValues, setValue, errors } =
    useForm({
      mode: 'onSubmit',
      defaultValues: Object.keys(registrationStep1FormSchema).reduce(
        (acc, curr) => ({
          ...acc,
          [registrationStep1FormSchema[curr].id]:
            registrationStep1FormSchema[curr].defaultValue,
        }),
        {},
      ),
      shouldFocusError: false,
      shouldUnregister: false,
    })

  const country = watch('country')

  const onMenuOpen = () => {
    setTimeout(() => {
      const selectedEl = document.getElementsByClassName(
        'custom__select__menu',
      )[0]
      if (selectedEl) {
        selectedEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        })
      }
    }, 25)
  }

  useEffect(() => {
    if (locale !== lastLocale) {
      const localeCountry = locale.split('-')[1]
      setValue('country', localeCountry)
      localStorage.setItem('locale_country', localeCountry)
      setLastLocale(locale)
    }
  }, [locale, setLastLocale, lastLocale, setValue])

  const countriesList = useMemo(
    () => [
      ...(locale.split('-')[0] === 'es' ? esOrder : enOrder).map(
        (countryId) => {
          const { emoji, id } = countries.find((item) => item.id === countryId)
          return {
            value: id,
            label: `${emoji} ` + formatMessage({ id: `data.countries.${id}` }),
          }
        },
      ),
      ...countries
        .filter(({ id }) => !esOrder.some((country) => country === id))
        .sort((a, b) =>
          formatMessage({
            id: `data.countries.${a.id}`,
          }).localeCompare(
            formatMessage({
              id: `data.countries.${b.id}`,
            }),
          ),
        )
        .map(({ id, emoji }) => ({
          value: id,
          label: `${emoji} ` + formatMessage({ id: `data.countries.${id}` }),
        })),
    ],
    [formatMessage, locale],
  )

  const validateName = (input) => {
    const expression = new RegExp(
      /^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.]{1,30}$/,
    )
    return (
      expression.test(input) ||
      translate('components.create_account_form.fill_field')
    )
  }

  const validateURL = (input) => {
    const expression = new RegExp(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
    )
    return (
      expression.test(input) || translate('components.create_account_form.www')
    )
  }

  return (
    <div className="step step-1">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="layout-columns__title centered">
          <Title tag="H1">
            {!isPublic && onboardProduct !== 'insights' && (
              <span>
                {translate('components.create_account_form.finance_you')}
              </span>
            )}

            {onboardProduct === 'insights' && (
              <span>
                {translate('components.create_account_form.RIfinance_you')}
              </span>
            )}
          </Title>
        </div>
        <div className="layout-columns__form--container">
          <CustomText
            name="name"
            title={formatMessage({ id: 'common.Company_name' })}
            defaultValue={registrationStep1FormSchema.name.defaultValue}
            required={registrationStep1FormSchema.name.required}
            singleCol
            validate={{
              invalid: (value) => validateName(value),
            }}
            hideErrors
            classes={textClasses}
            {...{ register, getValues, setValue, errors }}
          />
          <CustomText
            name="website"
            title={formatMessage({ id: 'common.Website' })}
            defaultValue={registrationStep1FormSchema.website.defaultValue}
            required={registrationStep1FormSchema.website.required}
            singleCol
            validate={{
              invalid: (value) => validateURL(value),
            }}
            hideErrors
            classes={textClasses}
            {...{ register, getValues, setValue, errors }}
          />
          <CustomSelect
            name="country"
            title={translate('common.Country')}
            options={countriesList}
            required
            singleCol
            maxMenuHeight={240}
            hideErrors
            defaultValue={registrationStep1FormSchema.country.defaultValue}
            isSearcheable={true}
            onMenuOpen={size.width < 600 && onMenuOpen}
            classes={selectClasses}
            {...{ register, getValues, setValue, watch, errors }}
          />
          <CustomSelect
            name="monthly_income"
            title={formatMessage({ id: 'common.monthly_income' })}
            options={monthlyIncomeByCurrency(getCurrency(country)).map(
              ({ value, name }) => ({
                value: value,
                label: formatMessage({ id: name }),
              }),
            )}
            maxMenuHeight={240}
            required
            singleCol
            hideErrors
            defaultValue={
              registrationStep1FormSchema.monthly_income.defaultValue
            }
            onMenuOpen={size.width < 600 && onMenuOpen}
            classes={selectClasses}
            {...{ register, getValues, setValue, watch, errors }}
          />
          <CustomSelect
            name="business_type"
            title={formatMessage({ id: 'common.business_type' })}
            options={businessType.map(({ value, name }) => ({
              value: value,
              label: formatMessage({ id: name }),
            }))}
            required
            maxMenuHeight={140}
            hideErrors
            defaultValue={
              registrationStep1FormSchema.business_type.defaultValue
            }
            onMenuOpen={size.width < 600 && onMenuOpen}
            classes={selectClasses}
            {...{ register, getValues, setValue, watch, errors }}
          />

          <div className="required-fields">
            <span>*</span>{' '}
            {translate('components.create_account_form.all_fields_required')}
          </div>

          <div className="active layout-columns__submit">
            <CustomButton
              id="submit-step1"
              type="submit"
              label={translate('common.Continue')}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Step1
