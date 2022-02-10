import React, { useState } from 'react'
import translate from 'i18n/translate'
import { convertKey } from 'data/data'
import { useSelector, useDispatch } from 'react-redux'
import { connectorComponent } from '../../Connectors'
import { setOverlay } from 'actions/global'
import useAsyncActions from 'hooks/useAsyncActions'

const PanelAccount = () => {
  const {
    application: { accounts = {}, application_id },
  } = useSelector((state) => state.appData)
  const {
    panel: {
      panelAccount: { open = false, item = false, connector = false },
    },
  } = useSelector((state) => state.globalState)

  const dispatch = useDispatch()
  const { updateView, setAccountInactive, removeAccountAccept } =
    useAsyncActions()

  const [activeAccount, setActiveAccount] = useState(false)
  const [activeProperty, setActiveProperty] = useState(false)

  const [showCloseError, setShowCloseError] = useState(false)

  const checkIfHasViews = () => {
    let hasViews = false

    item.children?.forEach((accounts) => {
      accounts.children?.forEach((properties) => {
        if (properties.children?.length) {
          hasViews = true
        }
      })
    })
    return hasViews
  }

  const canClose = (connectorType) => {
    switch (connectorType) {
      case 'googleanalytics':
        return (
          accounts.googleanalytics.find((account) => account.id === item.id)
            ?.status === 'connected' || !checkIfHasViews()
        )
      case 'gas':
        return (
          accounts.googleads.find((account) => account.id === item.id)
            ?.status === 'connected'
        )
      case 'fas':
        return (
          accounts.facebookads.find((account) => account.id === item.id)
            ?.status === 'connected'
        )
      default:
        return true
    }
  }

  const selectView = (checked, connector, id, viewId) =>
    updateView(checked, connector, id, viewId, application_id)

  const handleSetAccountInactive = () => setAccountInactive()

  const handleRemoveAccount = (e, connector, connectorId) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    dispatch(
      setOverlay({
        open: true,
        type: 'confirm',
        connector,
        connectorId,
        application_id,
      }),
    )
  }

  const handleRemoveAccountAccept = (connectorToRemove, id = undefined) =>
    removeAccountAccept(connectorToRemove, id)

  const closePanel = () => {
    if (canClose(connector)) {
      if (connector === 'googleanalytics' && !checkIfHasViews()) {
        handleRemoveAccountAccept('googleanalytics', item.id)
      }
      handleSetAccountInactive()

      setTimeout(() => {
        setActiveAccount(false)
        setActiveProperty(false)
      }, 500)
    } else {
      setShowCloseError(true)
    }
  }

  const handleUpdateView = (e, property, view) => {
    selectView(e.target.checked, convertKey(connector), property, view)
  }

  const preventClose = (e) => {
    e.stopPropagation()
  }

  const goToAccount = () => {
    setActiveAccount(false)
    setActiveProperty(false)
  }

  const goToProperty = () => {
    setActiveProperty(false)
  }

  const Connector = connectorComponent[connector]

  if (!open) return null

  return (
    <section id="panel-account" className={'panel'}>
      <div className="panel__blackout" onClick={closePanel} />
      <div className="panel__container" onClick={preventClose}>
        <div className="panel__container--cell">
          <div className="panel__img--container">
            {connector.indexOf('others') === -1 ? (
              <img
                src={`/images/accounts/${connector}.png`}
                alt={connector}
                className={`panel__img ${connector}`}
              />
            ) : (
              <div className="panel__title">
                {connector === 'marketingothers' && (
                  <>{translate('components.panel.marketing_accounts')}</>
                )}
                {connector === 'salesothers' && (
                  <>{translate('components.panel.sales_accounts')}</>
                )}
                {connector === 'financeothers' && (
                  <>{translate('components.panel.finance_accounts')}</>
                )}
              </div>
            )}
            <div className="panel__close" onClick={closePanel} />
          </div>
          <Connector
            activeAccount={activeAccount}
            activeProperty={activeProperty}
            goToAccount={goToAccount}
            goToProperty={goToProperty}
            updateView={handleUpdateView}
            setActiveAccount={setActiveAccount}
            setActiveProperty={setActiveProperty}
            panelAccount={item}
            showCloseError={showCloseError}
            hideCloseError={() => setShowCloseError(false)}
            removeAccount={handleRemoveAccount}
            checkIfHasViews={checkIfHasViews}
            closePanel={closePanel}
          />
        </div>
      </div>
    </section>
  )
}

export default PanelAccount
