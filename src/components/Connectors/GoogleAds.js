import React, { Fragment } from 'react'
import translate from '../../i18n/translate'
import FaqInfo from './FaqInfo'
import { updateKey, convertKey } from '../../data/data'
import PanelLastSync from './../PanelLastSync'
import useAsyncActions from 'hooks/useAsyncActions'

const GoogleAds = ({
  panelAccount,
  panelClass,
  activeAccount,
  activeProperty,
  goToAccount,
  goToProperty,
  updateView,
  showCloseError,
  hideCloseError,
}) => {
  const { removeAccount, startsConnection } = useAsyncActions()

  const host = process.env.REACT_APP_API_URL
  let accountLength = 0
  let accountSelected = 0

  return (
    <div className="panel__content--scroll--wrapper">
      <h2 className="panel__title">
        {translate('components.googleads.header')}
      </h2>

      {panelAccount.children !== undefined && (
        <div className="panel__content--scroll">
          <PanelLastSync panelAccount={panelAccount} />
          <div className="panel__content--scroll--content">
            <div className="panel__content--scroll--wrapper">
              {panelAccount && (
                <>
                  <div className="panel__user">{panelAccount.name}</div>

                  {panelAccount.children !== undefined && (
                    <>
                      <div className="panel__content--info">
                        {!activeAccount && !activeProperty && (
                          <>{translate('common.select_account')}</>
                        )}
                        {(activeAccount || activeProperty) && (
                          <>
                            <div
                              className="panel__previous"
                              onClick={
                                activeProperty ? goToProperty : goToAccount
                              }
                            />

                            <div
                              className="panel__content--info--value"
                              onClick={goToAccount}
                            >
                              {activeAccount ? activeAccount.external_name : ''}
                            </div>

                            {activeProperty && (
                              <span className="panel__content--spacer" />
                            )}
                            <div
                              className="panel__content--info--value"
                              onClick={goToProperty}
                            >
                              {activeProperty
                                ? activeProperty.external_name
                                : ''}
                            </div>
                          </>
                        )}
                      </div>

                      <div
                        className={
                          'panel__content' +
                          (activeAccount ? ' step-1' : '') +
                          (activeProperty ? ' step-2' : '')
                        }
                      >
                        {panelAccount.children.map((account, account_key) => {
                          accountLength++
                          return <Fragment key={account_key} />
                        })}

                        <div className="panel__content--step">
                          <div className="panel__content--resume">
                            {panelAccount.children.map(
                              (account, account_key) => {
                                accountSelected = 0
                                // eslint-disable-next-line no-lone-blocks
                                {
                                  accountSelected =
                                    account.selected !== undefined &&
                                    account.selected
                                      ? accountSelected + 1
                                      : accountSelected
                                }
                                return <div key={account_key + '__'} />
                              },
                            )}
                            {accountLength}{' '}
                            {translate('components.googleads.accounts')}{' '}
                            {accountSelected} {translate('common.selected')}
                          </div>
                          <ul className="">
                            {panelAccount.children.map(
                              (account, account_key) => {
                                return (
                                  <Fragment key={account_key}>
                                    {account !== undefined && (
                                      <li>
                                        <div className="checkbox__container ">
                                          <input
                                            type="checkbox"
                                            className="checkbox"
                                            id={'view_' + account.id}
                                            defaultChecked={account.selected}
                                            onClick={(e) => {
                                              if (
                                                e.target.checked &&
                                                showCloseError
                                              ) {
                                                hideCloseError()
                                              }
                                              updateView(
                                                e,
                                                convertKey(panelAccount.id),
                                                account.id,
                                              )
                                            }}
                                          />
                                          <label htmlFor={'view_' + account.id}>
                                            <span>{account.external_name}</span>
                                          </label>
                                        </div>
                                      </li>
                                    )}
                                  </Fragment>
                                )
                              },
                            )}
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              <div>
                <button
                  className="link link__full link__add"
                  data-id={panelClass}
                  onClick={(e) => {
                    startsConnection(e, {
                      connector: updateKey('googleads'),
                    })
                  }}
                >
                  {translate('components.googleads.add_google_account')}
                </button>
              </div>

              {showCloseError && (
                <div className="panel__accounts error">
                  <span>
                    {translate('components.googleads.no_property', {
                      link: (
                        <span
                          className="link link__full"
                          onClick={(e) => {
                            removeAccount(e, 'googleads', panelAccount.id)
                          }}
                        >
                          {translate('common.click_here')}
                        </span>
                      ),
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
          <FaqInfo />
        </div>
      )}

      {panelAccount.children === undefined && (
        <div className="panel__content--scroll">
          <div className="panel__content--scroll--content">
            <div>
              <p>{translate('components.googleads.content1')}</p>

              <p>{translate('components.googleads.content2')}</p>

              <p>{translate('components.googleads.content3')}</p>
              <br />

              <a
                href={host + 'images/accounts/gads/gads_3.jpeg'}
                target="_blank"
                rel="noopener noreferrer"
                title="Haz click para agrandar la imagen"
                className="panel__images"
              >
                <img
                  src={host + 'images/accounts/gads/gads_3.jpeg'}
                  alt=""
                  title="Haz click para agrandar"
                />
              </a>
            </div>
          </div>
          <FaqInfo />
        </div>
      )}
    </div>
  )
}

export default GoogleAds
