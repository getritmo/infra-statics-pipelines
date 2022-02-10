import { updateKey } from 'data/data'
import { apiCallApplications } from 'utils/apiCalls'
import { closeOverlay } from '../global'
import { saveApplicationAction } from './globalThunk'

export function removeAccountAcceptAction(token, connectorToRemove, id) {
  const component = document.getElementById(id)
  if (component) component.classList.add('hidden')

  return async function (dispatch, getState) {
    const { application_id } = getState().appData.application
    dispatch(closeOverlay())
    const connector = updateKey(connectorToRemove)
    try {
      let response = await apiCallApplications(
        token,
        `/${application_id}/connectors/${connector}/${id}`,
        'DELETE',
      )

      let application = response
      if (!response.length) {
        response = await apiCallApplications(token, '', 'GET')
        application = response.application
      }

      dispatch(saveApplicationAction(token, application))
    } catch (e) {
      //TODO handle error
      console.error(`ERROR on DELETE /${connector}/${id}: `, e)
    }
  }
}
