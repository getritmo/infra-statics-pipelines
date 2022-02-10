import { businessType, getCurrency, monthlyIncomeByCurrency } from 'data/data'

export const registrationStep1FormSchema = {
  name: {
    id: 'name',
    defaultValue: '',
    type: 'text',
    required: true,
    parseValue: (v) => v,
  },
  website: {
    id: 'website',
    defaultValue: '',
    type: 'text',
    required: true,
    parseValue: (v) => v,
  },
  country: {
    id: 'country',
    defaultValue: localStorage.getItem('locale_country'),
    type: 'text',
    required: true,
    parseValue: (v) => v,
  },
  monthly_income: {
    id: 'monthly_income',
    defaultValue: monthlyIncomeByCurrency(
      getCurrency(localStorage.getItem('locale_country')),
    )[0].value,
    type: 'number',
    required: true,
    parseValue: (v) => Number(v),
  },
  business_type: {
    id: 'business_type',
    defaultValue: businessType[0].value,
    type: 'number',
    required: true,
    parseValue: (v) => Number(v),
  },
}

export const registrationStep2FormSchema = {
  firstName: {
    id: 'firstName',
    defaultValue: '',
    type: 'text',
    required: true,
    parseValue: (v) => v,
  },
  surname: {
    id: 'surname',
    defaultValue: '',
    type: 'text',
    required: true,
    parseValue: (v) => v,
  },
  phone_number: {
    id: 'phone_number',
    defaultValue: '',
    type: 'text',
    required: true,
    parseValue: (v) => v,
  },
}
