import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { Loading } from '../../Loading'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import SVGInline from 'react-svg-inline/src'
import { formatDate, getFormat } from '../../../data/data'
import translate from '../../../i18n/translate'
import { useLocation } from 'react-router-dom'
import Moment from 'react-moment'
import 'moment/locale/es'
import 'moment/locale/en-gb'
import { useIntl } from 'react-intl'
import Breadcrumb from '../../Breadcrumb'
import TableLoader from '../../admin/TableLoader'
import AlreadyPaid from './AlreadyPaid'
import ProcessingPayment from './ProcessingPayment'
import PaymentLeft from './PaymentLeft'
import MyAdvancesInfo from './MyAdvancesInfo'
import useAPI from '../../../hooks/useAPI'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const query = new URLSearchParams(window.location.search)

if (query && query.get('secret')) {
  localStorage.setItem('secret', query.get('secret'))
}

export const MyAdvancesComponent = () => {
  const {
    appData: {
      application: { application_id, offers },
    },
  } = useSelector((state) => state)

  const { apiCallApplications } = useAPI()

  const [data, setData] = useState([])
  const [offer, setOffer] = useState({})
  const [amountDue, setAmountDue] = useState(false)
  const [outstandingBalance, setOutstandingBalance] = useState(false)
  const [alreadyPayed, setAlreadyPayed] = useState(false)
  const [percentageToBePayed, setPercentageToBePayed] = useState(false)
  const [percentageAlreadyPayed, setPercentageAlreadyPayed] = useState(false)
  const [percentageAmountDue, setPercentageAmountDue] = useState(false)
  const [deployment, setDeployment] = useState({})
  const [scenario, setScenario] = useState(false)

  const { apiFileDownload } = useAPI()
  const location = useLocation()
  // Global status

  const { formatMessage } = useIntl()
  const { deploymentId, offerId } = useParams()

  const processUrl = (response) => {
    if (response) {
      let filtered = response.filter(
        (resp) => resp.payment.status !== 'tos_review',
      )
      setData(filtered)
    }
    return
  }

  const getPaymentsByApplicationId = useCallback(async () => {
    let newPayments = await apiCallApplications(
      `/${application_id}/offers/${offerId}/deployments/${deploymentId}/payments`,
      'GET',
    )
    processUrl(newPayments)
  }, [application_id, deploymentId, offerId, apiCallApplications])

  const download = useCallback(
    async (item) => {
      const url = `/admin/uploads/${item.id}`
      await apiFileDownload(url, 'GET', item.name)
    },
    [apiFileDownload],
  )

  const processValue = useCallback(
    (value) => {
      switch (value) {
        case 'succeeded':
          return formatMessage({ id: 'common.success' })
        default:
          return value
      }
    },
    [formatMessage],
  )

  let columns = React.useMemo(
    () => [
      {
        Header: 'Nº',
        accessor: 'invoice.name',
        sortType: 'basic',
      },
      {
        Header: formatMessage({ id: 'common.Status' }),
        accessor: 'payment.status',
        sortType: 'basic',

        Cell: (props) => (
          <div className={'table__status ' + props.value}>
            {processValue(props.value)}
          </div>
        ),
      },
      {
        Header: formatMessage({ id: 'views.my_advances.revenue' }),
        accessor: 'invoice.revenue_cents',
        sortType: 'basic',
        Cell: (props) => (
          <div className="table__field--period">
            {getFormat(props.value / 100, 'euro')}
          </div>
        ),
      },

      {
        Header: formatMessage({ id: 'views.my_advances.amount_due' }),
        accessor: 'payment.amount_cents',
        sortType: 'basic',

        Cell: (props) => (
          <div className={'table__status ' + props.value}>
            {getFormat(props.value / 100, 'euro')}
          </div>
        ),
      },

      {
        Header: formatMessage({ id: 'views.my_advances.due_date' }),
        accessor: 'payment.date',
        sortType: 'basic',

        Cell: (props) => (
          <div className={'table__status '}>
            {formatDate(props.row.original.payment.date, 'invoice')}
          </div>
        ),
      },
      {
        Header: formatMessage({ id: 'common.Invoice' }),
        accessor: 'upload',
        sortType: 'basic',
        Cell: (props) => (
          <button
            className={'layout-app__file'}
            onClick={() => {
              download({
                id: props.row.values.upload.id,
                name: props.row.values.upload.name,
              })
            }}
          >
            <div className={'layout-app__file--item invoice-file'} />
            <div className={'layout-app__file--name'}>
              <span>{props.row.values.upload.name}</span>
            </div>
          </button>
        ),
      },
    ],
    [download, formatMessage, processValue],
  )

  const getPaymentAmountLength = (values, status) => {
    let countData = values.filter(
      (value) => value.payment.status === status,
    ).length
    return countData
  }

  const getOffer = useCallback(() => {
    if (offers) {
      for (let i = 0; i < offers.length; i++) {
        const offerItem = offers[i]
        if (offerItem.id === offerId) {
          setOffer(offerItem)

          for (let j = 0; j < offerItem.deployments.length; j++) {
            const deploymentItem = offerItem.deployments[j]
            if (deploymentItem.id === deploymentId) {
              setDeployment(deploymentItem)
              for (let k = 0; k < deploymentItem.scenarios.length; k++) {
                const scenarioItem = deploymentItem.scenarios[k]
                if (scenarioItem.selected) {
                  setScenario(scenarioItem)

                  const ToBeReturned =
                    (scenarioItem.raw_amount + scenarioItem.commission) / 100

                  const AmountDue = scenarioItem.amount_due / 100

                  setAmountDue(AmountDue)

                  const OutstandingBalance =
                    scenarioItem.outstanding_balance / 100

                  setOutstandingBalance(OutstandingBalance)

                  setAlreadyPayed(
                    (scenarioItem.raw_amount +
                      scenarioItem.commission -
                      (scenarioItem.amount_due +
                        scenarioItem.outstanding_balance)) /
                      100,
                  )

                  setPercentageToBePayed(
                    (OutstandingBalance * 100) / ToBeReturned,
                  )
                  setPercentageAlreadyPayed((alreadyPayed * 100) / ToBeReturned)
                  setPercentageAmountDue((AmountDue * 100) / ToBeReturned)

                  break
                }
              }
              break
            }
          }

          break
        }
      }
    }
  }, [offers, deploymentId, offerId, alreadyPayed])

  useEffect(() => {
    getOffer()
    if (offerId && deploymentId) getPaymentsByApplicationId()
  }, [offerId, deploymentId, location, getOffer, getPaymentsByApplicationId])

  return (
    <Fragment>
      {offer.type && (
        <Breadcrumb
          previous={translate('views.my_advances.breadcrumb.previous')}
          actual={
            formatMessage({ id: 'views.my_advances.text1_' + offer.type }) +
            ' - ' +
            deployment.deploy_date
          }
        />
      )}

      <Fragment>
        {offerId && scenario ? (
          <Fragment>
            <h1 className="layout-app__title">
              <SVGInline
                className="image-icon"
                svg={
                  '<svg width="70px" height="70px" viewBox="0 0 99 88" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
                  '\n' +
                  '    <defs>\n' +
                  '        <linearGradient x1="100%" y1="67.743243%" x2="19.8809893%" y2="15.0344018%" id="linearGradient-1">\n' +
                  '            <stop stop-color="#000000" offset="0%"></stop>\n' +
                  '            <stop stop-color="#000000" offset="100%"></stop>\n' +
                  '        </linearGradient>\n' +
                  '        <linearGradient x1="100%" y1="67.7433179%" x2="19.8809893%" y2="15.0342543%" id="linearGradient-2">\n' +
                  '            <stop stop-color="#000000" offset="0%"></stop>\n' +
                  '            <stop stop-color="#000000" offset="100%"></stop>\n' +
                  '        </linearGradient>\n' +
                  '        <linearGradient x1="62.5522599%" y1="100%" x2="38.8117286%" y2="-5.3109976%" id="linearGradient-3">\n' +
                  '            <stop stop-color="#000000" offset="0%"></stop>\n' +
                  '            <stop stop-color="#000000" offset="100%"></stop>\n' +
                  '        </linearGradient>\n' +
                  '    </defs>\n' +
                  '    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
                  '        <g transform="translate(-395.000000, -2188.000000)" fill-rule="nonzero">\n' +
                  '            <g transform="translate(395.907563, 2188.780273)">\n' +
                  '                <g>\n' +
                  '                    <path d="M85.6507368,60.4262697 C84.2505329,59.6924934 82.5210263,60.2331908 81.7878224,61.6333947 C75.4555197,73.7220066 63.0517237,81.2316711 49.4173355,81.2316711 C29.3058355,81.2316711 12.9402961,64.8894079 12.9009934,44.786875 L15.1975263,47.0834079 C15.7563487,47.6422303 16.4887895,47.9217368 17.2210395,47.9217368 C17.9532895,47.9217368 18.6859211,47.6424211 19.2445526,47.0834079 C20.3621974,45.9657632 20.3621974,44.1538355 19.2445526,43.0361908 L12.0649539,35.8567829 C10.9475,34.7391382 9.13538158,34.7391382 8.01773684,35.8567829 L0.838138158,43.0361908 C-0.279506579,44.1536447 -0.279506579,45.9657632 0.838138158,47.0834079 C1.95559211,48.2010526 3.76771053,48.2008618 4.88535526,47.0834079 L7.17711842,44.7918355 C7.19715132,56.0457434 11.5883618,66.6233026 19.5482895,74.5832303 C27.5265329,82.5614737 38.1342368,86.9553553 49.4173355,86.9553553 C65.1879934,86.9553553 79.5342171,78.2702368 86.8578618,64.289375 C87.5914474,62.8891711 87.0509408,61.1596645 85.6507368,60.4262697 Z" id="Path" fill="url(#linearGradient-1)"></path>\n' +
                  '                    <path d="M96.8460724,39.9167829 C95.7286184,38.7991382 93.9165,38.7991382 92.7988553,39.9167829 L90.5069013,42.2085461 C90.4868684,30.9544474 86.0958487,20.3770789 78.1357303,12.4169605 C70.1576776,4.43871711 59.5499737,0.0448355263 48.266875,0.0448355263 C32.4962171,0.0448355263 18.1499934,8.72995395 10.8263487,22.7108158 C10.0927632,24.1108289 10.6332697,25.8405263 12.0334737,26.5739211 C13.4331053,27.3073158 15.1628026,26.7668092 15.8963882,25.3667961 C22.2286908,13.2781842 34.6324868,5.76851974 48.266875,5.76851974 C68.3779934,5.76851974 84.7435329,22.1107829 84.7832171,42.2129342 L82.486875,39.9165921 C81.3694211,38.7989474 79.5573026,38.7989474 78.4396579,39.9165921 C77.3220132,41.0342368 77.3220132,42.8461645 78.4396579,43.9638092 L85.6192566,51.1434079 C86.1780789,51.7022303 86.9105197,51.9817368 87.6427697,51.9817368 C88.3750197,51.9817368 89.1076513,51.7024211 89.6662829,51.1434079 L96.8458816,43.9638092 C97.9637171,42.8461645 97.9637171,41.0342368 96.8460724,39.9167829 L96.8460724,39.9167829 Z" id="Path" fill="url(#linearGradient-2)"></path>\n' +
                  '                </g>\n' +
                  '                <path d="M52.754625,40.2136513 C50.1656118,39.2984342 47.3024342,38.1931908 45.69675,36.9337895 C45.1919211,36.5380921 44.9738487,35.6318421 45.1533816,34.6788487 C45.2428618,34.2034013 45.6614539,32.6143158 47.2869803,32.1245592 C49.9555526,31.3209539 51.7859868,32.3868947 52.4489803,32.8825658 C53.7150592,33.8286908 55.5080987,33.5697895 56.4546053,32.3039013 C57.4011118,31.0380132 57.1420197,29.2445921 55.8761316,28.2980855 C55.2755263,27.8489671 53.7707697,26.8644934 51.6137039,26.386375 L51.6137039,25.2214145 C51.6137039,23.6409145 50.3323618,22.3595724 48.7518618,22.3595724 C47.1713618,22.3595724 45.8900197,23.6409145 45.8900197,25.2214145 L45.8900197,26.5727763 C45.8053092,26.5964342 45.7213618,26.6181842 45.6360789,26.6439408 C42.5017895,27.5881579 40.1615658,30.2607368 39.5287171,33.6186316 C38.9462368,36.7094211 39.9560855,39.7053882 42.1642829,41.437375 C43.9836513,42.8642895 46.4992105,44.0731316 50.8471118,45.6101316 C53.7417697,46.6333355 53.679,48.9762303 53.5175921,49.9359013 C53.1905789,51.8817632 51.5536053,53.9846447 48.7327829,54.0035329 C45.9665263,54.0229934 45.1045395,53.8850526 42.9795263,52.4949605 C41.6569737,51.6295395 39.8832039,52.0002434 39.0177829,53.3229868 C38.1525526,54.6457303 38.5232566,56.4193092 39.846,57.2845395 C42.1379539,58.7839539 43.8291118,59.3921908 45.8900197,59.6140789 L45.8900197,60.9221316 C45.8900197,62.5026316 47.1713618,63.7839737 48.7518618,63.7839737 C50.3323618,63.7839737 51.6137039,62.5026316 51.6137039,60.9221316 L51.6137039,59.3391513 C53.1903882,58.9051053 54.6272237,58.1121842 55.8551447,56.9838553 C57.5953355,55.3850395 58.7696447,53.2190066 59.1620987,50.8846974 C59.9601711,46.139 57.3850855,41.8504342 52.754625,40.2136513 L52.754625,40.2136513 Z" id="Path" fill="url(#linearGradient-3)"></path>\n' +
                  '            </g>\n' +
                  '        </g>\n' +
                  '    </g>\n' +
                  '</svg>'
                }
              />
              {offer.type && (
                <span>{translate('views.my_advances.text1')}</span>
              )}
            </h1>
            <div className={'layout-app__subtitle'}>
              <b>{translate('views.my_advances.deployment_date')}</b>
              {': '}
              <Moment format="DD MMM YYYY">{deployment.deploy_date}</Moment>
            </div>

            <MyAdvancesInfo
              scenario={scenario}
              offer={offer}
              deployment={deployment}
            />

            <h2 className={'title-h2'}>
              {translate('views.my_advances.repayments')}
            </h2>

            {data.length === 0 ? (
              <div>{translate('views.my_advances.no_repayments')}</div>
            ) : (
              <Fragment>
                <div className={'table-graph'}>
                  <AlreadyPaid
                    paymentsAmount={getPaymentAmountLength(data, 'succeeded')}
                    alreadyPayed={alreadyPayed}
                    percentageAlreadyPayed={percentageAlreadyPayed}
                  />

                  <ProcessingPayment
                    amountDue={amountDue}
                    paymentsAmount={getPaymentAmountLength(data, 'processing')}
                    percentageAmountDue={percentageAmountDue}
                  />

                  <PaymentLeft
                    outstandingBalance={outstandingBalance}
                    percentageToBePayed={percentageToBePayed}
                  />
                </div>
                <div className={'table-graph label'}>
                  <div className={'table-graph__cell labels'}>
                    <div>{translate('views.my_advances.refunded.title')}</div>
                    <b>{getFormat(alreadyPayed, 'euro')}</b>
                  </div>
                  {amountDue > 0 && (
                    <div className={'table-graph__cell labels'}>
                      <div>
                        {translate('views.my_advances.processing.title')}
                      </div>
                      <b>{getFormat(amountDue, 'euro')}</b>
                    </div>
                  )}
                  <div className={'table-graph__cell labels'}>
                    <div>
                      {translate('views.my_advances.outstanding.title')}
                    </div>
                    <b>{getFormat(outstandingBalance, 'euro')}</b>
                  </div>
                </div>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <div>
            {offer.type && (
              <h2 className="layout-app__no-results">
                {translate('components.my_advances.no_scenario_selected')}
              </h2>
            )}
          </div>
        )}
      </Fragment>

      {data && data.length > 0 && (
        <TableLoader columns={columns} hideFilters={true} data={data} />
      )}
    </Fragment>
  )
}

export default withAuthenticationRequired(MyAdvancesComponent, {
  Redirecting: () => <Loading />,
})
