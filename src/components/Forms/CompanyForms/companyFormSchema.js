export const updateCompanyFormSchema = [
  {
    id: 'name',
    defaultValue: '',
    type: 'text',
    parseValue: (v) => v,
  },
  {
    id: 'monthly_income',
    defaultValue: '',
    type: 'number',
    parseValue: (v) => Number(v),
  },
  {
    id: 'business_type',
    defaultValue: '',
    type: 'number',
    parseValue: (v) => Number(v),
  },
  {
    id: 'website',
    defaultValue: '',
    type: 'number',
    parseValue: (v) => v,
  },
  {
    id: 'currency',
    defaultValue: '',
    type: 'text',
    parseValue: (v) => v,
  },
  {
    id: 'country',
    defaultValue: '',
    type: 'text',
    parseValue: (v) => v,
  },
  {
    id: 'notification_email',
    defaultValue: '',
    type: 'text',
    parseValue: (v) => v,
  },
]
