import React, { Fragment, useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../Loading'
import translate from '../../i18n/translate'
import { updateKey } from '../../data/data'

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

  const evaluateChildrensSelected = (account) => {
    let result = false
    if (account.children !== undefined) {
      for (let i = 0; i < account.children.length; i++) {
        if (account.children[i].children !== undefined) {
          for (let j = 0; j < account.children[i].children.length; j++) {
            if (account.children[i].children[j].selected === true) {
              result = true
              break
            }
          }
        } else {
          if (account.children[i].selected === true) {
            result = true
            break
          }
        }
      }
    }

    return result
  }

  return (
    <div className="accounts__list">
      <h3 className="accounts__title">
        <b>Conectors</b>
      </h3>

      {accountsArray.map((value, key1) => {
        return (
          <Fragment key={key1}>
            {accounts[value].length > 0 &&
              accounts[value].map((j, k) => {
                return (
                  <>
                    {/* ACCOUNT */}

                    {j.status === 'connected' && (
                      <>
                        <div className="accounts__connected">
                          <label className="accounts__list--item ">
                            <div className="accounts__img--container">
                              {value.indexOf('others') === -1 && (
                                <img
                                  src={
                                    '/images/accounts/' +
                                    updateKey(value.replace('manual_', '')) +
                                    '.png'
                                  }
                                  alt={updateKey(value)}
                                  className={
                                    'accounts__img ' +
                                    updateKey(value.replace('manual_', ''))
                                  }
                                />
                              )}
                              {value.indexOf('others') !== -1 && (
                                <span>{value}</span>
                              )}
                            </div>
                            <div className="accounts__list--name">
                              {value.indexOf('manual') !== -1 && <>{value}</>}
                              {value.indexOf('manual') === -1 && (
                                <>{accounts[value][k].name}</>
                              )}
                            </div>
                            <div className="accounts__list--actions" />
                          </label>
                        </div>

                        {/* CHILDREN */}
                        {j.children !== undefined && j.children.length > 0 && (
                          <ul className="accounts__list--views--ul">
                            {/* LEVEL 1 */}
                            {j.child_levels === 1 && (
                              <>
                                {j.children.map((k) => {
                                  return (
                                    <>
                                      {k.selected && (
                                        <li className="accounts__list--views">
                                          <div className="accounts__list--views--container">
                                            <span className="account">
                                              {k.external_name}
                                            </span>
                                          </div>
                                        </li>
                                      )}
                                    </>
                                  )
                                })}
                              </>
                            )}

                            {/* LEVEL 3 */}
                            {j.child_levels >= 1 &&
                              j.children.map((i) => {
                                return (
                                  <Fragment key={i}>
                                    {evaluateChildrensSelected(i) && (
                                      <>
                                        {i.children !== undefined &&
                                          i.children.length > 0 &&
                                          i.children.map((j) => {
                                            return (
                                              <Fragment key={j}>
                                                {evaluateChildrensSelected(
                                                  j,
                                                ) && (
                                                  <li className="accounts__list--views">
                                                    <div
                                                      key={j}
                                                      className="accounts__list--views--container"
                                                    >
                                                      <span className="account">
                                                        {i.external_name}
                                                        <div className="accounts__list--spacer" />
                                                      </span>
                                                      <span className="property">
                                                        {j.external_name}

                                                        {j.children !==
                                                          undefined &&
                                                          j.children.length >
                                                            0 && (
                                                            <div className="accounts__list--spacer" />
                                                          )}
                                                      </span>

                                                      {j.children !==
                                                        undefined && (
                                                        <div className="view">
                                                          {j.children.length >
                                                            0 &&
                                                            j.children.map(
                                                              (k) => {
                                                                return (
                                                                  <Fragment
                                                                    key={k}
                                                                  >
                                                                    {k.selected && (
                                                                      <div>
                                                                        {
                                                                          k.external_name
                                                                        }
                                                                      </div>
                                                                    )}
                                                                  </Fragment>
                                                                )
                                                              },
                                                            )}
                                                        </div>
                                                      )}
                                                    </div>
                                                  </li>
                                                )}
                                              </Fragment>
                                            )
                                          })}
                                      </>
                                    )}
                                  </Fragment>
                                )
                              })}
                          </ul>
                        )}
                      </>
                    )}
                  </>
                )
              })}
          </Fragment>
        )
      })}

      {empty && (
        <div className="table__no-info">
          {translate('components.admin_accounts_items')}
        </div>
      )}
    </div>
  )
}

export default withAuthenticationRequired(AccountsItems, {
  Redirecting: () => <Loading />,
})
