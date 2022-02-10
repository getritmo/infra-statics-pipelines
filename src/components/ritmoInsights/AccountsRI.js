import React from 'react'
import AccountsItems from '../Accounts/AccountsItems'

const AccountsRI = (props) => {
  const connectors = props.connectors

  const createArray = (items) => {
    const arrayItems = []

    for (let i = 0; i < items.length; i++) {
      if (typeof items[i] === 'string') {
        arrayItems.push(items[i])
      } else {
        for (let j = 0; j < items[i].length; j++) {
          if (typeof items[i][j] === 'string') {
            arrayItems.push(items[i][j])
          }
        }
      }
    }

    return arrayItems
  }
  return (
    <div className="panel__admin">
      <AccountsItems
        showSync
        typeGraph={props.typeGraph}
        connectors={createArray(connectors.items)}
      />
    </div>
  )
}

export default AccountsRI
