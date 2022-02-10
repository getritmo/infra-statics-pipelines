import moment from 'moment'

export const paymentFormSchema = [
  // File is directly included in formToSend
  // {id:  'invoice', defaultValue: '', type: 'file', parseValue: (v) => (v)},
  {
    id: 'invoice_number',
    defaultValue: '',
    type: 'text',
    parseValue: (v) => v,
  },
  {
    id: 'start_date',
    defaultValue: '',
    type: 'date',
    parseValue: (v) => moment(v).format('DD-MM-YYYY'),
  },
  {
    id: 'end_date',
    defaultValue: '',
    type: 'date',
    parseValue: (v) => moment(v).format('DD-MM-YYYY'),
  },
  {
    id: 'quantity',
    defaultValue: 0,
    type: 'number',
    parseValue: (v) => parseInt(Number(v.toString().replace(',', '.')) * 100),
  },
  {
    id: 'income',
    defaultValue: 0,
    type: 'number',
    parseValue: (v) => parseInt(Number(v).toString().replace(',', '.') * 100),
  },
]
