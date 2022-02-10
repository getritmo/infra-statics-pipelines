import moment from 'moment'
import React from 'react'

export const userRoutes = [
  '/sales-accounts',
  '/marketing-accounts',
  '/finance-accounts',
  '/company-details',
  '/offer',
  '/contract-signal',
  '/verification-admins',
  '/my-advances/:offer/:deployment',
  '/direct-debit',
  '/direct-debit/cancel',
  '/direct-debit/success',
]

export const defaultRoute = '/sales-accounts'

// export const

export const products = [
  {
    value: 'marketing',
    labelId: 'components.offerForm.marketing',
  },
  {
    value: 'marketplace',
    labelId: 'components.offerForm.marketplace',
  },
  {
    value: 'inventory',
    labelId: 'components.offerForm.inventory',
  },
]

export const currencies = [
  {
    value: 'EUR',
    labelId: 'common.currency.EUR',
  },
  {
    value: 'GBP',
    labelId: 'common.currency.GBP',
  },
  {
    value: 'MXN',
    labelId: 'common.currency.MXN',
  },
  {
    value: 'USD',
    labelId: 'common.currency.USD',
  },
]

export const optionsLTV = [
  {
    value: 'retention',
    label: 'data.ri.retention',
    numsToAvoid: [],
    multiplier: 100,
    format: 'percentage',
    noDecimals: false,
  },
  {
    value: 'revenue',
    label: 'data.ri.revenue',
    numsToAvoid: [],
    multiplier: 1,
    format: 'kFormatterEuro',
    noDecimals: true,
  },
  {
    value: 'aov',
    label: 'data.ri.aov',
    numsToAvoid: [],
    multiplier: 1,
    format: 'kFormatterEuro',
    noDecimals: false,
  },
  {
    value: 'customer',
    label: 'data.ri.customer',
    numsToAvoid: [],
    multiplier: 1,
    format: 'kFormatter',
    noDecimals: true,
  },
  {
    value: 'order',
    label: 'data.ri.order',
    numsToAvoid: [],
    multiplier: 1,
    format: 'kFormatter',
    noDecimals: true,
  },
]

export const getCurrency = (country) => {
  switch (country) {
    case 'GB':
      return 'GBP'
    case 'MX':
      return 'MXN'
    default:
      return 'EUR'
  }
}

export const monthlyIncomeByCurrency = (currency) => [
  {
    id: 1,
    name: `data.monthlyIncome.${currency}.value1`,
    value: 0,
    gaName: 'Less than €10K',
  },
  {
    id: 2,
    name: `data.monthlyIncome.${currency}.value2`,
    value: 1,
    gaName: '€10K - €50K',
  },
  {
    id: 3,
    name: `data.monthlyIncome.${currency}.value3`,
    value: 2,
    gaName: '€50K - €250K',
  },
  {
    id: 4,
    name: `data.monthlyIncome.${currency}.value4`,
    value: 3,
    gaName: '€250K - €750K',
  },
  {
    id: 5,
    name: `data.monthlyIncome.${currency}.value5`,
    value: 4,
    gaName: '€750K - €2MM',
  },
  {
    id: 6,
    name: `data.monthlyIncome.${currency}.value6`,
    value: 5,
    gaName: 'More than €2MM',
  },
]

// Arrays of connector that work with Rutter
// and converts the proper naming that Rutters uses
export const rutterAccounts = [
  { title: 'prestashop', connector: 'PRESTASHOP' },
  { title: 'shopify', connector: 'SHOPIFY' },
  { title: 'magento', connector: 'MAGENTO' },
  { title: 'woocommerce', connector: 'WOO_COMMERCE' },
  { title: 'amazonseller', connector: 'AMAZON' },
]

export const convertKey = (key) => {
  switch (key) {
    case 'gas':
      return 'googleads'
    case 'aas':
      return 'amazonads'
    case 'fas':
      return 'facebookads'
    case 'bas':
      return 'bingads'
    default:
      return key
  }
}

export const updateKey = (key) => {
  switch (key) {
    case 'googleads':
      return 'gas'
    case 'amazonads':
      return 'aas'
    case 'facebookads':
      return 'fas'
    case 'bingads':
      return 'bas'
    default:
      return key
  }
}

export function setCookie(c_name, value, exdays) {
  const exdate = new Date()
  exdate.setDate(exdate.getDate() + exdays)
  const c_value =
    escape(value) + (exdays == null ? '' : '; expires=' + exdate.toUTCString())
  document.cookie = c_name + '=' + c_value
}

export function getCookie(c_name) {
  let i
  let x
  let y
  const ARRcookies = document.cookie.split(';')
  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf('='))
    y = ARRcookies[i].substr(ARRcookies[i].indexOf('=') + 1)
    x = x.replace(/^\s+|\s+$/g, '')
    if (x === c_name) {
      return unescape(y)
    }
  }
}

export const businessType = [
  {
    id: 1,
    name: 'data.businessType.ecommerce',
    value: 0,
    gaName: 'Ecommerce',
  },
  {
    id: 5,
    name: 'data.businessType.marketplace',
    value: 4,
    gaName: 'Marketplace Sellers',
  },
  {
    id: 2,
    name: 'data.businessType.mobileApp',
    value: 1,
    gaName: 'Mobile App',
  },
  { id: 3, name: 'data.businessType.saas', value: 2, gaName: 'Saas' },
  {
    id: 6,
    name: 'data.businessType.video',
    value: 5,
    gaName: 'Video Game',
  },
  { id: 4, name: 'data.businessType.other', value: 3, gaName: 'Other' },
]

export const RIConnectors = [
  'shopify',
  'stripe',
  'googleads',
  'amazonseller',
  'facebookads',
  'googleanalytics',
  'magento',
  'prestashop',
  'woocommerce',
]
export const salesConnector = [
  'stripe',
  'shopify',
  'magento',
  'prestashop',
  'woocommerce',
  'amazonseller',
]

export const marketingConnector = ['googleads', 'facebookads']
export const openbankingConnector = ['openbanking']
export const analisysConnector = ['googleanalytics']

export const RIConnectorsByType = {
  revenue: {
    items: salesConnector,
    criteria: 'at_least_one',
  },
  customers: {
    items: salesConnector,
    criteria: 'at_least_one',
  },
  cac: {
    items: salesConnector,
    criteria: 'at_least_one',
  },
  ltv: {
    items: salesConnector,
    criteria: 'at_least_one',
  },
  ltv_cac: {
    items: [salesConnector, marketingConnector],
    criteria: 'or_and',
  },
  ltv_cohorts: {
    items: [salesConnector, marketingConnector],
    criteria: 'or_and',
  },
  percentage_first_retention: {
    items: salesConnector,
    criteria: 'at_least_one',
  },
  percentage_retention: {
    items: salesConnector,
    criteria: 'at_least_one',
  },
  transactions: {
    items: salesConnector,
    criteria: 'at_least_one',
  },
  marketingSpend: {
    items: marketingConnector,
    criteria: 'at_least_one',
  },
  balanceCashFlow: {
    items: openbankingConnector,
    criteria: 'at_least_one',
  },
  sessions: {
    items: analisysConnector,
    criteria: 'at_least_one',
  },
  aov: {
    items: salesConnector,
    criteria: 'at_least_one',
  },
  blendedRoas: {
    items: [salesConnector, marketingConnector],
    criteria: 'or_and',
  },
  conversionRate: {
    items: ['googleanalytics', salesConnector],
    criteria: 'or_and',
  },
}

export const accountsMarketing = [
  'googleanalytics',
  'googleads',
  'facebookads',
  'amazonads',
  'bingads',
  'marketingothers',
]
export const accountsManualMarketing = [
  'manual_googleanalytics',
  'manual_googleads',
  'manual_facebookads',
  'manual_amazonads',
  'manual_bingads',
]

export const accountsSales = [
  'stripe',
  'shopify',
  'paypal',
  'amazonseller',
  'googleplay',
  'appstore',
  'magento',
  'mercadolibre',
  'mercadopago',
  'prestashop',
  'woocommerce',
  'salesothers',
]
export const accountsManualSales = [
  'manual_stripe',
  'manual_shopify',
  'manual_paypal',
  'manual_amazonseller',
  'manual_googleplay',
  'manual_appstore',
  'manual_magento',
  'manual_prestashop',
  'manual_woocommerce',
]

export const accountsFinance = [
  'holded',
  'sage',
  'sageone',
  'quickbooks',
  'freeagent',
  'freshbooks',
  'kashflow',
  'nutcache',
  'xero',
  'zohobooks',
  'financeothers',
]
export const accountsFinanceManual = [
  'manual_bankingtransactions',
  'manual_balance',
  'manual_profitandloss',
]

export const customStyles = ({ type = undefined } = {}) => ({
  option: (provided, { isDisabled, isFocused, isSelected }) => ({
    ...provided,
    backgroundColor: isDisabled
      ? null
      : isSelected
      ? '#FFFFFF'
      : isFocused
      ? '#f0f0f0'
      : null,
    color: isDisabled
      ? null
      : isSelected
      ? '#104E89'
      : isFocused
      ? '#000000'
      : null,
    cursor: 'pointer',
    fontSize: 14,
  }),
  input: (provided, state) => ({
    ...provided,
    border: state.isSelected ? 'black' : '#ccc',
  }),
  container: (provided) => ({
    ...provided,
    zIndex: type === 'currency' ? 11 : 10,
  }),
  valueContainer: (provided) => ({
    ...provided,
    caretColor: 'transparent',
  }),
  control: (provided, state) => ({
    ...provided,
    boxShadow: 'none',
    '&:hover': { borderColor: 'gray' }, // border style on hover
    borderColor: 'orange',
    cursor: 'pointer',
    borderRadius: 0,
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderBottom: '1px solid #ccc',
    color: state.isSelected ? 'black' : '#ccc',
    padding: 0,
    fontFamily: 'Gilroy Semi Bold',
    fontSize: '12px',
    width: type === 'currency' ? 100 : 170,
    // zIndex: 10,
  }),
})

export const optionsSelect = [
  { value: 'last_7_days', label: 'components.filter.last_7_days' },
  { value: 'last_2_weeks', label: 'components.filter.last_2_weeks' },
  { value: 'last_4_weeks', label: 'components.filter.last_4_weeks' },
  { value: 'month_to_date', label: 'components.filter.month_to_date' },
  { value: 'last_3_months', label: 'components.filter.last_3_months' },
  { value: 'last_12_months', label: 'components.filter.last_12_months' },
  { value: 'year_to_date', label: 'components.filter.year_to_date' },
  { value: 'custom_period', label: 'components.filter.custom_period' },
]

export const optionsLanguages = [
  {
    value: 'es-ES',
    label: (
      <>
        <img
          src="/images/flags/flag-es.png"
          height={20}
          width={20}
          style={{ marginRight: 12 }}
        />
        <span className="mobile">ES</span>
        <span className="desktop">Español (ES)</span>
      </>
    ),
  },
  {
    value: 'es-MX',
    label: (
      <>
        <img
          className="language__selector--flag"
          src="/images/flags/flag-es-mx.png"
          height={20}
          width={20}
          style={{ marginRight: 12 }}
        />
        <span className="mobile">MX</span>
        <span className="desktop">Español (MX)</span>
      </>
    ),
  },
  {
    value: 'en-GB',
    label: (
      <>
        <img
          className="language__selector--flag"
          src="/images/flags/flag-en.png"
          height={20}
          width={20}
          style={{ marginRight: 12 }}
        />
        <span className="mobile">UK</span>
        <span className="desktop">English (UK)</span>
      </>
    ),
  },
  {
    value: 'fr-FR',
    label: (
      <>
        <img
          className="language__selector--flag"
          src="/images/flags/flag-fr.png"
          height={20}
          width={20}
          style={{ marginRight: 12 }}
        />
        <span className="mobile">FR</span>
        <span className="desktop">Français (FR)</span>
      </>
    ),
  },
]

export const monthsShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const evalFilterAggregate = (filter) => {
  switch (filter) {
    case 'last_7_days':
      return true
    case 'last_2_weeks':
      return true
    case 'last_4_weeks':
      return true
    default:
      return false
  }
}

export const getLabel = (filter) => {
  switch (filter) {
    case 'last_7_days':
      return 'Last Week'
    case 'last_2_weeks':
      return 'Last 2 Weeks'
    case 'last_4_weeks':
      return 'Last 4 Weeks'
    case 'month_to_date':
      return 'Current Month'
    case 'last_3_months':
      return 'Last 3 Months'
    case 'last_12_months':
      return 'Last 12 Months'
    case 'year_to_date':
      return 'Current year'
    default:
      return ' '
  }
}

export const getPrevLabel = (filter) => {
  switch (filter) {
    case 'last_7_days':
      return 'Last Year'
    case 'last_2_weeks':
      return 'Last Year'
    case 'last_4_weeks':
      return 'Last Year'
    case 'month_to_date':
      return 'Last Year'
    case 'last_3_months':
      return 'Last Year'
    case 'last_12_months':
      return '12 Previous Months'
    case 'year_to_date':
      return 'Last Year'
    default:
      return ' '
  }
}

export const getYear = (value) => {
  const date = new Date(value)
  const year = date.getFullYear()
  return " '" + year.toString().substr(0, 2)
}

export const getPreviousYear = (value) => {
  const newDate = new Date(value)
  newDate.setFullYear(newDate.getFullYear() - 1)
  return newDate
}

export const formatMonthAndYear = (date, locale) => {
  const lang = locale.substr(0, 2)
  const month = moment(date).locale(lang).format('MMMM')
  const year = moment(date).format('YYYY')
  return `${month[0].toUpperCase()}${month.substr(1, 2)} '${year.substr(2, 2)}`
}

export const formatDate = (value, aggregate, i) => {
  const newDate = new Date(value)
  const year =
    newDate.getFullYear() - (i === undefined || i === 0 ? 2000 : 2001)
  const day = newDate.getDate()
  let newDate1000
  let year1000
  let day1000

  switch (aggregate) {
    case 'daily':
      return day + ' ' + monthsShort[newDate.getMonth()] + " '" + year
    case 'invoice':
      newDate1000 = new Date(value * 1000)
      year1000 = newDate1000.getFullYear() - 2000
      day1000 = newDate1000.getDate()
      return (
        day1000 + ' ' + monthsShort[newDate1000.getMonth()] + " '" + year1000
      )
    case 'weekly':
      return day + ' ' + monthsShort[newDate.getMonth()] + " '" + year
    case 'monthly':
      return monthsShort[newDate.getMonth()] + " '" + year
    default:
      return aggregate
  }
}

export const checkAccounts = (items, accounts) => {
  const validator = 0
  const connectors = items.items
  const criteria = items.criteria

  // Used criteria in cases there are multiple criteria,
  // so we can validate the first one and then return true if the second one applies
  let criteria1 = false

  for (let i = 0; i < connectors.length; i++) {
    const connector = connectors[i]

    // on connector should be connected at least
    if (criteria === 'at_least_one') {
      if (accounts?.[connector] !== undefined) {
        for (let j = 0; j < accounts[connector].length; j++) {
          if (
            accounts[connector][j] !== undefined &&
            accounts[connector][j].status === 'connected'
          ) {
            // Criteria is successful
            return true
          }
        }
      }
    }

    // on connector should be connected at least from each array of items
    if (criteria === 'or_and') {
      if (typeof connector === 'string') {
        if (accounts[connector] !== undefined) {
          for (let j = 0; j < accounts[connector].length; j++) {
            if (
              accounts[connector][j] !== undefined &&
              accounts[connector][j].status === 'connected'
            ) {
              // From the first array one is connected at least
              criteria1 = true
            }
          }
        }
      } else {
        for (let k = 0; k < connector.length; k++) {
          for (let j = 0; j < accounts[connector[k]].length; j++) {
            if (accounts[connector[k]][j].status === 'connected') {
              if (i === 0) {
                // From the first array one is connected at least
                criteria1 = true
              } else {
                if (criteria1) {
                  // Criteria is successful
                  return true
                }
              }
            }
          }
        }
      }
    }
  }

  return validator === 2
}

export const checkLastSync = (items, accounts) => {
  const arrayConnectors = createArray(items.items)
  let lastSyncIsPendent = false

  for (let i = 0; i < arrayConnectors.length; i++) {
    for (let j = 0; j < accounts[arrayConnectors[i]].length; j++) {
      if (
        accounts[arrayConnectors[i]][j].last_sync === 0 &&
        accounts[arrayConnectors[i]][j].status === 'connected'
      ) {
        lastSyncIsPendent = true
        break
      }
    }
  }

  return lastSyncIsPendent
}

export const createArray = (items) => {
  const arrayItems = []

  for (let i = 0; i < items.length; i++) {
    if (typeof items[i] === 'string') {
      arrayItems.push(items[i])
    } else {
      for (let j = 0; j < items[i].length; j++) {
        if (typeof items[i][j] === 'string') {
          arrayItems.push(items[i][j])
        }
      }
    }
  }

  return arrayItems
}

export const kFormatter = (num, noDecimals) => {
  const decimals = Math.abs(num) < 10000 ? 2 : 1
  const decimalsMillons = 2
  const isMillons = Math.abs(num) > 1000000
  if (isMillons) {
    return (
      Math.sign(num) * (Math.abs(num) / 1000000).toFixed(decimalsMillons) + 'M'
    )
  } else {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(decimals) + 'k'
      : (Math.sign(num) * Math.abs(num)).toFixed(noDecimals ? 0 : 2)
  }
}

const getCurrencySymbol = (currency) => {
  switch (currency.toUpperCase()) {
    case 'MXN':
      return ' MXN $'
    case 'EUR':
      return '€'
    case 'GBP':
      return '£'
    case 'USD':
      return 'USD $'
    default:
      return '€'
  }
}

export const kFormatterCurrency = (num, currency) => {
  const decimals = Math.abs(num) < 10000 ? 2 : 1
  const decimalsMillons = 2
  const isMillons = Math.abs(num) > 1000000
  let currencySymbol = getCurrencySymbol(currency)
  if (isMillons) {
    const result =
      Math.sign(num) * (Math.abs(num) / 1000000).toFixed(decimalsMillons) + 'M'
    return `${currencySymbol} ` + result
  } else {
    const result =
      Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(decimals) + 'k'
        : parseFloat(Math.sign(num) * Math.abs(num)).toFixed(decimals)
    return `${currencySymbol} ` + result
  }
}

export const getFormat = (
  value,
  format,
  noDecimals = false,
  currency = undefined,
) => {
  if (format === 'kFormatter' || format === 'number') {
    return kFormatter(value, noDecimals)
  }
  if (format === 'kFormatterEuro' || format === 'currency') {
    return kFormatterCurrency(value, currency)
  }

  if (format === 'percentage') {
    let toFixed = 2
    if (value > 99) {
      toFixed = 0
    }
    return parseFloat(value).toFixed(toFixed) + '%'
  }

  if (format === 'euro' || format === 'eur') {
    const currencySymbol = getCurrencySymbol(currency)
    return (
      `${currencySymbol} ` +
      parseFloat(value)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    )
  }

  if (format === 'ratio') {
    return parseFloat(value).toFixed(1) + 'x'
  }
  return value
}

export const messages = {
  revenue: {
    stripe: 'components.revenue_info.stripe',
    shopify: 'components.revenue_info.shopify',
    magento: 'components.revenue_info.magento',
    prestashop: 'components.revenue_info.prestashop',
    woocommerce: 'components.revenue_info.woocommerce',
    amazonseller: 'components.revenue_info.amazonseller',
  },
  customers: {
    stripe: 'components.revenue_info.stripe',
    shopify: 'components.revenue_info.shopify',
    magento: 'components.revenue_info.magento',
    prestashop: 'components.revenue_info.prestashop',
    woocommerce: 'components.revenue_info.woocommerce',
    amazonseller: 'components.revenue_info.amazonseller',
  },
  ltv_cac: {
    stripe: 'components.revenue_info.stripe',
    shopify: 'components.revenue_info.shopify',
    magento: 'components.revenue_info.magento',
    prestashop: 'components.revenue_info.prestashop',
    woocommerce: 'components.revenue_info.woocommerce',
    amazonseller: 'components.revenue_info.amazonseller',
    googleads: 'components.marketingSpend_info.googleads',
    facebookads: 'components.marketingSpend_info.facebookads',
  },
  ltv_cohorts: {
    stripe: 'components.revenue_info.stripe',
    shopify: 'components.revenue_info.shopify',
    magento: 'components.revenue_info.magento',
    prestashop: 'components.revenue_info.prestashop',
    woocommerce: 'components.revenue_info.woocommerce',
    amazonseller: 'components.revenue_info.amazonseller',
    googleads: 'components.marketingSpend_info.googleads',
    facebookads: 'components.marketingSpend_info.facebookads',
  },
  ltv: {
    stripe: 'components.revenue_info.stripe',
    shopify: 'components.revenue_info.shopify',
    magento: 'components.revenue_info.magento',
    prestashop: 'components.revenue_info.prestashop',
    woocommerce: 'components.revenue_info.woocommerce',
    amazonseller: 'components.revenue_info.amazonseller',
    googleads: 'components.marketingSpend_info.googleads',
    facebookads: 'components.marketingSpend_info.facebookads',
  },
  cac: {
    stripe: 'components.revenue_info.stripe',
    shopify: 'components.revenue_info.shopify',
    magento: 'components.revenue_info.magento',
    prestashop: 'components.revenue_info.prestashop',
    woocommerce: 'components.revenue_info.woocommerce',
    amazonseller: 'components.revenue_info.amazonseller',
    googleads: 'components.marketingSpend_info.googleads',
    facebookads: 'components.marketingSpend_info.facebookads',
  },
  percentage_retention: {
    stripe: 'components.revenue_info.stripe',
    shopify: 'components.revenue_info.shopify',
    magento: 'components.revenue_info.magento',
    prestashop: 'components.revenue_info.prestashop',
    woocommerce: 'components.revenue_info.woocommerce',
    amazonseller: 'components.revenue_info.amazonseller',
    googleads: 'components.marketingSpend_info.googleads',
    facebookads: 'components.marketingSpend_info.facebookads',
  },
  percentage_first_retention: {
    stripe: 'components.revenue_info.stripe',
    shopify: 'components.revenue_info.shopify',
    magento: 'components.revenue_info.magento',
    prestashop: 'components.revenue_info.prestashop',
    woocommerce: 'components.revenue_info.woocommerce',
    amazonseller: 'components.revenue_info.amazonseller',
    googleads: 'components.marketingSpend_info.googleads',
    facebookads: 'components.marketingSpend_info.facebookads',
  },
  sessions: {
    googleanalytics: 'components.sessions_info.googleanalytics',
  },
  marketingSpend: {
    googleads: 'components.marketingSpend_info.googleads',
    facebookads: 'components.marketingSpend_info.facebookads',
  },
  balanceCashFlow: {
    openbanking: 'components.balanceCashFlow_info.openbanking',
  },
  aov: {
    stripe: 'components.aov_info.stripe',
    shopify: 'components.aov_info.shopify',
    magento: 'components.aov_info.magento',
    prestashop: 'components.aov_info.prestashop',
    woocommerce: 'components.aov_info.woocommerce',
    amazonseller: 'components.revenue_info.amazonseller',
  },
  transactions: {
    stripe: 'components.transactions_info.stripe',
    shopify: 'components.transactions_info.shopify',
    magento: 'components.transactions_info.magento',
    prestashop: 'components.transactions_info.prestashop',
    woocommerce: 'components.transactions_info.woocommerce',
    amazonseller: 'components.revenue_info.amazonseller',
  },
  blendedRoas: {
    stripe: 'components.blendedRoas_info.stripe',
    shopify: 'components.blendedRoas_info.shopify',
    magento: 'components.blendedRoas_info.magento',
    prestashop: 'components.blendedRoas_info.prestashop',
    woocommerce: 'components.blendedRoas_info.woocommerce',
    amazonseller: 'components.revenue_info.amazonseller',
    googleads: 'components.blendedRoas_info.googleads',
    facebookads: 'components.blendedRoas_info.facebookads',
  },
  conversionRate: {
    stripe: 'components.conversionRate_info.stripe',
    shopify: 'components.conversionRate_info.shopify',
    magento: 'components.conversionRate_info.magento',
    prestashop: 'components.conversionRate_info.prestashop',
    woocommerce: 'components.conversionRate_info.woocommerce',
    amazonseller: 'components.revenue_info.amazonseller',
    googleanalytics: 'components.conversionRate_info.googleanalytics',
  },
}

export const dataKpi = {
  revenue: {
    id: 1,
    type: 'revenue',
    title: 'components.kpi.revenue.title',
    label: '--',
    label_prev: '--',
    value: '--',
    format: 'kFormatterEuro',
    value_prev: '--',
    percentage: '--',
    showState: true,
    showHelp: true,
    api: 'revenue',
  },
  customers: {
    id: 1,
    type: 'customers',
    title: 'components.kpi.customers.title',
    label: '--',
    label_prev: '--',
    value: '--',
    format: 'kFormatter',
    value_prev: '--',
    percentage: '--',
    showState: true,
    showHelp: true,
    api: 'customers',
  },
  cac: {
    id: 1,
    type: 'cac',
    title: 'components.kpi.cac.title',
    label: '--',
    label_prev: '--',
    value: '--',
    format: 'kFormatterEuro',
    value_prev: '--',
    percentage: '--',
    showState: true,
    showHelp: true,
    api: 'cac',
  },
  ltv: {
    id: 1,
    type: 'ltv',
    title: 'components.kpi.ltv.title',
    label: '--',
    label_prev: '--',
    value: '--',
    format: 'kFormatterEuro',
    value_prev: '--',
    percentage: '--',
    showState: true,
    showHelp: true,
    api: 'ltv',
  },
  ltv_cac: {
    id: 1,
    type: 'ltv_cac',
    title: 'components.kpi.ltv_cac.title',
    label: '--',
    label_prev: '--',
    value: '--',
    format: 'kFormatterEuro',
    value_prev: '--',
    percentage: '--',
    showState: true,
    showHelp: true,
    api: 'ltv_cac',
  },
  ltv_cohorts: {
    id: 1,
    type: 'ltv_cohorts',
    title: 'components.kpi.ltv_cohorts.title',
    label: '--',
    label_prev: '--',
    value: '--',
    format: 'kFormatterEuro',
    value_prev: '--',
    percentage: '--',
    showState: true,
    showHelp: true,
    api: 'ltv_cohorts',
  },
  score_card: {
    id: 1,
    type: 'score_card',
    title: 'components.kpi.score_card.title',
    label: '--',
    label_prev: '--',
    value: '--',
    format: 'kFormatterEuro',
    value_prev: '--',
    percentage: '--',
    showState: true,
    showHelp: true,
    api: 'score_card',
  },
  percentage_first_retention: {
    id: 1,
    type: 'percentage_first_retention',
    title: 'components.kpi.percentage_first_retention.title',
    label: '--',
    label_prev: '--',
    value: '--',
    format: 'percentage',
    value_prev: '--',
    percentage: '--',
    showState: true,
    showHelp: true,
    api: 'percentage_first_retention',
  },
  percentage_retention: {
    id: 1,
    type: 'percentage_retention',
    title: 'components.kpi.percentage_retention.title',
    label: '--',
    label_prev: '--',
    value: '--',
    format: 'percentage',
    value_prev: '--',
    percentage: '--',
    showState: true,
    showHelp: true,
    api: 'percentage_retention',
  },
  transactions: {
    id: 2,
    type: 'transactions',
    title: 'components.kpi.transactions.title',
    label: '--',
    label_prev: '--',
    value: '--',
    format: 'kFormatter',
    value_prev: '--',
    percentage: '--',
    showState: true,
    showHelp: false,
    api: 'transactions',
  },
  marketingSpend: {
    id: 3,
    type: 'marketingSpend',
    title: 'components.kpi.marketingSpend.title',
    label: '--',
    label_prev: '--',
    value: '--',
    format: 'kFormatterEuro',
    value_prev: '--',
    percentage: '--',
    api: 'marketing_spend',
  },
  balanceCashFlow: {
    id: 3,
    type: 'balanceCashFlow',
    title: 'components.kpi.balanceCashFlow.title',
    label: '--',
    label_prev: '--',
    value: '--',
    format: 'kFormatterEuro',
    value_prev: '--',
    percentage: '--',
    api: 'cashflow_balance',
  },
  sessions: {
    id: 4,
    type: 'sessions',
    title: 'components.kpi.sessions.title',
    label: '--',
    label_prev: '--',
    value: '--',
    format: 'kFormatter',
    value_prev: '--',
    percentage: '--',
    showState: true,
    showHelp: true,
    api: 'sessions',
  },
  aov: {
    id: 5,
    type: 'aov',
    title: 'components.kpi.aov.title',
    label: '--',
    label_prev: '--',
    value: '--',
    format: 'euro',
    value_prev: '--',
    percentage: '--',
    showState: true,
    showHelp: true,
    api: 'aov',
  },
  blendedRoas: {
    id: 6,
    type: 'blendedRoas',
    title: 'components.kpi.blendedRoas.title',
    label: '--',
    label_prev: '--',
    value: '--',
    format: 'euro',
    value_prev: '--',
    percentage: '--',
    showState: true,
    showHelp: true,
    api: 'blended_roas',
  },
  conversionRate: {
    id: 7,
    type: 'conversionRate',
    title: 'components.kpi.conversionRate.title',
    label: '--',
    label_prev: '--',
    value: '--',
    format: 'percentage',
    value_prev: '--',
    percentage: '--',
    showState: true,
    showHelp: true,
    api: 'conversion_rate',
  },
}

export const dataPrevision = {
  id: 8,
  title: '<b>Revenue history</b> and <b>forecast</b>',
  label: 'Revenue 2020',
  label_prev: "May 20'",
  value: 180295.42,
  format: 'kFormatter',
  //    percentage: '40.1%',
}

export const dataPrevision2020 = {
  id: 8,
  title: 'Revenue_20',
  value: 180295.42,
  format: 'kFormatterEuro',
}

export const dataPrevision2021 = {
  id: 8,
  title: 'Revenue_forecast_22',
  value: 375269.97,
  format: 'kFormatterEuro',
  percentage_value: '+108%',
}

export const dataPrevision2022 = {
  id: 8,
  title: 'Revenue_forecast_22',
  value: 529911.97,
  format: 'kFormatterEuro',
  percentage_value: '+41.2%',
}

export const dataPrevisionMay2020 = {
  id: 8,
  title: 'Revenue_august_20',
  value: 18237.99,
  format: 'kFormatterEuro',
}

export const dataPrevisionMay2021 = {
  id: 8,
  title: 'Revenue_august_21',
  value: 21117.98,
  format: 'kFormatterEuro',
  percentage_value: '+15.8%',
}

export const dataPrevisionMay2022 = {
  id: 8,
  title: 'Revenue_august_22',
  value: 27066.11,
  format: 'kFormatterEuro',
  percentage_value: '+28.1%',
}

export const dataLTV = [
  {
    x: '2021-01-01',
    value: 235.04,
    data: [
      {
        title: 'mo 0',
        value: 98.02,
      },
      {
        title: 'mo 1',
        value: 98.02,
      },
      {
        title: 'mo 2',
        value: 92.02,
      },
      {
        title: 'mo 3',
        value: 88.02,
      },
      {
        title: 'mo 4',
        value: 84.02,
      },
      {
        title: 'mo 5',
        value: 81.02,
      },
      {
        title: 'mo 6',
        value: 77.02,
      },
      {
        title: 'mo 7',
        value: 75.02,
      },
      {
        title: 'mo 8',
        value: 72.02,
      },
      {
        title: 'mo 9',
        value: 67.02,
      },
      {
        title: 'mo 10',
        value: 62.02,
      },
      {
        title: 'mo 11',
        value: 56.02,
      },
      {
        title: 'mo 12',
        value: 52.02,
      },
    ],
  },
  {
    x: '2021-02-01',
    value: 237.04,
    data: [
      {
        title: 'mo 1',
        value: 98.02,
      },
      {
        title: 'mo 2',
        value: 92.02,
      },
      {
        title: 'mo 3',
        value: 87.02,
      },
      {
        title: 'mo 4',
        value: 81.02,
      },
      {
        title: 'mo 5',
        value: '',
      },
      {
        title: 'mo 6',
        value: '',
      },
      {
        title: 'mo 7',
        value: '',
      },
      {
        title: 'mo 8',
        value: '',
      },
      {
        title: 'mo 9',
        value: '',
      },
      {
        title: 'mo 10',
        value: '',
      },
      {
        title: 'mo 11',
        value: '',
      },
      {
        title: 'mo 12',
        value: '',
      },
    ],
  },
]

export const dataCrecimiento = {
  id: 9,
  title: 'Year-to-year growth and forecast\n',
  label: 'Oct’21',
  label_prev: "May 20'",
  value: 5.42,
  value_prev: 4.42,
  format: 'percentage',
  percentage: '40.1%',
}

export const growth = {
  datasets: [
    {
      data: [
        { x: '2020-02-01', y: 0.3540720475743764 },
        { x: '2020-03-01', y: 3.0537584613414 },
        { x: '2020-04-01', y: 2.2108499003096487 },
        { x: '2020-05-01', y: 4.3289292236592 },
        { x: '2020-06-01', y: 5.19876754203889 },
        { x: '2020-07-01', y: 3.6486737931098645 },
        { x: '2020-08-01', y: -0.34767930957147086 },
        { x: '2020-09-01', y: 4.093273613075592 },
        { x: '2020-10-01', y: -0.049912910466254456 },
        { x: '2020-11-01', y: 2.6198119088991763 },
        { x: '2020-12-01', y: 1.0075730679490138 },
        { x: '2021-01-01', y: 2.4223338643140138 },
        { x: '2021-02-01', y: 2.2229526608618158 },
        { x: '2021-03-01', y: 1.3766784100945388 },
        { x: '2021-04-01', y: 1.2486572504482485 },
        { x: '2021-05-01', y: 0.15791159003815647 },
        { x: '2021-06-01', y: 0.30020711541920453 },
        { x: '2021-07-01', y: 2.591945839103425 },
        { x: '2021-08-01', y: 2.435232357462981 },
        { x: '2021-09-01', y: 0.7678929003107442 },
        { x: '2021-10-01', y: 4.317716333344618 },
        { x: '2021-11-01', y: 1.0455428365077752 },
        { x: '2021-12-01', y: 0.7800061622482553 },
        { x: '2022-01-01', y: 1.7998637671754896 },
        { x: '2022-02-01', y: 0.5653231072640295 },
        { x: '2022-03-01', y: 0.06232526187931953 },
        { x: '2022-04-01', y: 0.9300005394180533 },
        { x: '2022-05-01', y: 0.28166198471688486 },
        { x: '2022-06-01', y: -0.09574197762645631 },
        { x: '2022-07-01', y: 0.25343909466842285 },
        { x: '2022-08-01', y: 0.45287357262462047 },
        { x: '2022-09-01', y: 0.3118994750729922 },
        { x: '2022-10-01', y: 1.0588907214472028 },
        { x: '2022-11-01', y: 0.8048951939373821 },
        { x: '2022-12-01', y: 0.7574254929951658 },
        { x: '2023-01-01', y: 1.0010528902218416 },
        { x: '2023-02-01', y: 0.661338813351591 },
        { x: '2023-03-01', y: 0.22568274403568345 },
        { x: '2023-04-01', y: 0.4496755122071314 },
        { x: '2023-05-01', y: 0.21956849780952337 },
      ],
    },
  ],
}
export const prevision = {
  datasets: [
    {
      label: 'Real revenue ',
      data: [
        { x: '2019-03-01', y: 13156.77 },
        { x: '2019-04-01', y: 2419.79 },
        { x: '2019-05-01', y: 2029.8200000000002 },
        { x: '2019-06-01', y: 1559.8300000000002 },
        { x: '2019-07-01', y: 1609.8600000000001 },
        { x: '2019-08-01', y: 1854.8300000000002 },
        { x: '2019-09-01', y: 3224.61 },
        { x: '2019-10-01', y: 20376.91 },
        { x: '2019-11-01', y: 1399.8600000000001 },
        { x: '2019-12-01', y: 5609.17 },
        { x: '2020-01-01', y: 3769.4500000000003 },
        { x: '2020-02-01', y: 7238.81 },
        { x: '2020-03-01', y: 1713.81 },
        { x: '2020-04-01', y: 3276.57 },
        { x: '2020-05-01', y: 10258.220000000001 },
        { x: '2020-06-01', y: 5008.379999999999 },
        { x: '2020-07-01', y: 18237.989999999998 },
        { x: '2020-08-01', y: 44884.59999999999 },
        { x: '2020-09-01', y: 14990.160000000002 },
        { x: '2020-10-01', y: 13292.28 },
        { x: '2020-11-01', y: 35127.07 },
        { x: '2020-12-01', y: 5329.200000000001 },
        { x: '2021-01-01', y: 13644.700000000003 },
        { x: '2021-02-01', y: 14532.44 },
        { x: '2021-03-01', y: 5865.23 },
        { x: '2021-04-01', y: 10560.229999999998 },
        { x: '2021-05-01', y: 24380.49 },
        { x: '2021-06-01', y: 11262.129999999997 },
        { x: '2021-07-01', y: 21117.979999999996 },

        { x: '2021-08-01', y: 58359.27629274482 },

        { x: '2021-09-01', y: 53843.8428394946 },
        { x: '2021-10-01', y: 45662.070360458034 },
        { x: '2021-11-01', y: 62100.89766171853 },
        { x: '2021-12-01', y: 28339.17388366014 },
        { x: '2022-01-01', y: 27910.818341297647 },
        { x: '2022-02-01', y: 25867.832752503036 },
        { x: '2022-03-01', y: 16421.844963150696 },
        { x: '2022-04-01', y: 16530.172037022818 },
        { x: '2022-05-01', y: 25900.010423996133 },
        { x: '2022-06-01', y: 21735.916974996235 },
        { x: '2022-07-01', y: 27066.112160011475 },
        { x: '2022-08-01', y: 52771.84376762866 }, // ---------
        { x: '2022-09-01', y: 67489.97762220495 },
        { x: '2022-10-01', y: 66341.21529803546 },
        { x: '2022-11-01', y: 81470.13504397015 },
        { x: '2022-12-01', y: 58347.26216254676 },
        { x: '2023-01-01', y: 50376.10188306746 },
        { x: '2023-02-01', y: 45460.788727784144 },
        { x: '2023-03-01', y: 32860.98032628769 },
        { x: '2023-04-01', y: 27462.21639648514 },
        { x: '2023-05-01', y: 31745.195847036382 },
        { x: '2023-06-01', y: 31510.02657401935 },
        { x: '2023-07-01', y: 33008.977748529265 },
      ],
    },

    {
      label: 'Prev period min',
      data: [
        { x: '2019-03-01', y: 13156.77 },
        { x: '2019-04-01', y: 2419.79 },
        { x: '2019-05-01', y: 2029.8200000000002 },
        { x: '2019-06-01', y: 1559.8300000000002 },
        { x: '2019-07-01', y: 1609.8600000000001 },
        { x: '2019-08-01', y: 1854.8300000000002 },
        { x: '2019-09-01', y: 3224.61 },
        { x: '2019-10-01', y: 20376.91 },
        { x: '2019-11-01', y: 1399.8600000000001 },
        { x: '2019-12-01', y: 5609.17 },
        { x: '2020-01-01', y: 3769.4500000000003 },
        { x: '2020-02-01', y: 7238.81 },
        { x: '2020-03-01', y: 1713.81 },
        { x: '2020-04-01', y: 3276.57 },
        { x: '2020-05-01', y: 10258.220000000001 },
        { x: '2020-06-01', y: 5008.379999999999 },
        { x: '2020-07-01', y: 18237.989999999998 },
        { x: '2020-08-01', y: 44884.59999999999 },
        { x: '2020-09-01', y: 14990.160000000002 },
        { x: '2020-10-01', y: 13292.28 },
        { x: '2020-11-01', y: 35127.07 },
        { x: '2020-12-01', y: 5329.200000000001 },
        { x: '2021-01-01', y: 13644.700000000003 },
        { x: '2021-02-01', y: 14532.44 },
        { x: '2021-03-01', y: 5865.23 },
        { x: '2021-04-01', y: 10560.229999999998 },
        { x: '2021-05-01', y: 24380.49 },
        { x: '2021-06-01', y: 11262.129999999997 },
        { x: '2021-07-01', y: 21117.979999999996 },

        { x: '2021-08-01', y: 58839.53799630559 },
        { x: '2021-09-01', y: 49980.42783202244 },
        { x: '2021-10-01', y: 38136.79316653411 },
        { x: '2021-11-01', y: 50908.20660673755 },
        { x: '2021-12-01', y: 22813.28561856669 },
        { x: '2022-01-01', y: 21413.8546853017 },
        { x: '2022-02-01', y: 18721.650635853744 },
        { x: '2022-03-01', y: 10953.537056760644 },
        { x: '2022-04-01', y: 10857.28580589273 },
        { x: '2022-05-01', y: 16387.027813881217 },
        { x: '2022-06-01', y: 13294.412279949507 },
        { x: '2022-07-01', y: 14893.332633847163 },
        { x: '2022-08-01', y: 27833.325531891205 },
        { x: '2022-09-01', y: 31699.459032541243 },
        { x: '2022-10-01', y: 31341.772797968097 },
        { x: '2022-11-01', y: 35227.394547551114 },
        { x: '2022-12-01', y: 21912.789344884633 },
        { x: '2023-01-01', y: 18455.392179426806 },
        { x: '2023-02-01', y: 15615.937443917304 },
        { x: '2023-03-01', y: 10284.265683314785 },
        { x: '2023-04-01', y: 8083.652674036411 },
        { x: '2023-05-01', y: 8238.410677128148 },
        { x: '2023-06-01', y: 5813.418037949259 },
        { x: '2023-07-01', y: 5221.890984914892 },
      ],
    },
    {
      label: 'Prev period Max',
      data: [
        { x: '2019-03-01', y: 13156.77 },
        { x: '2019-04-01', y: 2419.79 },
        { x: '2019-05-01', y: 2029.8200000000002 },
        { x: '2019-06-01', y: 1559.8300000000002 },
        { x: '2019-07-01', y: 1609.8600000000001 },
        { x: '2019-08-01', y: 1854.8300000000002 },
        { x: '2019-09-01', y: 3224.61 },
        { x: '2019-10-01', y: 20376.91 },
        { x: '2019-11-01', y: 1399.8600000000001 },
        { x: '2019-12-01', y: 5609.17 },
        { x: '2020-01-01', y: 3769.4500000000003 },
        { x: '2020-02-01', y: 7238.81 },
        { x: '2020-03-01', y: 1713.81 },
        { x: '2020-04-01', y: 3276.57 },
        { x: '2020-05-01', y: 10258.220000000001 },
        { x: '2020-06-01', y: 5008.379999999999 },
        { x: '2020-07-01', y: 18237.989999999998 },
        { x: '2020-08-01', y: 44884.59999999999 },
        { x: '2020-09-01', y: 14990.160000000002 },
        { x: '2020-10-01', y: 13292.28 },
        { x: '2020-11-01', y: 35127.07 },
        { x: '2020-12-01', y: 5329.200000000001 },
        { x: '2021-01-01', y: 13644.700000000003 },
        { x: '2021-02-01', y: 14532.44 },
        { x: '2021-03-01', y: 5865.23 },
        { x: '2021-04-01', y: 10560.229999999998 },
        { x: '2021-05-01', y: 24380.49 },
        { x: '2021-06-01', y: 11262.129999999997 },
        { x: '2021-07-01', y: 21117.979999999996 },

        { x: '2021-08-01', y: 59400.24430064172 },
        { x: '2021-09-01', y: 60201.62542944512 },
        { x: '2021-10-01', y: 52206.031557337905 },
        { x: '2021-11-01', y: 73136.02058745372 },
        { x: '2021-12-01', y: 33861.79934044825 },
        { x: '2022-01-01', y: 33462.32627220808 },
        { x: '2022-02-01', y: 33322.46677731201 },
        { x: '2022-03-01', y: 21221.752518970246 },
        { x: '2022-04-01', y: 21848.888379362113 },
        { x: '2022-05-01', y: 35356.30806446605 },
        { x: '2022-06-01', y: 30295.384632376463 },
        { x: '2022-07-01', y: 39393.73750776639 },
        { x: '2022-08-01', y: 76528.34920062474 },
        { x: '2022-09-01', y: 99338.20117170873 },
        { x: '2022-10-01', y: 102783.55156441336 },
        { x: '2022-11-01', y: 128509.39696004207 },
        { x: '2022-12-01', y: 91836.98415355413 },
        { x: '2023-01-01', y: 81299.93119669658 },
        { x: '2023-02-01', y: 76137.25184622996 },
        { x: '2023-03-01', y: 56846.857996599676 },
        { x: '2023-04-01', y: 47513.66068838565 },
        { x: '2023-05-01', y: 56324.340015215836 },
        { x: '2023-06-01', y: 56544.840892446395 },
        { x: '2023-07-01', y: 60904.97032224802 },
      ],
    },
    {
      label: 'Prev period Normal',
      data: [
        { x: '2021-08-01', y: 58359.27629274482 },
        { x: '2021-09-01', y: 53843.8428394946 },
        { x: '2021-10-01', y: 45662.070360458034 },
        { x: '2021-11-01', y: 62100.89766171853 },
        { x: '2021-12-01', y: 28339.17388366014 },
        { x: '2022-01-01', y: 27910.818341297647 },
        { x: '2022-02-01', y: 25867.832752503036 },
        { x: '2022-03-01', y: 16421.844963150696 },
        { x: '2022-04-01', y: 16530.172037022818 },
        { x: '2022-05-01', y: 25900.010423996133 },
        { x: '2022-06-01', y: 21735.916974996235 },
        { x: '2022-07-01', y: 27066.112160011475 },
        { x: '2022-08-01', y: 52771.84376762866 }, // ---------
        { x: '2022-09-01', y: 67489.97762220495 },
        { x: '2022-10-01', y: 66341.21529803546 },
        { x: '2022-11-01', y: 81470.13504397015 },
        { x: '2022-12-01', y: 58347.26216254676 },
        { x: '2023-01-01', y: 50376.10188306746 },
        { x: '2023-02-01', y: 45460.788727784144 },
        { x: '2023-03-01', y: 32860.98032628769 },
        { x: '2023-04-01', y: 27462.21639648514 },
        { x: '2023-05-01', y: 31745.195847036382 },
        { x: '2023-06-01', y: 31510.02657401935 },
        { x: '2023-07-01', y: 33008.977748529265 },
      ],
    },
  ],
}

export const preventDefault = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

export const score_card_data = [
  {
    overall_score: 78.75,
    overall_score_marketplace: 62.5,
    revenue_trend: [
      35,
      '-',
      [
        67.9,
        [
          {
            title: 'Less than 0%',
            value: 0,
          },
          {
            title: 'Between 0% and 5%',
            value: 25,
          },
          {
            title: 'Between 5% and 10%',
            value: 50,
          },
          {
            title: 'Between 10% and 20%',
            value: 75,
          },
          {
            title: 'More than 20%',
            value: 100,
          },
        ],
      ],
    ],
    revenue_trend_marketplace: [
      35,
      '-',
      [
        100,
        [
          {
            title: 'Less than 0%',
            value: 0,
          },
          {
            title: 'Between 0% and 5%',
            value: 25,
          },
          {
            title: 'Between 5% and 10%',
            value: 50,
          },
          {
            title: 'Between 10% and 20%',
            value: 75,
          },
          {
            title: 'More than 20%',
            value: 100,
          },
        ],
      ],
    ],
    revenue_growth: [
      15,
      '3.60 %',
      [
        25,
        [
          {
            title: 'Less than 0%',
            value: 0,
          },
          {
            title: 'Between 0% and 5%',
            value: 25,
          },
          {
            title: 'Between 5% and 10%',
            value: 50,
          },
          {
            title: 'Between 10% and 20%',
            value: 75,
          },
          {
            title: 'More than 20%',
            value: 100,
          },
        ],
      ],
    ],
    revenue_growth_marketplace: [
      15,
      '55.19 %',
      [
        100,
        [
          {
            title: 'Less than 0%',
            value: 0,
          },
          {
            title: 'Between 0% and 5%',
            value: 25,
          },
          {
            title: 'Between 5% and 10%',
            value: 50,
          },
          {
            title: 'Between 10% and 20%',
            value: 75,
          },
          {
            title: 'More than 20%',
            value: 100,
          },
        ],
      ],
    ],
    revenue_growth_last_year: [
      15,
      125.63,
      [
        100,
        [
          {
            title: 'Less than 0%',
            value: 0,
          },
          {
            title: 'Between 0% and 5%',
            value: 25,
          },
          {
            title: 'Between 5% and 10%',
            value: 50,
          },
          {
            title: 'Between 10% and 20%',
            value: 75,
          },
          {
            title: 'More than 20%',
            value: 100,
          },
        ],
      ],
    ],
    revenue_growth_last_year_marketplace: [
      15,
      703.88,
      [
        100,
        [
          {
            title: 'Less than 0%',
            value: 0,
          },
          {
            title: 'Between 0% and 5%',
            value: 25,
          },
          {
            title: 'Between 5% and 10%',
            value: 50,
          },
          {
            title: 'Between 10% and 20%',
            value: 75,
          },
          {
            title: 'More than 20%',
            value: 100,
          },
        ],
      ],
    ],
    seasonality: [
      5,
      20.75,
      [
        100,
        [
          {
            title: 'More than 50%',
            value: 0,
          },
          {
            title: 'Between 40%-50%',
            value: 33,
          },
          {
            title: 'Between 25%-40%',
            value: 66,
          },
          {
            title: 'Less than 25%',
            value: 100,
          },
        ],
      ],
    ],
    seasonality_marketplace: [
      5,
      24.04,
      [
        100,
        [
          {
            title: 'More than 50%',
            value: 0,
          },
          {
            title: 'Between 40%-50%',
            value: 33,
          },
          {
            title: 'Between 25%-40%',
            value: 66,
          },
          {
            title: 'Less than 25%',
            value: 100,
          },
        ],
      ],
    ],
    marketing_performance: [
      30,
      '-',
      [
        100,
        [
          {
            title: 'Less than 1',
            value: 0,
          },
          {
            title: 'Between 1 and 1.5',
            value: 25,
          },
          {
            title: 'Between 1.5 and 2.5',
            value: 50,
          },
          {
            title: 'Between 2.5 and 3.5',
            value: 75,
          },
          {
            title: 'More than 3.5',
            value: 100,
          },
        ],
      ],
    ],
    marketing_performance_marketplace: [
      30,
      '-',
      [
        66.7,
        [
          {
            title: 'Less than 1',
            value: 0,
          },
          {
            title: 'Between 1 and 1.5',
            value: 25,
          },
          {
            title: 'Between 1.5 and 2.5',
            value: 50,
          },
          {
            title: 'Between 2.5 and 3.5',
            value: 75,
          },
          {
            title: 'More than 3.5',
            value: 100,
          },
        ],
      ],
    ],
    ad_spend: [
      15,
      19.17,
      [
        100,
        [
          {
            title: 'Less than 1',
            value: 0,
          },
          {
            title: 'Between 1 and 1.5',
            value: 25,
          },
          {
            title: 'Between 1.5 and 2.5',
            value: 50,
          },
          {
            title: 'Between 2.5 and 3.5',
            value: 75,
          },
          {
            title: 'More than 3.5',
            value: 100,
          },
        ],
      ],
    ],
    conversion_rate: [
      7.5,
      15.64,
      [
        100,
        [
          {
            title: 'Less than 0.2%',
            value: 0,
          },
          {
            title: 'Between 0.2% to 0.75%',
            value: 25,
          },
          {
            title: 'Between 0.75% to 1.5%',
            value: 50,
          },
          {
            title: 'Between 1.5% to 2.5%',
            value: 75,
          },
          {
            title: 'More than 2.5%',
            value: 100,
          },
        ],
      ],
    ],
    commerce_conversion_rate: [
      7.5,
      170.45,
      [
        100,
        [
          {
            title: 'Less than -10%',
            value: 0,
          },
          {
            title: 'Between -10% and -2%',
            value: 25,
          },
          {
            title: 'Between -2% and +2%',
            value: 50,
          },
          {
            title: 'Between 2% and 10%',
            value: 75,
          },
          {
            title: 'Increase by 10%',
            value: 100,
          },
        ],
      ],
    ],
    geo_sales: [
      5,
      65.1,
      [
        25,
        [
          {
            title: 'More than 80%',
            value: 0,
          },
          {
            title: 'Between 60% and 80%',
            value: 25,
          },
          {
            title: 'Between 40% and 60%',
            value: 50,
          },
          {
            title: 'Between 25% and 40%',
            value: 75,
          },
          {
            title: 'Less than 25%',
            value: 100,
          },
        ],
      ],
    ],
    account_health: [
      10,
      'Multiple/Green',
      [
        100,
        [
          {
            title: 'Blocked multiple times/red performance',
            value: 0,
          },
          {
            title: 'Never Blocked/red performance',
            value: 25,
          },
          {
            title: 'Blocked multiple times/Green Performance',
            value: 50,
          },
          {
            title: 'Never Blocked/yellow performance',
            value: 75,
          },
          {
            title: 'Never Blocked/Green performance',
            value: 100,
          },
        ],
      ],
    ],
    brand_reseller: [
      5,
      'Brand Owner',
      [
        75,
        [
          {
            title: 'Reseller (Electronics)',
            value: 0,
          },
          {
            title: 'Reseller (Non Electronics)',
            value: 25,
          },
          {
            title: 'Reseller (>500 references)',
            value: 50,
          },
          {
            title: 'Brand Owner',
            value: 75,
          },
          {
            title: 'Mix Reseller/Brand owner, (>500 references)',
            value: 100,
          },
        ],
      ],
    ],
    product_catalog: [
      10,
      31,
      [
        50,
        [
          {
            title: '>50% Sales from Less than 5 references',
            value: 0,
          },
          {
            title:
              '>50% Sales from Less than 5 references (Brand owner or European supplier)',
            value: 25,
          },
          {
            title: '>50% sales distributed in >20 references',
            value: 50,
          },
          {
            title: '>50% sales distributed in >100 references',
            value: 75,
          },
          {
            title:
              '>50% sales distributed in >100 references  (Brand owner, or European supplier)',
            value: 100,
          },
        ],
      ],
    ],
    financials: [
      35,
      '-',
      [
        71.4,
        [
          {
            title: 'Less than -10%',
            value: 0,
          },
          {
            title: 'Between -10% and -2%',
            value: 25,
          },
          {
            title: 'Between -2% and +2%',
            value: 50,
          },
          {
            title: 'Between 2% and 10%',
            value: 75,
          },
          {
            title: 'Increase by 10%',
            value: 100,
          },
        ],
      ],
    ],
    financials_marketplace: [
      35,
      '-',
      [
        35.7,
        [
          {
            title: 'Less than -10%',
            value: 0,
          },
          {
            title: 'Between -10% and -2%',
            value: 25,
          },
          {
            title: 'Between -2% and +2%',
            value: 50,
          },
          {
            title: 'Between 2% and 10%',
            value: 75,
          },
          {
            title: 'Increase by 10%',
            value: 100,
          },
        ],
      ],
    ],
    gross_profit: [
      10,
      68.92,
      [
        100,
        [
          {
            title: 'Less than 0%',
            value: 0,
          },
          {
            title: 'Between 0% and 15%',
            value: 25,
          },
          {
            title: 'Between 15% and 30%',
            value: 50,
          },
          {
            title: 'Between 30% and 45%',
            value: 75,
          },
          {
            title: 'More than 45%',
            value: 100,
          },
        ],
      ],
    ],
    gross_profit_marketplace: [
      10,
      21.4,
      [
        50,
        [
          {
            title: 'Less than 0%',
            value: 0,
          },
          {
            title: 'Between 0% and 15%',
            value: 25,
          },
          {
            title: 'Between 15% and 30%',
            value: 50,
          },
          {
            title: 'Between 30% and 45%',
            value: 75,
          },
          {
            title: 'More than 45%',
            value: 100,
          },
        ],
      ],
    ],
    net_profit: [
      10,
      10,
      [
        50,
        [
          {
            title: 'Less than 0%',
            value: 0,
          },
          {
            title: 'Between 0% and 5%',
            value: 25,
          },
          {
            title: 'Between 5% and 12%',
            value: 50,
          },
          {
            title: 'Between 12% and 20%',
            value: 75,
          },
          {
            title: 'More than 20%',
            value: 100,
          },
        ],
      ],
    ],
    net_profit_marketplace: [
      10,
      2.66,
      [
        25,
        [
          {
            title: 'Less than 0%',
            value: 0,
          },
          {
            title: 'Between 0% and 5%',
            value: 25,
          },
          {
            title: 'Between 5% and 12%',
            value: 50,
          },
          {
            title: 'Between 12% and 20%',
            value: 75,
          },
          {
            title: 'More than 20%',
            value: 100,
          },
        ],
      ],
    ],
    conversion_cycle: [
      5,
      -207.04,
      [
        100,
        [
          {
            title: 'Less than 10 days',
            value: 100,
          },
          {
            title: 'Between 10 and 30 days',
            value: 75,
          },
          {
            title: 'Between 30 and 60 days',
            value: 50,
          },
          {
            title: 'Between 60 and 90 days',
            value: 25,
          },
          {
            title: 'More than 90 days',
            value: 0,
          },
        ],
      ],
    ],
    conversion_cycle_marketplace: [
      10,
      44.83,
      [
        50,
        [
          {
            title: 'Less than 10 days',
            value: 100,
          },
          {
            title: 'Between 10 and 30 days',
            value: 75,
          },
          {
            title: 'Between 30 and 60 days',
            value: 50,
          },
          {
            title: 'Between 60 and 90 days',
            value: 25,
          },
          {
            title: 'More than 90 days',
            value: 0,
          },
        ],
      ],
    ],
    leverage: [
      10,
      2.24,
      [
        50,
        [
          {
            title: 'More than 4x',
            value: 0,
          },
          {
            title: 'Between 3x and 4x',
            value: 25,
          },
          {
            title: 'Between 2x and 3x',
            value: 50,
          },
          {
            title: 'Between 1x and 2x',
            value: 75,
          },
          {
            title: 'Less than 1x',
            value: 100,
          },
        ],
      ],
    ],
    leverage_marketplace: [
      5,
      3.08,
      [
        25,
        [
          {
            title: 'More than 4x',
            value: 0,
          },
          {
            title: 'Between 3x and 4x',
            value: 25,
          },
          {
            title: 'Between 2x and 3x',
            value: 50,
          },
          {
            title: 'Between 1x and 2x',
            value: 75,
          },
          {
            title: 'Less than 1x',
            value: 100,
          },
        ],
      ],
    ],
  },
]
