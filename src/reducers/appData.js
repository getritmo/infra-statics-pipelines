import {
  SAVE_APPLICATION_DATA,
  SAVE_COMPANY_DATA,
  SAVE_PAYMENTS,
  SAVE_USER,
  SET_VIEW_MODE,
  SUBSCRIBE_NEWSLETER,
  SAVE_FEATURES,
} from 'actions/appData'

const appDataInitialState = {
  application: {},
  user: undefined,
  viewMode: 'user',
}

export const appData = (state = appDataInitialState, action) => {
  switch (action.type) {
    case SAVE_APPLICATION_DATA:
      return {
        ...state,
        application: action.payload,
      }
    case SAVE_USER:
      return {
        ...state,
        user: action.payload,
      }
    case SAVE_COMPANY_DATA:
      return {
        ...state,
        company: action.payload,
      }
    case SAVE_FEATURES:
      return {
        ...state,
        features: action.payload,
      }
    case SAVE_PAYMENTS:
      return {
        ...state,
        payments: action.payload,
      }
    case SUBSCRIBE_NEWSLETER:
      return {
        ...state,
        user: {
          ...state.user,
          is_subscribed: action.payload,
        },
      }
    case SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.payload,
      }
    default:
      return state
  }
}
