import React, { useEffect, useState, useCallback } from 'react'

import { Loading, LoadingSize } from '../Loading'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import SVGInline from 'react-svg-inline/src'
import ConnectedAccounts from './ConnectedAccounts'
import { RIConnectors } from '../../data/data'
import translate from '../../i18n/translate'
import ConnectAccounts from '../Accounts/ConnectAccounts/ConnectAccounts'
import { useSelector } from 'react-redux'
import LTVGraph from '../charts/LTVGraph'
import moment from 'moment'
import InsightsIcon from 'components/UI/Icons/InsightsIcon'
import useAsyncActions from 'hooks/useAsyncActions'
import useAPI from 'hooks/useAPI'

const query = new URLSearchParams(window.location.search)

if (query && query.get('secret')) {
  localStorage.setItem('secret', query.get('secret'))
}

export const LifeTimeValueComponent = () => {
  const {
    appData: {
      application: { accounts = {}, application_id },
    },
  } = useSelector((state) => state)

  const { openPanelRI, saveApplication } = useAsyncActions()
  const { apiCallApplications } = useAPI()

  const [data, setData] = useState(false)
  const [extraResults, setExtraResults] = useState(false)
  const previousMonthLastDay = moment()
    .subtract(1, 'months')
    .endOf('month')
    .format('YYYY-MM-DD')
  const previousMonthLastYear = moment()
    .subtract(1, 'month')
    .subtract(1, 'year')
    .format('YYYY-MM-01')

  const getContentAPI = useCallback(async () => {
    try {
      const url = `/${application_id}/insights/tables/ltv/retention?period.gte=${previousMonthLastYear}&period.lte=${previousMonthLastDay}`
      let response = await apiCallApplications(url, 'GET')
      setData(response.ltv)
      setExtraResults(response)
    } catch (e) {
      console.error('ERROR on GET ltv: ', e)
    }
  }, [
    apiCallApplications,
    setData,
    previousMonthLastYear,
    previousMonthLastDay,
    application_id,
  ])

  useEffect(() => {
    if (!data) {
      getContentAPI()
    }
  }, [data, getContentAPI])

  const updateStatus = (data) => saveApplication(data)

  const openRIPanel = (item) => openPanelRI(item)

  return (
    <>
      {application_id && updateStatus && <ConnectAccounts />}

      <h1 className="layout-app__title">
        <SVGInline
          className="image-icon ritmo-insights"
          svg={
            '<svg width="34px" height="34px" viewBox="0 0 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg">\n' +
            '    <g transform="translate(0.500017, 0.500000)" fill="#000000" fill-rule="nonzero">\n' +
            '        <path d="M15.6106744,8.59392017 L16.4018062,7.80278833 C18.1844603,6.02017332 18.1844603,3.11959092 16.4018062,1.33697591 C14.6191521,-0.445678167 11.7185697,-0.445639104 9.93603285,1.33697591 L8.86951072,2.40349804 L7.80298858,1.33701497 C6.02037357,-0.445600042 3.11983023,-0.445639104 1.33717616,1.33701497 C-0.445477914,3.11962998 -0.445477914,6.02021238 1.33569179,7.80134302 L8.47540963,14.9923499 C8.85794823,17.8161745 11.2841953,20 14.2112229,20 C17.4031331,20 19.9999659,17.4031672 19.9999659,14.2112571 C19.9999659,11.5017682 18.1286791,9.22145847 15.6106744,8.59392017 Z M8.48779243,13.3416097 L2.74529944,7.55786675 L6.84459131,7.55786675 L7.24630957,6.84259419 L8.97744027,9.48364565 L10.5208368,7.43274972 L15.1285265,7.41880442 L14.1237621,8.42360788 C11.266539,8.46618595 8.90431536,10.5888396 8.48779243,13.3416097 Z M2.1657689,2.16564677 C3.49150947,0.839945264 5.64865527,0.839945264 6.97435678,2.16564677 L8.86951072,4.06080071 L10.7646647,2.16564677 C12.0903662,0.839945264 14.2473948,0.839906201 15.5732135,2.16564677 C16.2154002,2.80783349 16.5690716,3.66169963 16.5690716,4.56994071 C16.5690716,5.16618998 16.4157124,5.73853303 16.1293065,6.24341523 L9.93611098,6.26091521 L9.04361207,7.44689032 L7.16912217,4.58712819 L6.15873277,6.38599318 L1.69623822,6.38599318 C0.865887673,5.07228385 1.02178592,3.30962975 2.1657689,2.16564677 Z M14.7971597,18.7910952 L14.7971597,17.6785966 L13.6252862,17.6785966 L13.6252862,18.7910952 C11.5503668,18.5271502 9.90107196,16.8805507 9.63275197,14.8069985 L10.7536881,14.8069985 L10.7536881,13.635125 L9.63029104,13.635125 C9.89072041,11.552315 11.5438825,9.89618421 13.6253252,9.63137984 L13.6253252,10.7634878 L14.7971988,10.7634878 L14.7971988,9.63137984 C16.8786806,9.89618421 18.5318427,11.552315 18.792272,13.635125 L17.6688359,13.635125 L17.6688359,14.8069985 L18.7898111,14.8069985 C18.521413,16.8805897 16.8720791,18.5271502 14.7971597,18.7910952 Z"></path>\n' +
            '        <polygon points="13.6252862 11.9886817 13.6346221 13.8473513 12.8025137 14.502663 13.5275519 15.4233259 14.8093863 14.413874 14.7971597 11.9827442"></polygon>\n' +
            '    </g>\n' +
            '</svg>'
          }
        />
        <span>
          <b>RITMO Insights</b>
          <InsightsIcon classes="ritmo-insights-icon" />
          {translate('components.ritmo_insights.ltv')}
          <span className="beta">beta</span>
        </span>
      </h1>

      <div className="dashboard__select">
        <ConnectedAccounts accounts={accounts} connectors={RIConnectors} />
      </div>

      {/* LOADING */}
      {!extraResults ? (
        <div className="dashboard__cells-container full">
          <LoadingSize size={46} />
        </div>
      ) : (
        <LTVGraph
          data={data}
          extraResults={extraResults}
          openRIPanel={openRIPanel}
          accounts={accounts}
        />
      )}
    </>
  )
}

export default withAuthenticationRequired(LifeTimeValueComponent, {
  Redirecting: () => <Loading />,
})
