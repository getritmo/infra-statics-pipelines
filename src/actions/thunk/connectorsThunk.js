import { rutterAccounts, updateKey } from 'data/data'
import { apiCallApplications } from 'utils/apiCalls'
import { setIframe, setOverlay } from '../global'
import { saveApplicationAction } from './globalThunk'
import { closePanelAccountAction, openPanelAccountAction } from './panelThunk'

export function setAccountInactiveAction() {
  const panelLayer = document.getElementById('panel-account')
  if (panelLayer) {
    panelLayer.classList.add('fade-out')
  }
  return function (dispatch) {
    setTimeout(() => {
      dispatch(closePanelAccountAction())
    }, 400)
  }
}

export function removeAccountAction(e, connector, connectorId) {
  if (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  return function (dispatch, getState) {
    const { application_id } = getState().appData.application
    dispatch(
      setOverlay({
        open: true,
        type: 'confirm',
        connector,
        connectorId,
        application_id,
      }),
    )
  }
}

export function connectAccountCallbackAction(data, connector, token) {
  return async function (dispatch) {
    if (data === undefined) {
      dispatch(setOverlay({ open: true, type: 'error403', connector }))
    }

    let application = data
    if (!data.length) {
      let response = await apiCallApplications(token, '', 'GET')
      application = response.application
    }

    if (connector) {
      const lastAccount = application.accounts[connector].length - 1
      const account = application.accounts[connector][lastAccount]

      if (
        account.status &&
        (account.status === 'source_pending' || account.status === 'connected')
      ) {
        dispatch(openPanelAccountAction(updateKey(connector), account))
      }
      dispatch(saveApplicationAction(token, application))
    }
  }
}

export function startsConnectionAction(
  e,
  { connector, store = undefined },
  openRutterIframe,
  token,
) {
  const getAsyncUrl = async (dispatch, { application_id, store }) => {
    const connectorKey = updateKey(connector)
    let url = `/${application_id}/connectors/${connectorKey}`
    if (store) url += `?country=${store}`

    try {
      let response = await apiCallApplications(token, url, 'GET')
      if (response.auth_url !== undefined) {
        // Redirects to the Connector Service
        window.location.href = response.auth_url
      } else if (response.iframe_url !== undefined) {
        dispatch(
          setIframe({ open: true, url: response.iframe_url, application_id }),
        )
        localStorage.setItem('afterBanksUrl', response.iframe_url)
      } else {
        dispatch(connectAccountCallbackAction(response, connector, token))
      }
    } catch (e) {
      console.error(`ERROR starting ${connectorKey} connection`, e)
    }
  }

  if (e) {
    e.preventDefault()
  }
  localStorage.setItem('connector', connector)
  localStorage.setItem('redirectUrl', window.location.pathname.split('/')[1])

  // update the active connector

  let isFoundInRouter = false
  for (let i = 0; i < rutterAccounts.length; i++) {
    if (rutterAccounts[i].title === connector) {
      isFoundInRouter = rutterAccounts[i].connector
      break
    }
  }

  return function (dispatch, getState) {
    const { application_id } = getState().appData.application

    if (isFoundInRouter) {
      openRutterIframe({
        platform: isFoundInRouter,
      })
    } else if (connector === 'googleanalytics') {
      dispatch(setOverlay({ open: true, type: 'GA' }))
      // setGoogleAnalyticsOverlay(true)
      setTimeout(() => {
        getAsyncUrl(dispatch, { application_id })
      }, 2500)
    } else {
      getAsyncUrl(dispatch, { application_id, store })
    }
  }
}

export function asyncConnectorRutterAction(rutterToken, token) {
  return async function (dispatch, getState) {
    const { application_id } = getState().appData.application
    const connector = localStorage.getItem('connector')
    const connectorKey = updateKey(connector)
    try {
      let response = await apiCallApplications(
        token,
        `/${application_id}/connectors/${connectorKey}`,
        'POST',
        {
          public_token: rutterToken,
        },
      )
      dispatch(connectAccountCallbackAction(response, connector, token))
    } catch (e) {
      console.error(`ERROR while connecting ${connectorKey}`, e)
    }
  }
}
