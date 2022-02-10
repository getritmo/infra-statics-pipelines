import { useCallback, useMemo } from 'react'
import { useRutterLink } from 'react-rutter-link'
import useAsyncActions from './useAsyncActions'

export default function useRutter() {
  const { asyncConnectorRutter } = useAsyncActions()

  const onSuccessRutter = useCallback(
    (publicToken) => {
      asyncConnectorRutter(publicToken)
    },
    [asyncConnectorRutter],
  )

  const rutterConfig = useMemo(
    () => ({
      publicKey: process.env.REACT_APP_RUTTER_PUBLIC_KEY,
      onSuccess: onSuccessRutter,
    }),
    [onSuccessRutter],
  )

  const { open, ready } = useRutterLink(rutterConfig)

  return { openRutter: open, rutterReady: ready }
}
