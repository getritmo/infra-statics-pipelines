import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  accountsFinance,
  accountsMarketing,
  accountsSales,
  updateKey,
} from '../../../data/data'

import { useDispatch, useSelector } from 'react-redux'
import translate from '../../../i18n/translate'
import AvailableAccounts from '../AvailableAccounts'
import AccountsItems from '../AccountsItems'
import ConnectFinanceAccounts from './ConnectFinanceAccounts/ConnectFinanceAccounts'
import { setOverlay } from 'actions/global'
import useAsyncActions from 'hooks/useAsyncActions'
import useAPI from 'hooks/useAPI'

const redirectedConnectors = [
  'googleanalytics',
  'googleads',
  'stripe',
  'paypal',
  'mercadolibre',
  'mercadopago',
  'facebookads',
  'openbanking_uk',
]

const ConnectAccounts = ({
  type,
  showConnectedAccounts,
  showSync,
  showAvailableAccounts,
}) => {
  const dispatch = useDispatch()
  const {
    appData: {
      application: { application_id },
    },
  } = useSelector((state) => state)

  const { getApplication, connectAccountCallback } = useAsyncActions()
  const { apiCallApplications } = useAPI()

  const connectors = {
    finance: accountsFinance,
    mkt: accountsMarketing,
    sales: accountsSales,
  }

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.removeItem('urlParams')
      localStorage.removeItem('connector')
      localStorage.removeItem('redirectUrl')
      localStorage.removeItem('referrer')
      localStorage.removeItem('bank')
    }

    async function connectAccount(connector) {
      const { state, code, scope, granted_scopes, error } =
        JSON.parse(localStorage.getItem('urlParams')) || {}

      let body = {}

      switch (connector) {
        case 'googleanalytics':
        case 'googleads':
        case 'stripe':
        case 'paypal':
        case 'openbanking_uk':
          body = {
            state,
            code,
            scope,
          }
          break
        case 'mercadolibre':
        case 'mercadopago':
          body = {
            state,
            code,
          }
          break
        case 'facebookads':
          body = {
            state,
            code,
            scope: granted_scopes,
          }
          break
        default:
          break
      }

      if (error) {
        clearLocalStorage()
      }

      if (redirectedConnectors.some((item) => item === connector)) {
        try {
          if (connector === 'openbanking_uk') {
            body.scope = localStorage.getItem('bank')
          }
          let response = await apiCallApplications(
            `/${application_id}/connectors/${updateKey(connector)}`,
            'POST',
            body,
          )
          if (response.status === 403) {
            console.error(
              `ERROR user didn't grant permissions for connector ${updateKey(
                connector,
              )}`,
            )
            dispatch(
              setOverlay({
                open: true,
                type: 'error403',
                connector,
                application_id,
              }),
            )
          } else {
            if (connector !== 'openbanking_uk') {
              connectAccountCallback(response, connector, application_id)
            } else {
              getApplication()
            }
          }
        } catch (e) {
          console.error(
            `ERROR when validating ${updateKey(connector)} connector: `,
            e,
          )
        } finally {
          clearLocalStorage()
        }
      }
    }

    const connector = localStorage.getItem('connector')
    const urlParams = localStorage.getItem('urlParams')
    if (connector && urlParams) {
      connectAccount(connector)
    }
  }, [
    application_id,
    getApplication,
    apiCallApplications,
    connectAccountCallback,
    dispatch,
  ])

  return (
    <>
      {type === 'finance' && <ConnectFinanceAccounts />}

      {/* CUENTAS DISPONIBLES */}
      {showConnectedAccounts && (
        <section className={type + ' accounts__section'}>
          <h3 className="accounts__title">
            {translate('components.accounts_accounts.connected_accounts')}
          </h3>
          <div className="accounts__list">
            {showSync}
            <AccountsItems connectors={connectors[type]} showSync={showSync} />
          </div>
        </section>
      )}

      {showAvailableAccounts && (
        <section className="accounts__section">
          <h3 className="accounts__title">
            {translate('components.accounts_accounts.available_accounts')}
          </h3>
          <div className="accounts">
            {connectors[type].map((item, index) => {
              return <AvailableAccounts key={index} item={item} />
            })}
          </div>
        </section>
      )}
    </>
  )
}

ConnectAccounts.propTypes = {
  type: PropTypes.oneOf(['finance', 'mkt', 'sales']),
  showConnectedAccounts: PropTypes.bool,
  showSync: PropTypes.bool,
  showAvailableAccounts: PropTypes.bool,
}

export default ConnectAccounts
