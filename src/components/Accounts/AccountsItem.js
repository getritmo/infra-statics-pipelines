import React, { Fragment } from 'react'
import translate from '../../i18n/translate'
import { useIntl } from 'react-intl'
import Moment from 'react-moment'
import 'moment/locale/es'
import 'moment/locale/en-gb'
import { updateKey, messages, preventDefault } from './../../data/data'
import ReactTooltip from 'react-tooltip'
import useAsyncActions from 'hooks/useAsyncActions'

const AccountsItem = (props) => {
  const { accountId, connector } = props
  const userItem = props.userItem
  const { formatMessage, locale } = useIntl()
  const { openPanelAccount, removeAccount } = useAsyncActions()

  Moment.globalLocale = locale.substring(0, 2)

  const handleOpenPanelAccount = (connector, item) => {
    openPanelAccount(connector, item)
  }

  const handleRemoveAccount = (e, connector, connectorId) =>
    removeAccount(e, connector, connectorId)

  return (
    <Fragment key={accountId}>
      {userItem.status !== 'auth_pending' && (
        <div id={accountId} className={'accounts__connected'}>
          {!props.typeGraph && (
            <ReactTooltip
              id="account-status"
              aria-haspopup="true"
              role="example"
              effect="solid"
              delayShow={100}
              className={'tooltip__accountitem'}
              data-offset="{'top': 10, 'left': 10}"
              backgroundColor={'#fbfcea'}
              textColor={'#000'}
              border={true}
              borderColor={'#ccc'}
            >
              <div className="tooltip__content--title">
                {formatMessage({
                  id: 'components.accounts_item.connection_status',
                })}
              </div>
              <div className="tooltip__content--text">
                {formatMessage({
                  id: `components.accounts_item.${userItem.status}`,
                })}
              </div>
            </ReactTooltip>
          )}
          <div
            className="accounts__list--item"
            data-account={connector}
            data-view={accountId}
            onClick={() => {
              handleOpenPanelAccount(updateKey(connector), userItem)
            }}
          >
            <div className={'accounts__img--container ' + connector}>
              {connector.indexOf('openbanking') !== -1 && (
                <img
                  src={
                    'https://www.afterbanks.com/api/icons/' +
                    userItem.name +
                    '.png'
                  }
                  alt={connector}
                  className={'accounts__img ' + userItem.name}
                />
              )}
              {connector.indexOf('openbanking') === -1 &&
                connector.indexOf('others') === -1 && (
                  <img
                    src={'/images/accounts/' + updateKey(connector) + '.png'}
                    alt={updateKey(connector)}
                    className={'accounts__img ' + updateKey(connector)}
                  />
                )}
              {connector.indexOf('openbanking') === -1 &&
                connector.indexOf('others') !== -1 && (
                  <div>
                    {translate('components.accounts_item.other_accounts')}
                  </div>
                )}
            </div>

            <div className="accounts__list--name">{userItem.name}</div>

            {props.showSync &&
              userItem.status === 'connected' &&
              userItem.name !== undefined && (
                <div className="accounts__list--sync">
                  {userItem.last_sync !== 0 &&
                    userItem.last_sync !== undefined && (
                      <>
                        <div className="help mobile-visible">
                          <span className="desktop-visible">
                            {translate('common.synched')}{' '}
                          </span>
                          <Moment fromNow unix>
                            {userItem.last_sync}
                          </Moment>
                        </div>
                        <img
                          src="/images/svg/synched-icon.svg"
                          alt="sync"
                          className="accounts__list--sync--img"
                        />
                        <span className="desktop-visible">
                          <span>{translate('common.synched')} </span>
                          <Moment fromNow unix>
                            {userItem.last_sync}
                          </Moment>
                        </span>
                      </>
                    )}

                  {(userItem.last_sync === 0 ||
                    userItem.last_sync === undefined) && (
                    <>
                      <img
                        src="/images/svg/sync-icon-orange.svg"
                        alt="sync"
                        className="accounts__list--sync--img--animated"
                      />
                      <span className="desktop-visible">
                        {translate('common.synchronizing.title')}
                      </span>
                    </>
                  )}
                </div>
              )}

            <div
              data-tip
              data-for="account-status"
              className={
                'accounts__list--status ' +
                (userItem.status === 'connected'
                  ? props.showSync && userItem.last_sync === 0
                    ? 'source_pending'
                    : userItem.status
                  : userItem.status)
              }
            >
              {/* <div className="help">
                <div className="help__title">
                  {formatMessage({
                    id: 'components.accounts_item.connection_status',
                  })}
                </div>
                {formatMessage({
                  id: `components.accounts_item.${userItem.status}`,
                })}
              </div> */}
              {props.typeGraph && (
                <>
                  {userItem.status === 'connected' &&
                    userItem.last_sync === 0 && (
                      <div className="help">
                        {translate('common.synchronizing.help')}
                      </div>
                    )}
                  {userItem.last_sync !== 0 &&
                    userItem.last_sync !== undefined && (
                      <div className="help">
                        {translate(messages[props.typeGraph][connector])}
                      </div>
                    )}
                </>
              )}
            </div>

            {props.hideActions !== false && (
              <div className="accounts__list--actions" onClick={preventDefault}>
                <span />
                <span />
                <span />

                <ul className="accounts__list--actions--items">
                  {connector === 'googleanalytics' &&
                    connector === 'facebookads' && (
                      <li className="accounts__list--actions--item">
                        <button
                          data-account={connector}
                          onClick={(e) => {
                            handleOpenPanelAccount(
                              e,
                              updateKey(connector),
                              userItem,
                            )
                          }}
                        >
                          <div>
                            {translate('components.accounts_item.add_view')}
                          </div>
                          <div className="add-view-icon" />
                        </button>
                      </li>
                    )}
                  <li className="accounts__list--actions--item">
                    <button
                      data-account={connector}
                      data-id={accountId}
                      onClick={(e) => {
                        handleRemoveAccount(e, connector, accountId)
                      }}
                    >
                      <div>{translate('common.delete')}</div>
                      <div className="delete-icon" />
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {userItem.children !== undefined && userItem.children.length > 0 && (
            <ul className="accounts__list--views--ul">
              {userItem.children.map((value_child, key_children) => {
                const accountItem = userItem.children[key_children]
                return (
                  <Fragment key={key_children}>
                    {accountItem.children === undefined &&
                      accountItem.selected && (
                        <li className="accounts__list--views">
                          <div className="accounts__list--views--container">
                            <span className="account">
                              {accountItem.external_name}
                            </span>
                          </div>
                        </li>
                      )}

                    {accountItem.children !== undefined &&
                      accountItem.children.map((property, key_property) => {
                        const propertyItem = accountItem.children[key_property]

                        return (
                          <Fragment key={key_property}>
                            <>
                              {propertyItem.children.map((view, key_view) => {
                                const viewItem = propertyItem.children[key_view]

                                return (
                                  <Fragment key={key_view}>
                                    {viewItem.selected && (
                                      <li className="accounts__list--views">
                                        <div className="accounts__list--views--container">
                                          <span className="account">
                                            {accountItem.external_name}
                                            <span className="accounts__list--spacer" />
                                          </span>
                                          <span className="property">
                                            {propertyItem.external_name}
                                            <span className="accounts__list--spacer" />
                                          </span>
                                          <span className="view">
                                            {viewItem.external_name}
                                          </span>
                                        </div>
                                      </li>
                                    )}
                                  </Fragment>
                                )
                              })}
                            </>
                          </Fragment>
                        )
                      })}
                  </Fragment>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </Fragment>
  )
}

export default AccountsItem
