import React, { Fragment, useEffect, useState } from 'react'
import Select from 'react-select'
import GraphLine from './../../components/charts/GraphLine'
import DashboardData from './../../components/dashboard/DashboardData'
import { Loading } from '../Loading'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import SVGInline from 'react-svg-inline/src'
import ConnectedAccounts from './ConnectedAccounts'
import {
  customStyles,
  optionsSelect,
  RIConnectors,
  RIConnectorsByType,
  dataKpi,
  getLabel,
  getPrevLabel,
  getFormat,
  evalFilterAggregate,
  checkAccounts,
  checkLastSync,
  currencies,
} from 'data/data'
import translate from 'i18n/translate'
import ConnectAccounts from '../Accounts/ConnectAccounts/ConnectAccounts'
import { useSelector } from 'react-redux'
import moment from 'moment'
import CustomDaterange from 'components/UI/CustomDaterange'
import useOuterClick from 'hooks/useOuterClick'
import InsightsIcon from 'components/UI/Icons/InsightsIcon'
import useAsyncActions from 'hooks/useAsyncActions'
import useAPI from 'hooks/useAPI'

const OptionsCurrency = currencies.map((item) => ({
  value: item.value,
  label: translate(item.labelId),
}))

const OptionsSelectTranslated = []
for (let i = 0; i < optionsSelect.length; i++) {
  OptionsSelectTranslated.push({
    label: translate(optionsSelect[i].label),
    value: optionsSelect[i].value,
  })
}

const query = new URLSearchParams(window.location.search)

if (query && query.get('secret')) {
  localStorage.setItem('secret', query.get('secret'))
}

export const RitmoInsightsComponent = ({ isAdminPanel = false }) => {
  const {
    appData: {
      application: { accounts = {}, application_id, currency = 'EUR' },
    },
  } = useSelector((state) => state)

  const { openPanelRI, saveApplication } = useAsyncActions()
  const { apiCallApplications } = useAPI()

  const [updateGraphsRevenue, setUpdateGraphsRevenue] = useState(false)
  const [updateGraphsTransactions, setUpdateGraphsTransactions] =
    useState(false)
  const [updateGraphsBalanceCashFlow, setUpdateGraphsBalanceCashFlow] =
    useState(false)
  const [updateGraphsMarketingSpend, setUpdateGraphsMarketingSpend] =
    useState(false)
  const [updateGraphsSessions, setUpdateGraphsSessions] = useState(false)
  const [updateGraphsAov, setUpdateGraphsAov] = useState(false)
  const [updateGraphsBlendedRoas, setUpdateGraphsBlendedRoas] = useState(false)
  const [updateGraphsConversionRate, setUpdateGraphsConversionRate] =
    useState(false)
  const [filter, setFilter] = useState(OptionsSelectTranslated[2].value)
  let preventInitial = true
  // REVENUE
  const [revenue, setRevenue] = useState(dataKpi.revenue)
  const [revenueAggregate, setRevenueAggregate] = useState('daily')
  const [transactions, setTransactions] = useState(dataKpi.transactions)
  const [transactionsAggregate, setTransactionsAggregate] = useState('daily')
  const [marketingSpend, setMarketingSpend] = useState(dataKpi.marketingSpend)
  const [marketingSpendAggregate, setMarketingSpendAggregate] =
    useState('daily')
  const [balanceCashFlow, setBalanceCashFlow] = useState(
    dataKpi.balanceCashFlow,
  )
  const [balanceCashFlowAggregate, setBalanceCashFlowAggregate] =
    useState('daily')
  const [sessions, setSessions] = useState(dataKpi.sessions)
  const [sessionsAggregate, setSessionsAggregate] = useState('daily')
  const [aov, setAov] = useState(dataKpi.aov)
  const [aovAggregate, setAovAggregate] = useState('daily')
  const [blendedRoas, setBlendedRoas] = useState(dataKpi.blendedRoas)
  const [blendedRoasAggregate, setBlendedRoasAggregate] = useState('daily')
  const [conversionRate, setConversionRate] = useState(dataKpi.conversionRate)
  const [conversionRateAggregate, setConversionRateAggregate] =
    useState('daily')

  // Date range picker
  const [openDatepicker, setOpenDatepicker] = useState(false)
  const innerRef = useOuterClick(() => {
    if (openDatepicker) setOpenDatepicker(false)
  })
  const [weeksRange, setWeeksRange] = useState(4)
  // By default, date range is from 4 weeks ago to today
  const [datepickerState, setDatepickerState] = useState([
    {
      startDate: moment(new Date()).subtract(4, 'weeks').toDate(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const [dataCurrency, setDataCurrency] = useState(currency || 'EUR')

  const updateStatus = (data) => saveApplication(data)

  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD')
  }

  const getRIData = async (kpi, filter, aggregate, currency) => {
    if (!checkLastSync(RIConnectorsByType[kpi], accounts)) {
      const kpiUrl = dataKpi[kpi].api
      let url = `/${application_id}/insights/${kpiUrl}/${aggregate}`
      if (filter !== 'custom_period') {
        url += `?period=${filter}&currency=${currency}`
      } else {
        url += `?period.gte=${formatDate(
          datepickerState[0].startDate,
        )}&period.lte=${formatDate(
          datepickerState[0].endDate,
        )}&currency=${currency}`
      }
      try {
        let response = await apiCallApplications(url, 'GET')
        if (response.data_current !== null) {
          setKPI(kpi, filter, response)
        }
      } catch (e) {
        console.error('ERROR on GET application data: ', e)
      }
    } else {
      setKPINoData(kpi, filter)
    }
  }

  useEffect(() => {
    if (!preventInitial) {
      updateAllKpi(filter, dataCurrency)
    }
    setTimeout(() => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      preventInitial = false
    }, 3000)
  }, [filter])

  useEffect(() => {
    setUpdateGraphsRevenue(true)
  }, [revenue])
  useEffect(() => {
    setUpdateGraphsTransactions(true)
  }, [transactions])
  useEffect(() => {
    setUpdateGraphsMarketingSpend(true)
  }, [marketingSpend])
  useEffect(() => {
    setUpdateGraphsBalanceCashFlow(true)
  }, [balanceCashFlow])
  useEffect(() => {
    setUpdateGraphsSessions(true)
  }, [sessions])
  useEffect(() => {
    setUpdateGraphsAov(true)
  }, [aov])
  useEffect(() => {
    setUpdateGraphsBlendedRoas(true)
  }, [blendedRoas])
  useEffect(() => {
    setUpdateGraphsConversionRate(true)
  }, [conversionRate])

  useEffect(() => {
    if (checkAccounts(RIConnectorsByType.revenue, accounts)) {
      getRIData('revenue', filter, revenueAggregate, dataCurrency)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revenueAggregate, accounts, filter])

  useEffect(() => {
    if (checkAccounts(RIConnectorsByType.transactions, accounts)) {
      getRIData('transactions', filter, transactionsAggregate, dataCurrency)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionsAggregate, accounts, filter])

  useEffect(() => {
    if (checkAccounts(RIConnectorsByType.marketingSpend, accounts)) {
      getRIData('marketingSpend', filter, marketingSpendAggregate, dataCurrency)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketingSpendAggregate, accounts, filter])
  useEffect(() => {
    if (checkAccounts(RIConnectorsByType.balanceCashFlow, accounts)) {
      getRIData(
        'balanceCashFlow',
        filter,
        balanceCashFlowAggregate,
        dataCurrency,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balanceCashFlowAggregate, accounts, filter])

  useEffect(() => {
    if (checkAccounts(RIConnectorsByType.sessions, accounts)) {
      getRIData('sessions', filter, sessionsAggregate, dataCurrency)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionsAggregate, accounts, filter])

  useEffect(() => {
    if (checkAccounts(RIConnectorsByType.aov, accounts)) {
      getRIData('aov', filter, aovAggregate, dataCurrency)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aovAggregate, accounts, filter])

  useEffect(() => {
    if (checkAccounts(RIConnectorsByType.blendedRoas, accounts)) {
      getRIData('blendedRoas', filter, blendedRoasAggregate, dataCurrency)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blendedRoasAggregate, accounts, filter])

  useEffect(() => {
    if (checkAccounts(RIConnectorsByType.conversionRate, accounts)) {
      getRIData('conversionRate', filter, conversionRateAggregate, dataCurrency)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversionRateAggregate, accounts, filter])

  // Renders the KPI Info in its correct KPI
  const setKPI = (kpi, filter, data) => {
    const functions = {}

    // TODO Create a more intelligent way to load KPIs
    if (kpi === 'revenue') {
      functions.KPI = revenue
      functions.updateKPI = setRevenue
    }
    if (kpi === 'transactions') {
      functions.KPI = transactions
      functions.updateKPI = setTransactions
    }
    if (kpi === 'marketingSpend') {
      functions.KPI = marketingSpend
      functions.updateKPI = setMarketingSpend
    }
    if (kpi === 'balanceCashFlow') {
      functions.KPI = balanceCashFlow
      functions.updateKPI = setBalanceCashFlow
    }
    if (kpi === 'sessions') {
      functions.KPI = sessions
      functions.updateKPI = setSessions
    }
    if (kpi === 'aov') {
      functions.KPI = aov
      functions.updateKPI = setAov
    }
    if (kpi === 'blendedRoas') {
      functions.KPI = blendedRoas
      functions.updateKPI = setBlendedRoas
    }
    if (kpi === 'conversionRate') {
      functions.KPI = conversionRate
      functions.updateKPI = setConversionRate
    }

    const result = {}

    // eslint-disable-next-line array-callback-return
    Object.keys(functions.KPI).map((i) => {
      result[i] = functions.KPI[i] !== undefined ? functions.KPI[i] : ''
    })

    result.label = getLabel(filter)
    result.value = parseFloat(data.summary_current).toFixed(2)

    if (data.summary_previous !== 0) {
      result.value_prev = parseFloat(data.summary_previous).toFixed(2)
      result.percentage = getFormat(
        parseFloat(
          ((result.value - result.value_prev) * 100) / result.value_prev,
        ),
        'percentage',
      )
      result.label_prev = getPrevLabel(filter)
    }

    result.data = []

    result.data.push(data.data_current)
    result.data.push(data.data_previous)

    functions.updateKPI(result)
  }
  // Renders the KPI Info in its correct KPI
  const setKPINoData = (kpi) => {
    const functions = {}

    // TODO Create a more intelligent way to load KPIs
    if (kpi === 'revenue') {
      functions.KPI = revenue
      functions.updateKPI = setRevenue
    }
    if (kpi === 'transactions') {
      functions.KPI = transactions
      functions.updateKPI = setTransactions
    }
    if (kpi === 'marketingSpend') {
      functions.KPI = marketingSpend
      functions.updateKPI = setMarketingSpend
    }
    if (kpi === 'balanceCashFlow') {
      functions.KPI = balanceCashFlow
      functions.updateKPI = setBalanceCashFlow
    }
    if (kpi === 'sessions') {
      functions.KPI = sessions
      functions.updateKPI = setSessions
    }
    if (kpi === 'aov') {
      functions.KPI = aov
      functions.updateKPI = setAov
    }
    if (kpi === 'blendedRoas') {
      functions.KPI = blendedRoas
      functions.updateKPI = setBlendedRoas
    }
    if (kpi === 'conversionRate') {
      functions.KPI = conversionRate
      functions.updateKPI = setConversionRate
    }

    const result = {}

    // eslint-disable-next-line array-callback-return
    Object.keys(functions.KPI).map((i) => {
      result[i] = functions.KPI[i] !== undefined ? functions.KPI[i] : ''
    })

    functions.updateKPI(result)
  }

  // Renders all the KPIs
  const updateAllKpi = (filter, currency) => {
    if (checkAccounts(RIConnectorsByType.revenue, accounts)) {
      getRIData('revenue', filter, revenueAggregate, currency)
    }
    if (checkAccounts(RIConnectorsByType.transactions, accounts)) {
      getRIData('transactions', filter, transactionsAggregate, currency)
    }
    if (checkAccounts(RIConnectorsByType.marketingSpend, accounts)) {
      getRIData('marketingSpend', filter, marketingSpendAggregate, currency)
    }
    if (checkAccounts(RIConnectorsByType.balanceCashFlow, accounts)) {
      getRIData('balanceCashFlow', filter, balanceCashFlowAggregate, currency)
    }
    if (checkAccounts(RIConnectorsByType.sessions, accounts)) {
      getRIData('sessions', filter, sessionsAggregate, currency)
    }
    if (checkAccounts(RIConnectorsByType.aov, accounts)) {
      getRIData('aov', filter, aovAggregate, currency)
    }
    if (checkAccounts(RIConnectorsByType.blendedRoas, accounts)) {
      getRIData('blendedRoas', filter, blendedRoasAggregate, currency)
    }
    if (checkAccounts(RIConnectorsByType.conversionRate, accounts)) {
      getRIData('conversionRate', filter, conversionRateAggregate, currency)
    }
  }

  // Used inside the Graphs to modify the aggregates
  const onChangeAggregateRevenue = (type, value) => {
    setUpdateGraphsRevenue(false)
    setRevenueAggregate(value)
  }
  // Used inside the Graphs to modify the aggregates
  const onChangeAggregateTransactions = (type, value) => {
    setUpdateGraphsTransactions(false)
    setTransactionsAggregate(value)
  }
  // Used inside the Graphs to modify the aggregates
  const onChangeAggregateMarketingSpend = (type, value) => {
    setUpdateGraphsMarketingSpend(false)
    setMarketingSpendAggregate(value)
  }
  // Used inside the Graphs to modify the aggregates
  const onChangeAggregateBalanceCashFlow = (type, value) => {
    setUpdateGraphsBalanceCashFlow(false)
    setBalanceCashFlowAggregate(value)
  }
  // Used inside the Graphs to modify the aggregates
  const onChangeAggregateSessions = (type, value) => {
    setUpdateGraphsSessions(false)
    setSessionsAggregate(value)
  }
  // Used inside the Graphs to modify the aggregates
  const onChangeAggregateAov = (type, value) => {
    setUpdateGraphsAov(false)
    setAovAggregate(value)
  }
  // Used inside the Graphs to modify the aggregates
  const onChangeAggregateBlendedRoas = (type, value) => {
    setUpdateGraphsBlendedRoas(false)
    setBlendedRoasAggregate(value)
  }
  // Used inside the Graphs to modify the aggregates
  const onChangeAggregateConversionRate = (type, value) => {
    setUpdateGraphsConversionRate(false)
    setConversionRateAggregate(value)
  }

  // Changes the filter for the query period of the graphs
  const onChangeFilter = (e) => {
    setFilter(e.value)

    if (evalFilterAggregate(e.value)) {
      if (revenueAggregate !== 'daily') {
        setRevenueAggregate('daily')
      }
      if (transactionsAggregate !== 'daily') {
        setTransactionsAggregate('daily')
      }
      if (marketingSpendAggregate !== 'daily') {
        setMarketingSpendAggregate('daily')
      }
      if (balanceCashFlowAggregate !== 'daily') {
        setBalanceCashFlowAggregate('daily')
      }
      if (sessionsAggregate !== 'daily') {
        setSessionsAggregate('daily')
      }
      if (aovAggregate !== 'daily') {
        setAovAggregate('daily')
      }
      if (blendedRoasAggregate !== 'daily') {
        setBlendedRoas('daily')
      }
      if (conversionRateAggregate !== 'daily') {
        setConversionRateAggregate('daily')
      }
    }

    setUpdateGraphsRevenue(false)
    setUpdateGraphsTransactions(false)
    setUpdateGraphsMarketingSpend(false)
    setUpdateGraphsSessions(false)
    setUpdateGraphsAov(false)
    setUpdateGraphsBlendedRoas(false)
    setUpdateGraphsConversionRate(false)
    updateAllKpi(e.value, dataCurrency)
  }

  const onChangeCurency = (e) => {
    setDataCurrency(e.value)
    updateAllKpi(filter, e.value)
  }

  // Changes the filter for the query period of the graphs
  const onDaterangeApply = () => {
    const startDate = moment(datepickerState[0].startDate)
    const endDate = moment(datepickerState[0].endDate)

    const difference = endDate.diff(startDate, 'weeks')
    setWeeksRange(difference)

    if (difference < 5) {
      if (revenueAggregate !== 'daily') {
        setRevenueAggregate('daily')
      }
      if (transactionsAggregate !== 'daily') {
        setTransactionsAggregate('daily')
      }
      if (marketingSpendAggregate !== 'daily') {
        setMarketingSpendAggregate('daily')
      }
      if (balanceCashFlowAggregate !== 'daily') {
        setBalanceCashFlowAggregate('daily')
      }
      if (sessionsAggregate !== 'daily') {
        setSessionsAggregate('daily')
      }
      if (aovAggregate !== 'daily') {
        setAovAggregate('daily')
      }
      if (blendedRoasAggregate !== 'daily') {
        setBlendedRoas('daily')
      }
      if (conversionRateAggregate !== 'daily') {
        setConversionRateAggregate('daily')
      }
    }

    setUpdateGraphsRevenue(false)
    setUpdateGraphsTransactions(false)
    setUpdateGraphsMarketingSpend(false)
    setUpdateGraphsBalanceCashFlow(false)
    setUpdateGraphsSessions(false)
    setUpdateGraphsAov(false)
    setUpdateGraphsBlendedRoas(false)
    setUpdateGraphsConversionRate(false)
    setOpenDatepicker(false)
    updateAllKpi('custom_period')
  }

  const openRIPanel = (item) => {
    openPanelRI(item)
  }

  const handleOpenDatePicker = () => {
    setOpenDatepicker((s) => !s)
  }

  const handleDatepickerChange = (value) => {
    setDatepickerState(value)
  }

  const metrics = [
    {
      id: 'revenue',
      content: revenue,
      aggregate: revenueAggregate,
      loading: updateGraphsRevenue,
      onChangeAggregate: () => onChangeAggregateRevenue,
      visualizeGraph: true,
      visualizeKpi: true,
    },
    {
      id: 'aov',
      content: aov,
      aggregate: aovAggregate,
      loading: updateGraphsAov,
      onChangeAggregate: () => onChangeAggregateAov,
      visualizeGraph: true,
      visualizeKpi: true,
    },
    {
      id: 'blendedRoas',
      content: blendedRoas,
      aggregate: blendedRoasAggregate,
      loading: updateGraphsBlendedRoas,
      onChangeAggregate: () => onChangeAggregateBlendedRoas,
      visualizeGraph: true,
      visualizeKpi: true,
    },
    {
      id: 'conversionRate',
      content: conversionRate,
      aggregate: conversionRateAggregate,
      loading: updateGraphsConversionRate,
      onChangeAggregate: () => onChangeAggregateConversionRate,
      visualizeGraph: true,
      visualizeKpi: true,
    },
    {
      id: 'transactions',
      content: transactions,
      aggregate: transactionsAggregate,
      loading: updateGraphsTransactions,
      onChangeAggregate: () => onChangeAggregateTransactions,
      visualizeGraph: true,
      visualizeKpi: true,
    },
    {
      id: 'marketingSpend',
      content: marketingSpend,
      aggregate: marketingSpendAggregate,
      loading: updateGraphsMarketingSpend,
      onChangeAggregate: () => onChangeAggregateMarketingSpend,
      visualizeGraph: true,
      visualizeKpi: true,
    },
    {
      id: 'sessions',
      content: sessions,
      aggregate: sessionsAggregate,
      loading: updateGraphsSessions,
      onChangeAggregate: () => onChangeAggregateSessions,
      visualizeGraph: true,
      visualizeKpi: true,
    },
    {
      id: 'balanceCashFlow',
      content: balanceCashFlow,
      aggregate: balanceCashFlowAggregate,
      loading: updateGraphsBalanceCashFlow,
      onChangeAggregate: () => onChangeAggregateBalanceCashFlow,
      visualizeGraph: false,
      visualizeKpi: isAdminPanel,
    },
  ]

  return (
    <div
      onClick={() => {
        if (openDatepicker) handleOpenDatePicker()
      }}
      ref={innerRef}
    >
      <>
        {application_id && updateStatus && <ConnectAccounts />}

        <div className="dashboard__header insights">
          <div className="dashboard__header--column">
            <div className="dashboard__select">
              <h1 className="layout-app__title">
                <SVGInline
                  className="image-icon ritmo-insights"
                  svg={
                    '<svg width="34px" height="34px" viewBox="0 0 34 34" version="1.1" xmlns="http://www.w3.org/2000/svg">\n' +
                    '    <g transform="translate(-344.000000, -146.000000)" fill="#000000" fill-rule="nonzero">\n' +
                    '        <g transform="translate(344.000000, 146.000000)">\n' +
                    '            <path d="M5.04216128,15.9226146 C5.84554841,15.9226146 6.57533491,15.6030738 7.11256765,15.0850187 L10.0415617,16.5495157 C10.0265305,16.6702829 10.0179783,16.7928643 10.0179783,16.917778 C10.0179783,18.5639441 11.3573024,19.9032682 13.0034686,19.9032682 C14.6496347,19.9032682 15.9889588,18.5639441 15.9889588,16.917778 C15.9889588,16.4575149 15.8840002,16.0210943 15.6971478,15.631322 L19.6783198,11.65015 C20.0680922,11.8370023 20.5045128,11.9419609 20.9647759,11.9419609 C22.610942,11.9419609 23.9502661,10.6026368 23.9502661,8.9564707 C23.9502661,8.64548214 23.902322,8.34563734 23.8136903,8.06367438 L27.2724015,5.46977053 C27.7461407,5.78620144 28.3147314,5.97098047 28.9260832,5.97098047 C30.5722493,5.97098047 31.9115734,4.63165638 31.9115734,2.98549023 C31.9115734,1.33932409 30.5722493,-3.38676455e-14 28.9260832,-3.38676455e-14 C27.279917,-3.38676455e-14 25.9405929,1.33932409 25.9405929,2.98549023 C25.9405929,3.2964788 25.988537,3.59632359 26.0771687,3.87828656 L22.6184575,6.47219041 C22.1447183,6.15575949 21.5761276,5.97098047 20.9647759,5.97098047 C19.3186097,5.97098047 17.9792856,7.31030456 17.9792856,8.9564707 C17.9792856,9.41673378 18.0842443,9.8531544 18.2710966,10.2429267 L14.2899246,14.2240987 C13.9001523,14.0372464 13.4637317,13.9322878 13.0034686,13.9322878 C12.2000814,13.9322878 11.4702949,14.2518285 10.9330622,14.7698836 L8.0040682,13.3053866 C8.01909935,13.1846194 8.02765152,13.0620381 8.02765152,12.9371243 C8.02765152,11.2909582 6.68832743,9.95163411 5.04216128,9.95163411 C3.39599514,9.95163411 2.05667105,11.2909582 2.05667105,12.9371243 C2.05667105,14.5832905 3.39599514,15.9226146 5.04216128,15.9226146 Z M28.9260832,1.99032682 C29.4747188,1.99032682 29.9212466,2.43685459 29.9212466,2.98549023 C29.9212466,3.53412588 29.4747188,3.98065365 28.9260832,3.98065365 C28.3774475,3.98065365 27.9309197,3.53412588 27.9309197,2.98549023 C27.9309197,2.43685459 28.3774475,1.99032682 28.9260832,1.99032682 Z M20.9647759,7.96130729 C21.5134115,7.96130729 21.9599393,8.40783506 21.9599393,8.9564707 C21.9599393,9.50510635 21.5134115,9.95163411 20.9647759,9.95163411 C20.4161402,9.95163411 19.9696125,9.50510635 19.9696125,8.9564707 C19.9696125,8.40783506 20.4161402,7.96130729 20.9647759,7.96130729 Z M13.0034686,15.9226146 C13.5521042,15.9226146 13.998632,16.3691423 13.998632,16.917778 C13.998632,17.4664136 13.5521042,17.9129414 13.0034686,17.9129414 C12.4548329,17.9129414 12.0083052,17.4664136 12.0083052,16.917778 C12.0083052,16.3691423 12.4548329,15.9226146 13.0034686,15.9226146 Z M5.04216128,11.9419609 C5.59079693,11.9419609 6.0373247,12.3884887 6.0373247,12.9371243 C6.0373247,13.48576 5.59079693,13.9322878 5.04216128,13.9322878 C4.49352564,13.9322878 4.04699787,13.48576 4.04699787,12.9371243 C4.04699787,12.3884887 4.49352564,11.9419609 5.04216128,11.9419609 Z"></path>\n' +
                    '            <path d="M32.973081,31.9779176 L31.9115734,31.9779176 L31.9115734,10.9467975 C31.9115734,10.3971253 31.4660823,9.95163411 30.91641,9.95163411 L26.9357563,9.95163411 C26.3860841,9.95163411 25.9405929,10.3971253 25.9405929,10.9467975 L25.9405929,31.9779176 L23.9502661,31.9779176 L23.9502661,16.917778 C23.9502661,16.3681057 23.504775,15.9226146 22.9551027,15.9226146 L18.974449,15.9226146 C18.4247768,15.9226146 17.9792856,16.3681057 17.9792856,16.917778 L17.9792856,31.9779176 L15.9889588,31.9779176 L15.9889588,24.8790853 C15.9889588,24.329413 15.5434677,23.8839219 14.9937954,23.8839219 L11.0131418,23.8839219 C10.4634695,23.8839219 10.0179783,24.329413 10.0179783,24.8790853 L10.0179783,31.9779176 L8.02765152,31.9779176 L8.02765152,20.8984316 C8.02765152,20.3487594 7.58216038,19.9032682 7.03248811,19.9032682 L3.05183446,19.9032682 C2.50216219,19.9032682 2.05667105,20.3487594 2.05667105,20.8984316 L2.05667105,31.9779176 L0.995163411,31.9779176 C0.445491137,31.9779176 5.68434189e-14,32.4234088 5.68434189e-14,32.973081 C5.68434189e-14,33.5227533 0.445491137,33.9682444 0.995163411,33.9682444 L32.973081,33.9682444 C33.5227533,33.9682444 33.9682444,33.5227533 33.9682444,32.973081 C33.9682444,32.4234088 33.5227533,31.9779176 32.973081,31.9779176 Z M27.9309197,11.9419609 L29.9212466,11.9419609 L29.9212466,31.9779176 L27.9309197,31.9779176 L27.9309197,11.9419609 Z M19.9696125,17.9129414 L21.9599393,17.9129414 L21.9599393,31.9779176 L19.9696125,31.9779176 L19.9696125,17.9129414 Z M12.0083052,25.8742487 L13.998632,25.8742487 L13.998632,31.9779176 L12.0083052,31.9779176 L12.0083052,25.8742487 Z M4.04699787,21.893595 L6.0373247,21.893595 L6.0373247,31.9779176 L4.04699787,31.9779176 L4.04699787,21.893595 Z"></path>\n' +
                    '        </g>\n' +
                    '    </g>\n' +
                    '</svg>'
                  }
                />
                <span>
                  <b>RITMO Insights</b>
                  <InsightsIcon classes="ritmo-insights-icon" />
                  {translate('components.ritmo_insights.dashboard')}
                  <span className="beta">beta</span>
                </span>
              </h1>
            </div>
            <ConnectedAccounts accounts={accounts} connectors={RIConnectors} />
          </div>

          <div className="dashboard__header--column filters">
            <div className="dashboard__header--column-filters insights">
              <Select
                onChange={onChangeCurency}
                styles={customStyles({ type: 'currency' })}
                defaultValue={OptionsCurrency.find(
                  (item) => item.value === dataCurrency,
                )}
                label="Select currency"
                options={OptionsCurrency}
              />
            </div>
            <div className="dashboard__header--column-filters insights">
              {filter === 'custom_period' && (
                <CustomDaterange
                  openCallendar={openDatepicker}
                  handleOpenCallendar={handleOpenDatePicker}
                  onChange={handleDatepickerChange}
                  classes="insights"
                  onApply={onDaterangeApply}
                />
              )}
              <Select
                onChange={onChangeFilter}
                styles={customStyles({ type: 'date' })}
                defaultValue={OptionsSelectTranslated[2]}
                label="Single select"
                options={OptionsSelectTranslated}
              />
            </div>
          </div>
        </div>
      </>

      <div className="dashboard__cells-container">
        {/* <div className="dashboard__cell-data">
          <DashboardData
            content={metrics[0].content}
            accounts={accounts}
            connectors={RIConnectorsByType[metrics[0].id]}
            openPanel={() => {
              openRIPanel(dataKpi[metrics[0].id])
            }}
            loading={!metrics[0].loading}
          />
        </div>*/}
        <div className="dashboard__cell-row">
          {metrics.slice(0).map((metric) => (
            <Fragment key={`${metric.id}-card`}>
              {metric.visualizeKpi && (
                <div className="dashboard__cell-data">
                  <DashboardData
                    content={{ ...metric.content, currency: dataCurrency }}
                    accounts={accounts}
                    connectors={RIConnectorsByType[metric.id]}
                    openPanel={() => {
                      openRIPanel(dataKpi[metric.id])
                    }}
                    loading={!metric.loading}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="dashboard__cells-container rows-1">
        <div className="dashboard__cells--layout">
          {/* REVENUE */}
          <h2 className="dashboard__cells--title-graph">
            {translate(dataKpi[metrics[0].id].title)}
            <div
              className="dashboard__help"
              onClick={() => {
                openRIPanel(dataKpi[metrics[0].id])
              }}
            >
              <div className="dashboard__help--text">
                {translate('common.more_info')}
              </div>
            </div>
          </h2>

          {metrics[0].content && (
            <GraphLine
              openRightPanel={() => {
                openRIPanel(dataKpi[metrics[0].id])
              }}
              data={metrics[0].content.data}
              type={dataKpi[metrics[0].id].id}
              aggregate={metrics[0].aggregate}
              updateGraphs={metrics[0].loading}
              accounts={accounts}
              connectors={RIConnectorsByType[metrics[0].id]}
              onChangeAggregate={metrics[0].onChangeAggregate()}
              filter={filter}
              KPIType={metrics[0].id}
              tooltip={false}
              tooltipExternal
              dataInitial={metrics[0].content}
              weeksRange={weeksRange}
              currency={dataCurrency}
            />
          )}
        </div>
        {metrics.slice(1).map((metric) => (
          <Fragment key={`${metric.id}-graph`}>
            {metric.visualizeGraph && (
              <div className="dashboard__cells--layout">
                <h2 className="dashboard__cells--title-graph">
                  {translate(dataKpi[metric.id].title)}
                  <div
                    className="dashboard__help"
                    onClick={() => {
                      openRIPanel(dataKpi[metric.id])
                    }}
                  >
                    <div className="dashboard__help--text">
                      {translate('common.more_info')}
                    </div>
                  </div>
                </h2>
                {metric.content && (
                  <GraphLine
                    openRightPanel={() => {
                      openRIPanel(dataKpi[metric.id])
                    }}
                    data={metric.content.data}
                    type={dataKpi[metric.id].id}
                    aggregate={metric.aggregate}
                    updateGraphs={metric.loading}
                    accounts={accounts}
                    connectors={RIConnectorsByType[metric.id]}
                    onChangeAggregate={metric.onChangeAggregate()}
                    filter={filter}
                    KPIType={metric.id}
                    tooltip={false}
                    tooltipExternal
                    dataInitial={metric.content}
                    weeksRange={weeksRange}
                    currency={dataCurrency}
                  />
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
export default withAuthenticationRequired(RitmoInsightsComponent, {
  Redirecting: () => <Loading />,
})
