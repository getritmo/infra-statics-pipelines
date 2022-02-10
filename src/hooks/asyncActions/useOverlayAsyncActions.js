import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { removeAccountAcceptAction } from 'actions/thunk/overlayThunk'

export default function useOverlayAsyncActions() {
  const dispatch = useDispatch()
  const { getAccessTokenSilently } = useAuth0()

  const removeAccountAccept = useCallback(
    async (connectorToRemove, id) => {
      const token = await getAccessTokenSilently()
      dispatch(removeAccountAcceptAction(token, connectorToRemove, id))
    },
    [getAccessTokenSilently, dispatch],
  )

  return {
    removeAccountAccept,
  }
}
