import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import translate from '../../i18n/translate'
import AccountsItem from './AccountsItem'
import { useSelector } from 'react-redux'

const AccountsItems = (props) => {
  const { connectors, showSync, typeGraph, hideActions, hiddenAccount } = props

  const {
    appData: {
      application: { accounts = {} },
    },
  } = useSelector((state) => state)

  let accountsLength = 0

  return (
    <>
      {connectors !== undefined &&
        connectors.map((connector, value) => {
          return (
            <Fragment key={value}>
              {accounts[connector] !== undefined &&
                accounts[connector].length > 0 && (
                  <>
                    {/* USERS */}
                    {/*
                      auth_pending -> el usuario no ha conectado la cuenta de Google
                      source_pending -> cuenta conectada, sin views seleccionadas
                      connected -> cuenta conectada y configurada
                      error ->
                  */}

                    {accounts[connector].map((account) => {
                      const accountId = account?.id || connector
                      if (account.status !== 'auth_pending') {
                        accountsLength++
                      }

                      return (
                        <AccountsItem
                          key={accountId}
                          connector={connector}
                          accountId={accountId}
                          hiddenAccount={hiddenAccount}
                          userItem={account}
                          typeGraph={typeGraph}
                          showSync={showSync}
                          accounts={connectors}
                          hideActions={hideActions}
                        />
                      )
                    })}
                  </>
                )}
            </Fragment>
          )
        })}

      {accountsLength === 0 && (
        <div className="accounts__no-accounts">
          {translate('components.accounts_items.no_accounts')}
        </div>
      )}
    </>
  )
}

AccountsItems.propTypes = {
  connectors: PropTypes.array,
  showSync: PropTypes.bool,
  typeGraph: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  hideActions: PropTypes.bool,
}

export default AccountsItems
