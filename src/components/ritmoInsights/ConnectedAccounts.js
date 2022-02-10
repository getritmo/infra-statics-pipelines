import React, { Fragment } from 'react'
import { updateKey } from '../../data/data'
import translate from '../../i18n/translate'

const ConnectedAccounts = (props) => {
  const connectors = props.connectors
  const accounts = props.accounts

  // Creates an Array o connected accounts
  const connectedAccounts = []

  for (let i = 0; i < connectors.length; i++) {
    for (let j = 0; j < accounts[connectors[i]].length; j++) {
      if (accounts[connectors[i]][j].status === 'connected') {
        if (connectedAccounts.indexOf(connectors[i]) === -1) {
          connectedAccounts.push(connectors[i])
        }
      }
    }
  }

  return (
    <>
      {connectedAccounts.length > 0 && (
        <div className="dashboard__connectors">
          <h2 className="dashboard__connectors--title">
            {translate('components.ritmo_insights.connected_accounts')}
          </h2>
          {connectedAccounts.map((i) => {
            return (
              <Fragment key={i}>
                {i.last_sync}
                <img
                  key={i}
                  src={'/images/accounts/' + updateKey(i) + '.png'}
                  alt={updateKey(i)}
                  className="dashboard__connectors--item"
                />
              </Fragment>
            )
          })}
        </div>
      )}
    </>
  )
}

export default ConnectedAccounts
