import React, { useCallback } from 'react'
import RevenueInfo from '../../admin/info/RevenueInfo'
import TransactionsInfo from '../../admin/info/TransactionsInfo'
import MarketingSpendInfo from '../../admin/info/MarketingSpendInfo'
import SessionsInfo from '../../admin/info/SessionsInfo'
import AovInfo from '../../admin/info/AovInfo'
import BlendedRoasInfo from '../../admin/info/BlendedRoasInfo'
import ConversionRateInfo from '../../admin/info/ConversionRateInfo'
import translate from '../../../i18n/translate'
import AccountsRI from '../../ritmoInsights/AccountsRI'
import { RIConnectorsByType } from '../../../data/data'
import AvailableAccounts from '../../Accounts/AvailableAccounts'
import { useSelector, useDispatch } from 'react-redux'
import { setOverlay } from 'actions/global'
import useAsyncActions from 'hooks/useAsyncActions'

const PanelRI = (props) => {
  const {
    appData: {
      application: { application_id, accounts = {} },
    },
    globalState: {
      panel: {
        panelRI: { open = false, type = '' },
      },
    },
  } = useSelector((state) => state)

  const dispatch = useDispatch()
  const { openPanelAccount, closePanelRI } = useAsyncActions()

  // Opens the right panel from the tooltips
  const openAccountPanel = useCallback(
    (e, connector, item) => {
      openPanelAccount(connector, item)
    },
    [openPanelAccount],
  )

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
    // setTriggerSource(source)
  }

  // Closes the Right panel unsetting the Account & Property selected
  const closePanel = () => {
    document.querySelector('.panel').classList.add('fade-out')

    setTimeout(() => {
      closePanelRI()
    }, 500)
  }

  // Prevents the propagation in an item
  const preventClose = (e) => {
    e.stopPropagation()
  }

  if (!open) return null

  return (
    <section id="panel" className={'panel ' + type}>
      <div className="panel__blackout" onClick={closePanel} />
      <div className="panel__container" onClick={preventClose}>
        <div className="panel__container--cell">
          <div className="panel__img--container">
            <div className="panel__main-title">
              <b>{translate('components.kpi.' + type + '.long_title')}</b>
            </div>
            <div className="panel__close" onClick={closePanel} />
          </div>

          <div className="panel__content--scroll--wrapper">
            <h2 className="panel__title">
              {translate('components.' + type + '_info.title')}
            </h2>

            <div className="panel__content--scroll">
              <div className="panel__content--scroll--content">
                <div className="panel__content--scroll--wrapper">
                  {(type === 'customers' ||
                    type === 'ltv' ||
                    type === 'ltv_cac' ||
                    type === 'ltv_cohorts' ||
                    type === 'cac' ||
                    type === 'balanceCashFlow' ||
                    type === 'percentage_first_retention' ||
                    type === 'percentage_retention') && (
                    <p>{translate('components.' + type + '_info.p1')}</p>
                  )}

                  {type === 'revenue' && <RevenueInfo accounts={accounts} />}
                  {type === 'sessions' && <SessionsInfo accounts={accounts} />}
                  {type === 'marketingSpend' && (
                    <MarketingSpendInfo accounts={accounts} />
                  )}
                  {type === 'transactions' && (
                    <TransactionsInfo accounts={accounts} />
                  )}
                  {type === 'aov' && <AovInfo accounts={accounts} />}
                  {type === 'blendedRoas' && (
                    <BlendedRoasInfo accounts={accounts} />
                  )}
                  {type === 'conversionRate' && (
                    <ConversionRateInfo accounts={accounts} />
                  )}

                  <AccountsRI
                    connectors={RIConnectorsByType[type]}
                    accounts={accounts}
                    typeGraph={type}
                    removeAccount={handleRemoveAccount}
                    openPanelAccount={openAccountPanel}
                    setPanelActive={props.setPanelActive}
                  />

                  <section className="accounts__section">
                    {/*
                                            <h3 className="accounts__title">{translate('components.accounts_accounts.available_accounts')}</h3> */}
                    <div className="">
                      {RIConnectorsByType[type].criteria === 'at_least_one' && (
                        <>
                          <div className="accounts__title-accounts">
                            {translate(
                              'components.' + type + '_info.title_list_' + 0,
                            )}
                          </div>
                          <div className="accounts">
                            {RIConnectorsByType[type].items.map(
                              (item, index) => {
                                return (
                                  <AvailableAccounts
                                    key={`at-least-one-${index}`}
                                    item={item}
                                  />
                                )
                              },
                            )}
                          </div>
                        </>
                      )}
                      {RIConnectorsByType[type].criteria === 'or_and' &&
                        RIConnectorsByType[type].items.map((index, j) => {
                          return (
                            <div key={index}>
                              {typeof index === 'object' && (
                                <>
                                  <div className="accounts__title-accounts">
                                    {translate(
                                      `components.${type}_info.title_list_${j}`,
                                    )}
                                  </div>
                                  <div className="accounts">
                                    {index.map((item, index) => {
                                      return (
                                        <AvailableAccounts
                                          key={`or-and-${index}`}
                                          item={item}
                                        />
                                      )
                                    })}
                                  </div>
                                </>
                              )}
                              {typeof index === 'string' && (
                                <>
                                  <div className="accounts__title-accounts">
                                    {translate(
                                      'components.' +
                                        type +
                                        '_info.title_list_' +
                                        0,
                                    )}
                                  </div>
                                  <AvailableAccounts item={index} />
                                </>
                              )}
                            </div>
                          )
                        })}
                    </div>
                  </section>
                  {(type === 'customers' ||
                    type === 'ltv' ||
                    type === 'ltv_cac' ||
                    type === 'ltv_cohorts' ||
                    type === 'percentage_first_retention' ||
                    type === 'percentage_retention' ||
                    type === 'cac') && (
                    <div>
                      <p className="panel__content--more-info">
                        {translate('common.More_information')}
                      </p>
                      <p>
                        {translate('components.' + type + '_info.more_info', {
                          icon: <span className="panel__content--help-icon" />,
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PanelRI
