import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import {
  closePanelAccountAction,
  closePanelRIAction,
  openPanelAccountAction,
  openPanelRIAction,
  updateViewAction,
} from 'actions/thunk/panelThunk'

export default function usePanelAsyncActions() {
  const dispatch = useDispatch()
  const { getAccessTokenSilently } = useAuth0()

  const updateView = useCallback(
    async (checked, connector, id, viewId, applicationId) => {
      const token = await getAccessTokenSilently()
      dispatch(
        updateViewAction(token, checked, connector, id, viewId, applicationId),
      )
    },
    [getAccessTokenSilently, dispatch],
  )

  const closePanelAccount = useCallback(() => {
    dispatch(closePanelAccountAction())
  }, [dispatch])

  const openPanelAccount = useCallback(
    (connector, item) => {
      dispatch(openPanelAccountAction(connector, item))
    },
    [dispatch],
  )

  const closePanelRI = useCallback(() => {
    dispatch(closePanelRIAction())
  }, [dispatch])

  const openPanelRI = useCallback(
    (item) => {
      dispatch(openPanelRIAction(item))
    },
    [dispatch],
  )

  return {
    updateView,
    closePanelAccount,
    openPanelAccount,
    closePanelRI,
    openPanelRI,
  }
}
