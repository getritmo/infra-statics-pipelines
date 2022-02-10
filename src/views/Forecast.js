import React, { useState } from 'react'
import { Container } from 'reactstrap'
import PrevisionGraphLine from './../components/charts/PrevisionGraphLine'
import GrowthGraphBar from './../components/charts/GrowthGraphBar'

import Breadcrumb from '../components/Breadcrumb'
import Loading from '../components/Loading'
import PanelRI from '../components/Panel/RI/PanelRI'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Redirect } from 'react-router-dom'
import SVGInline from 'react-svg-inline/src'
import translate from '../i18n/translate'

import {
  prevision,
  dataPrevision,
  dataCrecimiento,
  growth,
  getCookie,
} from './../data/data'
import { Helmet } from 'react-helmet'

const query = new URLSearchParams(window.location.search)

if (query && query.get('secret')) {
  localStorage.setItem('secret', query.get('secret'))
}

const isPublic = getCookie('special-content')

export const Forecast = () => {
  const [redirectToMarketing] = useState(
    !localStorage.getItem('secret') && !isPublic,
  )
  // eslint-disable-next-line  no-unused-vars
  const [weekly, setWeekly] = useState(prevision)
  const [panelActive, setPanelActive] = useState(false)
  const [panelContent, setPanelContent] = useState(false)
  const [panelClass, setPanelClass] = useState(false)

  /* if (monthly) {
        setTimeout(()=>{
            const element = document.getElementById('revenue');
        }, 1000)
    } */

  const openPanel = (item) => {
    setPanelActive(true)
    setPanelClass(item.title)
    setPanelContent(item)
  }

  const closePanel = () => {
    setPanelActive(false)
    setPanelClass('')
    setPanelContent('')
  }

  return (
    <>
      <Container className="">
        {redirectToMarketing && <Redirect to="/marketing-accounts" />}
        <>
          <Helmet>
            <title>RITMO Insights - Forecast</title>
          </Helmet>
          <PanelRI
            panelActive={panelActive}
            panelContent={panelContent}
            panelClass={panelClass}
            closePanel={closePanel}
          />
          <Breadcrumb
            previous="Ritmo Insights"
            actual="Forecast"
            previousUrl="/ritmo-insights/forecast"
            id=""
          />

          <div className="dashboard__select">
            <h1 className="layout-app__title">
              <SVGInline
                className="image-icon"
                svg={
                  '<svg width="34px" height="34px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg">\n' +
                  '    <g transform="translate(1.000000, 1.594864)" stroke="#000000" stroke-width="1.5">\n' +
                  '        <rect  fill="#FFFFFF" x="0" y="12.3847046" width="4.87646484" height="6.49064614" rx="1"></rect>\n' +
                  '        <rect fill="#FFFFFF" x="7.3203125" y="10.7249725" width="4.87646484" height="8.15037821" rx="1"></rect>\n' +
                  '        <rect fill="#FFFFFF" x="14.640625" y="7.03135661" width="4.87646484" height="11.8439941" rx="1"></rect>\n' +
                  '        <polyline stroke-linecap="square" points="2.5 7.90513591 9.78942871 5.85019563 17.0788574 1.94045101"></polyline>\n' +
                  '        <path d="M2.5,5.44880712 C3.5716815,5.44880712 4.44045101,6.31757663 4.44045101,7.38925813 C4.44045101,8.46093963 3.5716815,9.32970914 2.5,9.32970914 C1.4283185,9.32970914 0.55954899,8.46093963 0.55954899,7.38925813 C0.55954899,6.31757663 1.4283185,5.44880712 2.5,5.44880712 Z M9.78942871,3.50835611 C10.8611102,3.50835611 11.7298797,4.37712562 11.7298797,5.44880712 C11.7298797,6.52048862 10.8611102,7.38925813 9.78942871,7.38925813 C8.71774721,7.38925813 7.8489777,6.52048862 7.8489777,5.44880712 C7.8489777,4.37712562 8.71774721,3.50835611 9.78942871,3.50835611 Z M17.0788574,0 C18.1505389,0 19.0193084,0.868769509 19.0193084,1.94045101 C19.0193084,3.01213251 18.1505389,3.88090202 17.0788574,3.88090202 C16.0071759,3.88090202 15.1384064,3.01213251 15.1384064,1.94045101 C15.1384064,0.868769509 16.0071759,0 17.0788574,0 Z" id="Combined-Shape" fill="#FFFFFF" stroke-linecap="square"></path>\n' +
                  '    </g>\n' +
                  '</svg>'
                }
              />
              <span>
                <b>RITMO Insights</b> Forecast
              </span>
            </h1>
          </div>
        </>

        <div className="dashboard__cells-container rows-0">
          <div className="dashboard__cells--layout">
            {/* REVENUE */}
            <h2 className="dashboard__cells--title-graph">
              <span>{translate('data.ri.historic')}</span>
              <div
                className="dashboard__help"
                onClick={() => {
                  openPanel(dataPrevision)
                }}
              >
                <div className="dashboard__help--text">más info</div>
              </div>
            </h2>
            <PrevisionGraphLine
              monthlyData={prevision}
              weeklyData={prevision}
              type={dataPrevision.id}
              dataInitial={dataPrevision}
            />
          </div>
        </div>

        <div className="dashboard__cells-container rows-1">
          <div className="dashboard__cells--layout">
            {/* REVENUE */}
            <h2 className="dashboard__cells--title-graph">
              <span>{translate('data.ri.yty_growth')}</span>
              <div
                className="dashboard__help"
                onClick={() => {
                  openPanel(dataCrecimiento)
                }}
              >
                <div className="dashboard__help--text">más info</div>
              </div>
            </h2>
            <GrowthGraphBar
              monthlyData={growth}
              weeklyData={weekly}
              type={dataCrecimiento.id}
              dataInitial={dataCrecimiento}
            />
          </div>
        </div>
      </Container>
    </>
  )
}

export default withAuthenticationRequired(Forecast, {
  loginOptions: {
    language: document.cookie.indexOf('locale=es') === -1 ? 'en' : 'es',
  },
  Redirecting: () => <Loading />,
})
