import React, { Fragment } from 'react'
import translate from '../../i18n/translate'
import FaqInfo from './FaqInfo'
import PanelLastSync from '../PanelLastSync'
import classNames from 'classnames'
import useAsyncActions from 'hooks/useAsyncActions'

const GoogleAnalytics = ({
  panelAccount,
  activeAccount,
  activeProperty,
  goToAccount,
  goToProperty,
  updateView,
  setActiveAccount,
  setActiveProperty,
  showCloseError,
  hideCloseError,
  checkIfHasViews,
}) => {
  const { removeAccount, startsConnection } = useAsyncActions()

  return (
    <div className="panel__content--scroll--wrapper">
      <h2 className="panel__title">
        {translate('components.google_analytics.header')}
      </h2>
      <div className="panel__content--scroll">
        <PanelLastSync panelAccount={panelAccount} />
        <div className="panel__content--scroll--content">
          {panelAccount && (
            <>
              <div className="panel__user">{panelAccount.name}</div>

              <>
                <div className="panel__content--info">
                  {!activeAccount && !activeProperty && (
                    <>{translate('common.select_account')}</>
                  )}
                  {(activeAccount || activeProperty) && (
                    <>
                      <div
                        className="panel__previous"
                        onClick={activeProperty ? goToProperty : goToAccount}
                      />

                      <div
                        className="panel__content--info--value"
                        onClick={goToAccount}
                      >
                        {activeAccount?.external_name || ''}
                      </div>

                      {activeProperty && (
                        <span className="panel__content--spacer" />
                      )}
                      <div
                        className="panel__content--info--value"
                        onClick={goToProperty}
                      >
                        {activeProperty?.external_name || ''}
                      </div>
                    </>
                  )}
                </div>

                <div
                  className={classNames('panel__content', {
                    'step-1': activeAccount,
                    'step-2': activeProperty,
                  })}
                >
                  <div className="panel__content--step">
                    <div className="panel__content--resume">
                      {translate(
                        panelAccount.children?.length === 1
                          ? 'common.AccountNumber'
                          : 'common.AccountsNumber',
                        { number: panelAccount.children?.length || 0 },
                      )}
                    </div>
                    {checkIfHasViews() ? (
                      <ul>
                        {panelAccount.children.map((account, account_key) => {
                          return (
                            <Fragment key={account_key}>
                              {account.children[0] && (
                                <li
                                  onClick={() => {
                                    setActiveAccount(account)
                                    setActiveProperty(false)
                                  }}
                                >
                                  <span>{account.external_name}</span>
                                </li>
                              )}
                            </Fragment>
                          )
                        })}
                      </ul>
                    ) : (
                      <div className={'panel__content--step-box'}>
                        <p>
                          {translate('components.google_analytics.not_valid')}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="panel__content--step">
                    <div className="panel__content--resume">
                      {activeAccount && (
                        <>
                          {activeAccount.children.length} Propert
                          {activeAccount.children.length > 1 ? 'ies' : 'y'}
                        </>
                      )}
                    </div>
                    {activeAccount && (
                      <ul className="">
                        {activeAccount.children.map(
                          (property, property_key) => {
                            return (
                              <li
                                key={property_key}
                                onClick={() => {
                                  setActiveProperty(property)
                                }}
                              >
                                <span>{property.external_name}</span>
                              </li>
                            )
                          },
                        )}
                      </ul>
                    )}
                  </div>

                  <div className="panel__content--step">
                    <div className="panel__content--resume">
                      {activeProperty && (
                        <>
                          {activeProperty.children.length} View
                          {activeProperty.children.length > 1 ? 's' : ''}
                        </>
                      )}
                    </div>
                    {activeProperty && (
                      <ul>
                        {activeProperty.children.map((view, view_key) => {
                          return (
                            <li key={view_key}>
                              <div className="checkbox__container ">
                                <input
                                  type="checkbox"
                                  className="checkbox"
                                  id={'view_' + view.id}
                                  defaultChecked={view.selected}
                                  onClick={(e) => {
                                    if (e.target.checked && showCloseError) {
                                      hideCloseError()
                                    }
                                    updateView(e, panelAccount.id, view.id)
                                  }}
                                />
                                <label htmlFor={'view_' + view.id}>
                                  <span>{view.external_name}</span>
                                </label>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </>

              <div>
                <button
                  className="link link__full link__add"
                  data-id={panelAccount.id}
                  onClick={(e) => {
                    startsConnection(e, { connector: 'googleanalytics' })
                  }}
                >
                  {translate('components.google_analytics.add_google_account')}
                </button>
              </div>

              {showCloseError && (
                <div className="panel__accounts error">
                  <span className="pannel_accounts">
                    {translate('components.google_analytics.no_property', {
                      link: (
                        <span
                          className="link link__full"
                          onClick={(e) => {
                            removeAccount(e, 'googleanalytics', panelAccount.id)
                          }}
                        >
                          {translate('common.click_here')}
                        </span>
                      ),
                    })}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
        <FaqInfo />
      </div>
    </div>
  )
}

export default GoogleAnalytics
