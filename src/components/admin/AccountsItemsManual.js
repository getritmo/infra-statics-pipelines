import React, { Fragment, useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../Loading'
import AvailableManualAccounts from '../Accounts/AvailableManualAccounts'

export const AccountsItems = (props) => {
  const [empty, setEmpty] = useState(true)
  const accounts = props.accounts
  const accountsArray = props.accountsArray

  for (const [key] of Object.entries(props.accountsArray)) {
    for (const [key1] of Object.entries(props.accounts)) {
      if (
        props.accountsArray[key] === key1 &&
        props.accounts[key1].length > 0
      ) {
        setTimeout(() => {
          setEmpty(false)
        }, 1000)
        break
      }
    }
  }

  return (
    <>
      {!empty && (
        <div className="accounts__list">
          <h3 className="accounts__title">
            Manual <b>Conectors</b>
          </h3>
          {Object.keys(accounts).map((value, key1) => {
            return (
              <div key={key1} className="accounts__manual-list">
                {accounts[value][0] &&
                  accounts[value][0].status === 'connected' &&
                  accountsArray.map((i) => {
                    return (
                      <Fragment key={i}>
                        {i === value && <AvailableManualAccounts item={i} />}
                      </Fragment>
                    )
                  })}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default withAuthenticationRequired(AccountsItems, {
  Redirecting: () => <Loading />,
})
