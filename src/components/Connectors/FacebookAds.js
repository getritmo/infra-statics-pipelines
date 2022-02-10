import React, { Fragment } from 'react'
import translate from '../../i18n/translate'
import FaqInfo from './FaqInfo'
import PanelLastSync from '../PanelLastSync'
import useAsyncActions from 'hooks/useAsyncActions'

const FacebookAds = ({
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

  return (
    <div className="panel__content--scroll--wrapper">
      <h2 className="panel__title">
        {translate('components.facebookads.header')}
      </h2>

      {panelAccount.children === undefined && (
        <div className="panel__content--scroll">
          <PanelLastSync panelAccount={panelAccount} />
          <div className="panel__content--scroll--content">
            <p>
              {translate('components.facebookads.content1')}
              {translate('components.facebookads.content2')}
              <br />
              <br />
              <br />
              <br />
              {translate('components.facebookads.content3')}
              <br />
            </p>
            <ul>
              <li>
                {translate('components.facebookads.content4')}
                <div>
                  <ul>
                    <li>{translate('components.facebookads.content5')}</li>
                  </ul>
                </div>
              </li>
              <li>
                {translate('components.facebookads.content6')}
                <div>
                  <ul>
                    <li>{translate('components.facebookads.content7')}</li>
                    <li>{translate('components.facebookads.content8')}</li>
                  </ul>
                </div>
              </li>
              <li>
                {translate('components.facebookads.content9')}
                <div>
                  <ul>
                    <li>{translate('components.facebookads.content10')}</li>
                    <li>{translate('components.facebookads.content11')}</li>
                  </ul>
                </div>
              </li>
              <li>Píxel</li>
            </ul>
            <p>
              <a
                href="https://www.facebook.com/business/help/1717412048538897?id=2190812977867143"
                className="link link__full"
                target="_blank"
                rel="noopener noreferrer"
              >
                {translate('components.facebookads.content12')}
              </a>{' '}
              {translate('components.facebookads.content13')}
            </p>
            <p>
              {translate('components.facebookads.content14')}{' '}
              <a
                href="https://es-la.facebook.com/help/148233965247823"
                target="_blank"
                rel="noopener noreferrer"
                className="link link__full"
              >
                {translate('components.facebookads.content15')}
              </a>
              ,{translate('components.facebookads.content16')}
              <br />
              <br />
            </p>

            <a
              href={host + 'images/accounts/fas/fas_1.jpg'}
              target="_blank"
              rel="noopener noreferrer"
              className="panel__images"
            >
              <img
                src={host + 'images/accounts/fas/fas_1.jpg'}
                alt=""
                title="Haz click para agrandar"
              />
            </a>
          </div>
          <FaqInfo />
        </div>
      )}

      {panelAccount.children !== undefined && (
        <div className="panel__content--scroll">
          <div className="panel__content--scroll--content">
            <div className="panel__content--scroll--wrapper">
              {panelAccount && (
                <>
                  <div className="panel__user">{panelAccount.name}</div>

                  {panelAccount.children !== undefined && (
                    <>
                      <div className="panel__content--info">
                        {!activeAccount && !activeProperty && (
                          <>{translate('components.facebookads.content17')}</>
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
                        <div className="panel__content--step">
                          <div className="panel__content--resume">
                            {translate(
                              panelAccount.children?.length === 1
                                ? 'common.AccountNumber'
                                : 'common.AccountsNumber',
                              { number: panelAccount.children?.length || 0 },
                            )}
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
                                                panelAccount.id,
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
                    startsConnection(e, { connector: 'facebookads' })
                  }}
                >
                  {translate('components.facebookads.content18')}
                </button>
              </div>

              {showCloseError && (
                <div className="panel__accounts error">
                  <span>
                    {translate('components.facebookads.no_property', {
                      link: (
                        <span
                          className="link link__full"
                          onClick={(e) => {
                            removeAccount(e, 'facebookads', panelAccount.id)
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
    </div>
  )
}

export default FacebookAds
