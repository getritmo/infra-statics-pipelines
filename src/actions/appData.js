export const SAVE_APPLICATION_DATA = 'SAVE_APPLICATION_DATA'
export const SAVE_USER = 'SAVE_USER'
export const SAVE_PAYMENTS = 'SAVE_PAYMENTS'
export const SAVE_COMPANY_DATA = 'SAVE_COMPANY_DATA'
export const SAVE_FEATURES = 'SAVE_FEATURES'
export const SUBSCRIBE_NEWSLETER = 'SUBSCRIBE_NEWSLETTER'
export const SET_VIEW_MODE = 'SET_VIEW_MODE'

export const setApplication = (payload) => {
  return {
    type: SAVE_APPLICATION_DATA,
    payload,
  }
}

export const setUser = (payload) => {
  return {
    type: SAVE_USER,
    payload,
  }
}

export const setIsSubscribed = (payload) => {
  return {
    type: SUBSCRIBE_NEWSLETER,
    payload,
  }
}

export const setCompany = (payload) => {
  return {
    type: SAVE_COMPANY_DATA,
    payload,
  }
}

export const setFeatures = (payload) => {
  return {
    type: SAVE_FEATURES,
    payload,
  }
}

export const setPayments = (payload) => {
  return {
    type: SAVE_PAYMENTS,
    payload,
  }
}

export const setViewMode = (payload) => {
  return {
    type: SET_VIEW_MODE,
    payload,
  }
}
