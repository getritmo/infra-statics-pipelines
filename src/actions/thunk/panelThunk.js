import { editPanel } from 'actions/global'
import { updateKey } from 'data/data'
import { apiCallApplications } from 'utils/apiCalls'
import { saveApplicationAction } from './globalThunk'

export function updateViewAction(
  token,
  checked,
  connector,
  id,
  viewId,
  applicationId,
) {
  return async function (dispatch) {
    const connectorKey = updateKey(connector)
    const method = checked ? 'POST' : 'DELETE'
    try {
      let response = await apiCallApplications(
        token,
        `/${applicationId}/connectors/${connectorKey}/${id}/views/${viewId}`,
        method,
      )
      dispatch(saveApplicationAction(token, response))
    } catch (e) {
      //TODO Handle error
      console.error(
        `ERROR on ${method} /${connectorKey}/${id}/views/${viewId}: `,
        e,
      )
    }
  }
}

export function closePanelAccountAction() {
  return function (dispatch) {
    dispatch(editPanel({ panelAccount: {} }))
  }
}

export function openPanelAccountAction(connector, item) {
  return function (dispatch) {
    dispatch(
      editPanel({
        panelAccount: {
          open: true,
          item,
          connector,
        },
      }),
    )
  }
}
export function closePanelRIAction() {
  return function (dispatch) {
    dispatch(editPanel({ panelRI: {} }))
  }
}

export function openPanelRIAction(item) {
  return function (dispatch) {
    dispatch(
      editPanel({
        panelRI: {
          open: true,
          ...item,
        },
      }),
    )
  }
}
