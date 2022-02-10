import { setPayments, setApplication, setFeatures } from 'actions/appData'
import { setCompany } from 'actions/appData'
import { saveMenuStatus, setPrivacyCookieAccepted } from 'actions/global'
import {
  apiCallApplications,
  apiCallApplicationsAdmin,
  apiCallApplicationsUsers,
} from 'utils/apiCalls'

export function updateAppDataAction(token, callback) {
  return async function (dispatch) {
    try {
      let response = await apiCallApplications(token, '', 'GET')
      dispatch(saveApplicationAction(token, response))
    } catch (e) {
      //TODO handle errors
      console.error('ERROR on GET /application: ', e)
    } finally {
      if (callback) callback()
    }
  }
}

export function decodeUserStatusAction(token, data) {
  return async function (dispatch) {
    const status = data.status

    let statusArray = []
    //Convertir a binario
    const binState = (status >>> 0).toString(2).split('').reverse()

    for (let i = 0; i < 11; i++) {
      if (i > 2) {
        statusArray[i - 3] = binState[i] === '1' ? 'green' : 'disable'
      }
    }
    let resp = await apiCallApplicationsAdmin(
      token,
      `/features/flags?company-id=${data.company_id}`,
      'GET',
    )
    let myAdvanceFeature =
      (await resp[0].features.find((feature) => feature.name === 'myAdvance')
        ?.enabled) || false

    dispatch(
      saveMenuStatus({
        statusArray,
        offers: data.offers,
        isNotAcceptedApplication: status === 3 || false,
        features: {
          myAdvance: myAdvanceFeature,
        },
      }),
    )
  }
}

export function saveApplicationAction(token, data, callback) {
  return async function (dispatch, getState) {
    const { viewMode, user } = getState().appData
    try {
      dispatch(setApplication(data))
      if (
        viewMode === 'user' ||
        (viewMode === 'admin' && data.user_id === user.user_id)
      )
        dispatch(decodeUserStatusAction(token, data))
    } catch (e) {
      //TODO handle errors
      console.error('ERROR while saving application data: ', e)
    } finally {
      if (callback) callback()
    }
  }
}

export function getCompanyByIdAction(token, companyId, callback) {
  return async function (dispatch) {
    try {
      let data = await apiCallApplicationsAdmin(
        token,
        `/companies/${companyId}`,
        'GET',
      )
      dispatch(setCompany(data))
    } catch (e) {
      //TODO handle errors
      console.error('ERROR on GET /company: ', e)
    } finally {
      if (callback) callback()
    }
  }
}

export function getApplicationAction(token, callback) {
  return async function (dispatch) {
    try {
      let data = await apiCallApplications(token, '', 'GET')

      dispatch(saveApplicationAction(token, data.application))
    } catch (e) {
      //TODO handle errors
      console.error('ERROR on GET /application: ', e)
    } finally {
      if (callback) callback()
    }
  }
}

export function getApplicationByIdAction(token, applicationId, callback) {
  return async function (dispatch) {
    try {
      let data = await apiCallApplicationsAdmin(
        token,
        `/applications/${applicationId}`,
        'GET',
      )

      dispatch(saveApplicationAction(token, data))
    } catch (e) {
      //TODO handle errors
      console.error('ERROR on GET /application: ', e)
    } finally {
      if (callback) callback()
    }
  }
}

export function getFeaturesByIdAction(token, companyId, rol, callback) {
  return async function (dispatch, getState) {
    const { viewMode, user, application } = getState().appData
    try {
      const call =
        rol === 'admin' ? apiCallApplicationsAdmin : apiCallApplicationsUsers
      let data = await call(
        token,
        `/features/flags?company-id=${companyId}`,
        'GET',
      )
      dispatch(setFeatures(data[0].features))
      if (viewMode === 'admin' && application.user_id === user.user_id)
        dispatch(decodeUserStatusAction(token, application))
    } catch (e) {
      //TODO handle errors
      console.error('ERROR on GET /application: ', e)
    } finally {
      if (callback) callback()
    }
  }
}

export function getPaymentsByApplicationIdAction(token, callback) {
  return async function (dispatch, getState) {
    const { application_id } = getState().appData.application
    try {
      let response = await apiCallApplicationsAdmin(
        token,
        `/applications/${application_id}/payments`,
        'GET',
      )
      dispatch(setPayments(response))
    } catch (e) {
      //TODO handle errors
      console.error(`ERROR on GET /${application_id}/payments: `, e)
    } finally {
      if (callback) callback()
    }
  }
}

export function getPaymentsAction(token, callback) {
  return async function (dispatch) {
    try {
      let response = await apiCallApplicationsAdmin(token, '/payments', 'GET')
      dispatch(setPayments(response))
      // setData(response)
    } catch (e) {
      //TODO Handle error
      console.error('ERROR on GET /payments: ', e)
    } finally {
      if (callback) callback()
    }
  }
}

export function savePrivacyCookieAndCloseAction() {
  localStorage.setItem('privacy-cookie', true)
  return function (dispatch) {
    dispatch(setPrivacyCookieAccepted(false))
  }
}
