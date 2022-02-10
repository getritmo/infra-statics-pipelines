import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import {
  getApplicationAction,
  getApplicationByIdAction,
  getCompanyByIdAction,
  getFeaturesByIdAction,
  getPaymentsAction,
  getPaymentsByApplicationIdAction,
  saveApplicationAction,
  savePrivacyCookieAndCloseAction,
  updateAppDataAction,
} from 'actions/thunk/globalThunk'

export default function useGlobalAsyncActions() {
  const dispatch = useDispatch()
  const { getAccessTokenSilently } = useAuth0()

  const updateAppData = useCallback(
    async (callback) => {
      const token = await getAccessTokenSilently()
      dispatch(updateAppDataAction(token, callback))
    },
    [getAccessTokenSilently, dispatch],
  )

  const saveApplication = useCallback(
    async (data, callback) => {
      const token = await getAccessTokenSilently()
      dispatch(saveApplicationAction(token, data, callback))
    },
    [getAccessTokenSilently, dispatch],
  )

  const getCompanyById = useCallback(
    async (companyId, callback) => {
      const token = await getAccessTokenSilently()
      dispatch(getCompanyByIdAction(token, companyId, callback))
    },
    [getAccessTokenSilently, dispatch],
  )

  const getApplication = useCallback(
    async (callback) => {
      const token = await getAccessTokenSilently()
      dispatch(getApplicationAction(token, callback))
    },
    [getAccessTokenSilently, dispatch],
  )

  const getApplicationById = useCallback(
    async (applicationId, callback) => {
      const token = await getAccessTokenSilently()
      dispatch(getApplicationByIdAction(token, applicationId, callback))
    },
    [getAccessTokenSilently, dispatch],
  )

  const getFeaturesById = useCallback(
    async (companyId, rol, callback) => {
      const token = await getAccessTokenSilently()
      dispatch(getFeaturesByIdAction(token, companyId, rol, callback))
    },
    [getAccessTokenSilently, dispatch],
  )

  const getPaymentsByApplicationId = useCallback(
    async (callback) => {
      const token = await getAccessTokenSilently()
      dispatch(getPaymentsByApplicationIdAction(token, callback))
    },
    [getAccessTokenSilently, dispatch],
  )

  const getPayments = useCallback(
    async (callback) => {
      const token = await getAccessTokenSilently()
      dispatch(getPaymentsAction(token, callback))
    },
    [getAccessTokenSilently, dispatch],
  )

  const savePrivacyCookieAndClose = useCallback(() => {
    dispatch(savePrivacyCookieAndCloseAction())
  }, [dispatch])

  return {
    updateAppData,
    getCompanyById,
    getApplication,
    getApplicationById,
    getFeaturesById,
    saveApplication,
    getPaymentsByApplicationId,
    getPayments,
    savePrivacyCookieAndClose,
  }
}
