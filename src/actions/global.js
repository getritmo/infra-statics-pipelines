export const MODAL_PRIVACY = 'MODAL_PRIVACY'
export const STORE_STATUS = 'STORE_STATUS'
export const USER_STATUS = 'USER_STATUS'
export const CLOSE_OVERLAY = 'CLOSE_OVERLAY'
export const CLOSE_PANEL = 'CLOSE_PANEL'
export const SET_OVERLAY = 'SET_OVERLAY'
export const SET_IFRAME = 'SET_IFRAME'
export const CLOSE_IFRAME = 'CLOSE_IFRAME'
// export const PANEL_GO_NEXT = 'PANEL_GO_NEXT'
// export const PANEL_GO_BACK = 'PANEL_GO_BACK'
export const EDIT_PANEL_STATE = 'EDIT_PANEL_STATE'
export const ACCEPT_PRIVACY = 'ACCEPT_PRIVACY'
export const SAVE_MENU_STATUS = 'SAVE_MENU_STATUS'

export const openPanel = ({
  type = '',
  subtype = '',
  mode = '',
  formData = {},
  isLoading = false,
  onCloseConfirmation = false,
  companyId = undefined,
}) => {
  return {
    type: EDIT_PANEL_STATE,
    payload: {
      open: true,
      type,
      subtype,
      mode,
      formData,
      isLoading,
      companyId,
      onCloseConfirmation,
    },
  }
}

export const closePanel = () => {
  return {
    type: CLOSE_PANEL,
  }
}

export const closeOverlay = () => {
  return {
    type: CLOSE_OVERLAY,
  }
}

export const setOverlay = (payload) => {
  return {
    type: SET_OVERLAY,
    payload,
  }
}

export const setIframe = (payload) => {
  return {
    type: SET_IFRAME,
    payload,
  }
}
export const closeIframe = () => {
  return {
    type: CLOSE_IFRAME,
  }
}

export const editPanel = (payload) => {
  return {
    type: EDIT_PANEL_STATE,
    payload,
  }
}

export const setPrivacyCookieAccepted = ({ state }) => {
  return {
    type: ACCEPT_PRIVACY,
    payload: state,
  }
}

export const panelFormGoNext = ({ formData = {}, mode }) => {
  return {
    type: EDIT_PANEL_STATE,
    payload: {
      formData,
      mode,
    },
  }
}

export const panelFormGoBack = ({ mode }) => {
  return {
    type: EDIT_PANEL_STATE,
    payload: {
      mode,
    },
  }
}

export const saveMenuStatus = (payload) => {
  return {
    type: SAVE_MENU_STATUS,
    payload,
  }
}
