import React, { useEffect, useState, useCallback } from 'react'

import { Loading, LoadingMin } from '../../components/Loading'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import SVGInline from 'react-svg-inline/src'
import { score_card_data } from '../../data/data'
import translate from '../../i18n/translate'
import ConnectAccounts from '../Accounts/ConnectAccounts/ConnectAccounts'
import { useSelector } from 'react-redux'
import ScoreCard from './../charts/ScoreCard'
import useAsyncActions from 'hooks/useAsyncActions'
import useAPI from 'hooks/useAPI'

const query = new URLSearchParams(window.location.search)

if (query && query.get('secret')) {
  localStorage.setItem('secret', query.get('secret'))
}

export const ScoreCardComponent = () => {
  const {
    appData: {
      application: { application_id, accounts = {} },
    },
  } = useSelector((state) => state)

  const [initial] = useState(true)
  const [data, setData] = useState(false)

  const { openPanelRI, saveApplication } = useAsyncActions()
  const { apiCallApplications } = useAPI()

  const getScoreCard = useCallback(async () => {
    try {
      const url = `/${application_id}/insights/ltv/monthly`
      apiCallApplications(url, 'GET').then(() => {
        setData(score_card_data)
      })
    } catch (e) {
      console.log('ERROR on GET application')
    }
  }, [apiCallApplications, application_id])

  useEffect(() => {
    getScoreCard()
  }, [initial, getScoreCard])

  const updateStatus = (data) => saveApplication(data)

  const isActiveECommerce = (value) => {
    switch (value) {
      case '354':
        return false
      case '359':
        return false
      case '537':
        return false
      default:
        return true
    }
  }

  const openRIPanel = (item) => openPanelRI(item)

  return (
    <>
      {application_id && updateStatus && <ConnectAccounts />}

      <br />
      <h1 className="layout-app__title big">
        <SVGInline
          className="image-icon ritmo-insights"
          svg={
            '<svg viewBox="0 0 513 513" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
            '    <g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
            '        <g id="rocket-icon" transform="translate(0.155614, 0.834389)" fill="#000000" fill-rule="nonzero">\n' +
            '            <path d="M253.039263,406.717345 C250.308597,406.717345 247.57793,405.672012 245.487263,403.602679 L108.37793,266.493345 C104.367263,262.482679 104.196597,256.061345 107.951263,251.837345 L210.71393,136.722679 C282.543263,52.6906786 399.51393,-1.68798804 501.508597,0.040011959 C507.204597,0.168011959 511.791263,4.75467863 511.919263,10.4506786 C514.287263,112.509345 459.28993,229.416012 375.044597,301.394679 L260.12193,404.008012 C258.116597,405.821345 255.556597,406.717345 253.039263,406.717345 Z M130.58593,258.536012 L253.444597,381.394679 L361.028597,285.352012 C437.956597,219.602679 489.04993,114.813345 490.628597,21.352012 C397.167263,22.9093453 292.399263,74.0026786 226.77793,150.760012 L130.58593,258.536012 Z" id="Shape"></path>\n' +
            '            <path d="M293.892597,484.797345 C292.868597,484.797345 291.823263,484.648012 290.84193,484.328012 C287.00193,483.048012 283.844597,480.104012 283.28993,476.093345 L268.655263,373.970679 C267.823263,368.146679 271.876597,362.749345 277.700597,361.896012 C283.524597,360.978679 288.92193,365.096012 289.775263,370.941345 L301.20993,450.728012 C338.58593,406.034679 359.364597,349.373345 359.364597,291.602679 C359.364597,285.714679 364.143263,280.936012 370.031263,280.936012 C375.919263,280.936012 380.69793,285.714679 380.69793,291.602679 C380.69793,362.280012 352.068597,431.464012 302.148597,481.362679 C300.015263,483.496012 296.900597,484.797345 293.892597,484.797345 L293.892597,484.797345 Z" id="Path"></path>\n' +
            '            <path d="M139.54593,243.432012 C139.055263,243.432012 138.543263,243.410679 138.031263,243.325345 L35.9085966,228.690679 C31.8979299,228.114679 28.5485966,225.320012 27.2899299,221.458679 C26.0312632,217.618679 27.0552632,213.373345 29.9352632,210.536012 C80.5592632,159.912012 149.72193,131.282679 220.399263,131.282679 C226.287263,131.282679 231.06593,136.061345 231.06593,141.949345 C231.06593,147.837345 226.287263,152.616012 220.399263,152.616012 C162.351263,152.616012 105.391263,173.586679 61.1672632,210.749345 L141.060597,222.205345 C146.884597,223.058679 150.93793,228.434679 150.10593,234.280012 C149.316597,239.592012 144.751263,243.432012 139.54593,243.432012 Z" id="Path"></path>\n' +
            '            <path d="M365.508597,199.784012 C351.83393,199.784012 338.180597,194.578679 327.791263,184.189345 C307.012597,163.389345 307.012597,129.554679 327.791263,108.754679 C348.591263,87.9546786 382.42593,87.9546786 403.22593,108.754679 C424.004597,129.554679 424.004597,163.389345 403.22593,184.189345 C392.815263,194.600012 379.16193,199.784012 365.508597,199.784012 Z M365.508597,114.493345 C357.316597,114.493345 349.103263,117.608012 342.87393,123.837345 C330.415263,136.317345 330.415263,156.626679 342.87393,169.106679 C355.35393,181.565345 375.663263,181.544012 388.143263,169.106679 C400.60193,156.626679 400.60193,136.317345 388.143263,123.837345 C381.892597,117.629345 373.700597,114.493345 365.508597,114.493345 Z" id="Shape"></path>\n' +
            '            <path d="M10.6712632,511.976012 C7.87659658,511.976012 5.16726325,510.888012 3.11926325,508.861345 C0.345929914,506.088012 -0.678070086,502.013345 0.45259658,498.258679 C3.95126325,486.589345 35.2899299,383.464012 58.1165966,360.637345 C83.8232632,334.930679 125.65793,334.909345 151.364597,360.637345 C177.071263,386.344012 177.071263,428.178679 151.364597,453.885345 C128.53793,476.712012 25.4125966,508.050679 13.7432632,511.549345 C12.7192632,511.826679 11.6952632,511.976012 10.6712632,511.976012 Z M104.751263,362.664012 C93.3165966,362.664012 81.9032632,367.016012 73.1992632,375.698679 C60.8899299,388.029345 40.4099299,443.090679 26.8845966,485.096012 C68.8685966,471.570679 123.951263,451.090679 136.260597,438.781345 C153.647263,421.394679 153.647263,393.085345 136.260597,375.698679 C127.57793,367.016012 116.164597,362.664012 104.751263,362.664012 Z" id="Shape"></path>\n' +
            '        </g>\n' +
            '    </g>\n' +
            '</svg>'
          }
        />
        <span>
          <b>RITMO {translate('components.ritmo_insights.score_card')}</b>
        </span>
      </h1>

      {!data && (
        <div className="dashboard__cells-container full">
          <LoadingMin />
        </div>
      )}

      {data && (
        <ScoreCard
          data={data}
          isECommerce={isActiveECommerce(application_id)}
          openRIPanel={openRIPanel}
          accounts={accounts}
        />
      )}
    </>
  )
}

export default withAuthenticationRequired(ScoreCardComponent, {
  Redirecting: () => <Loading />,
})
