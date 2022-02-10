import {
  ACCEPT_PRIVACY,
  CLOSE_IFRAME,
  CLOSE_OVERLAY,
  CLOSE_PANEL,
  EDIT_PANEL_STATE,
  SAVE_MENU_STATUS,
  SET_IFRAME,
  SET_OVERLAY,
} from 'actions/global'

const initialPanelState = {
  open: false,
  type: '',
  subtype: '',
  mode: '',
  onCloseConfirmation: false,
  formData: {},
  title: '',
  panelAccount: {},
  panelRI: {},
}

const initialOverlayState = {
  open: false,
}

const initialIframeState = {
  open: false,
}

const globalInitialState = {
  panel: initialPanelState,
  overlay: initialOverlayState,
  iframe: initialIframeState,
  company: undefined,
  showPrivacy: !localStorage.getItem('privacy-cookie'),
  menu: {},
}

export const globalState = (state = globalInitialState, action) => {
  switch (action.type) {
    case EDIT_PANEL_STATE:
      return {
        ...state,
        panel: {
          ...state.panel,
          ...action.payload,
        },
      }
    case CLOSE_PANEL:
      return {
        ...state,
        panel: initialPanelState,
      }
    case CLOSE_OVERLAY:
      return {
        ...state,
        overlay: initialOverlayState,
      }
    case SET_OVERLAY:
      return {
        ...state,
        overlay: { ...action.payload },
      }
    case SET_IFRAME:
      return {
        ...state,
        iframe: { ...action.payload },
      }
    case CLOSE_IFRAME:
      return {
        ...state,
        iframe: initialIframeState,
      }
    case ACCEPT_PRIVACY:
      return {
        ...state,
        showPrivacy: action.payload,
      }
    case SAVE_MENU_STATUS:
      return {
        ...state,
        menu: action.payload,
      }
    default:
      return state
  }
}
