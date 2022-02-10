import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  connectAccountCallbackAction,
  removeAccountAction,
  setAccountInactiveAction,
  startsConnectionAction,
  asyncConnectorRutterAction,
} from 'actions/thunk/connectorsThunk'
import { useAuth0 } from '@auth0/auth0-react'

export default function useConnectorsAsyncActions() {
  const dispatch = useDispatch()
  const { getAccessTokenSilently } = useAuth0()

  const setAccountInactive = useCallback(() => {
    dispatch(setAccountInactiveAction())
  }, [dispatch])

  const removeAccount = useCallback(
    (e, connector, connectorId) => {
      dispatch(removeAccountAction(e, connector, connectorId))
    },
    [dispatch],
  )

  const connectAccountCallback = useCallback(
    async (data, connector) => {
      const token = await getAccessTokenSilently()
      dispatch(connectAccountCallbackAction(data, connector, token))
    },
    [getAccessTokenSilently, dispatch],
  )

  const startsConnection = useCallback(
    async (e, { connector, store = undefined }, openRutterIframe) => {
      const token = await getAccessTokenSilently()
      dispatch(
        startsConnectionAction(
          e,
          { connector, store },
          openRutterIframe,
          token,
        ),
      )
    },
    [getAccessTokenSilently, dispatch],
  )

  const asyncConnectorRutter = useCallback(
    async (publicToken) => {
      const token = await getAccessTokenSilently()
      dispatch(asyncConnectorRutterAction(publicToken, token))
    },
    [getAccessTokenSilently, dispatch],
  )

  return {
    setAccountInactive,
    removeAccount,
    connectAccountCallback,
    startsConnection,
    asyncConnectorRutter,
  }
}
