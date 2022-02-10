import useConnectorsAsyncActions from './asyncActions/useConnectorsAsyncActions'
import useGlobalAsyncActions from './asyncActions/useGlobalAsyncActions'
import useOverlayAsyncActions from './asyncActions/useOverlayAsyncActions'
import usePanelAsyncActions from './asyncActions/usePanelAsyncActions'

export default function useAsyncActions() {
  const globalActions = useGlobalAsyncActions()
  const connectorsActions = useConnectorsAsyncActions()
  const panelActions = usePanelAsyncActions()
  const overlayActions = useOverlayAsyncActions()

  return {
    ...globalActions,
    ...connectorsActions,
    ...panelActions,
    ...overlayActions,
  }
}
