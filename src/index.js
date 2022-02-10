import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Auth0Provider } from '@auth0/auth0-react'
import history from './utils/history'
import { Provider } from 'react-redux'
import I18nProvider from './components/I18nProvider'
import { BrowserRouter } from 'react-router-dom'
import store from 'store'

let renderAvailable = true

const query = new URLSearchParams(window.location.search)

const urlParams = Object.fromEntries(
  new URLSearchParams(window.location.search),
)
const hasUrlParams = !!Object.keys(urlParams).length

const connector = localStorage.getItem('connector')
let redirectUrl = localStorage.getItem('redirectUrl')

function redirectTo() {
  const url = redirectUrl
    ? `/${redirectUrl}`
    : window.location.origin + window.location.pathname

  window.location.href = url
}

/* 
// FIX to check token expiration
const tokenKey = `@@auth0spajs@@::${process.env.REACT_APP_AUTH0_CLIENT_ID}::${process.env.REACT_APP_AUTH0_AUDIENCE}::${process.env.REACT_APP_AUTH0_SCOPE}`
const token = localStorage.getItem(tokenKey)

if (token) {
  const { expiresAt } = JSON.parse(token)
  if (parseInt(Date.now() / 1000) > expiresAt) {
    localStorage.removeItem(tokenKey)
  }
} */

if (hasUrlParams) {
  if (connector && window.location.pathname !== '/registration') {
    localStorage.setItem('urlParams', JSON.stringify(urlParams))

    switch (connector) {
      case 'googleanalytics':
      case 'googleads':
      case 'facebookads':
      case 'stripe':
      case 'paypal':
      case 'mercadolibre':
      case 'mercadopago':
      case 'openbanking_uk':
        renderAvailable = false
        redirectTo()
        break

      default:
        break
    }
  }

  const utmCampaign = query !== undefined ? query.get('utm_campaign') : null
  const utmContent = query !== undefined ? query.get('utm_content') : null
  const utmTerm = query !== undefined ? query.get('utm_term') : null
  const utmSource = query !== undefined ? query.get('utm_source') : null
  const utmMedium = query !== undefined ? query.get('utm_medium') : null
  const psDomain = query !== undefined ? query.get('ps_domain') : null
  const psApiKey = query !== undefined ? query.get('ps_api_key') : null
  const leadId = query !== undefined ? query.get('lead_id') : null
  const referrer = query !== undefined ? query.get('referrer') : null
  const onboardProduct =
    query !== undefined ? query.get('onboard_product') : null

  if (utmCampaign) {
    localStorage.setItem('utm_campaign', utmCampaign)
  }
  if (utmSource) {
    localStorage.setItem('utm_source', utmSource)
  }
  if (utmMedium) {
    localStorage.setItem('utm_medium', utmMedium)
  }
  if (utmContent) {
    localStorage.setItem('utm_content', utmContent)
  }
  if (utmTerm) {
    localStorage.setItem('utm_term', utmTerm)
  }
  if (referrer) {
    localStorage.setItem('referrer', referrer)
  }
  if (psDomain) {
    localStorage.setItem('ps_domain', psDomain)
  }
  if (psApiKey) {
    localStorage.setItem('ps_api_key', psApiKey)
  }
  if (leadId) {
    localStorage.setItem('lead_id', leadId)
  }
  if (onboardProduct) {
    localStorage.setItem('onboard_product', onboardProduct)
  }
}

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo
      ? appState.returnTo
      : window.location.pathname,
  )
}

const advancedOptions = {
  defaultScope: 'email profile',
}

if (renderAvailable) {
  ReactDOM.render(
    <BrowserRouter>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        audience={process.env.REACT_APP_AUTH0_AUDIENCE}
        redirectUri={process.env.REACT_APP_REDIRECT}
        useRefreshTokens
        onRedirectCallback={onRedirectCallback}
        advancedOptions={advancedOptions}
        cacheLocation={'localstorage'}
      >
        <Provider store={store}>
          <I18nProvider>
            <App />
          </I18nProvider>
        </Provider>
      </Auth0Provider>
    </BrowserRouter>,
    document.getElementById('root'),
  )

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister()
}
