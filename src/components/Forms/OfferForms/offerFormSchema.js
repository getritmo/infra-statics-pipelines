export const offerFormSchema = [
  {
    id: 'type',
    defaultValue: '',
    type: 'text',
    parseValue: (v) => v,
  },
  {
    id: 'currency',
    defaultValue: '',
    type: 'text',
    parseValue: (v) => Number(v),
  },
  {
    id: 'grace_days',
    defaultValue: '',
    type: 'number',
    parseValue: (v) => Number(v),
  },
  {
    id: 'is_accepted',
    defaultValue: '',
    type: 'boolean',
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
]
