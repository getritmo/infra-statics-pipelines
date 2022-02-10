import React, { useContext } from 'react'
import { CustomButton } from 'components/UI'
import { useSelector, useDispatch } from 'react-redux'
import translate from '../../../../i18n/translate'
import FinanceFilesContainer from './FinanceFilesContainer'
import { openPanel, setOverlay } from 'actions/global'
import classNames from 'classnames'
import { RutterContext } from 'context/RutterContext'
import useAsyncActions from 'hooks/useAsyncActions'

const ConnectFinanceAccounts = () => {
  const {
    application: {
      accounts: { openbanking, openbanking_uk },
      stages: {
        company_details: { country },
        finance: { bank_statement, finance },
      },
    },
  } = useSelector((state) => state.appData)

  const openbankingAccounts = [
    ...openbanking.map((account) => ({ ...account, country: 'ES' })),
    ...openbanking_uk.map((account) => ({ ...account, country: 'GB' })),
  ]

  const dispatch = useDispatch()
  const { removeAccount, startsConnection } = useAsyncActions()

  const { openRutter } = useContext(RutterContext)

  const handleOpenUploadPanel = (subtype) => {
    dispatch(
      openPanel({
        type: 'upload',
        subtype,
        mode: 'create',
      }),
    )
  }

  const handleOpenbankingES = (e) => {
    startsConnection(e, { connector: 'openbanking' }, openRutter)
  }

  const handleOpenbankingGB = () => {
    dispatch(setOverlay({ open: true, type: 'openbankingUk' }))
  }

  const handleOpenbanking = {
    ES: handleOpenbankingES,
    GB: handleOpenbankingGB,
  }

  return (
    <>
      <section className="accounts__section--finance">
        <div className="accounts__section--finance-buttons">
          <div
            className={classNames('accounts__list', {
              ['user-finance-view']: country !== 'ES',
            })}
          >
            {country !== 'ES' && country !== 'GB' ? (
              <>
                <h3 className="accounts__title">
                  {translate(
                    'components.accounts_accounts.upload_bank_statement',
                  )}
                </h3>
                <CustomButton
                  label={translate(
                    'components.accounts_accounts.upload_bank_statement',
                  )}
                  onClick={() => handleOpenUploadPanel('bankStatement')}
                  position="none"
                  classes={'btn-finance-user'}
                />
                <FinanceFilesContainer
                  type="bankStatement"
                  files={bank_statement.files}
                />
              </>
            ) : (
              <>
                <h3 className="accounts__title">
                  {translate('components.accounts_accounts.banking')}
                </h3>
                <CustomButton
                  label={translate(
                    'components.accounts_accounts.cta_openbanking',
                  )}
                  onClick={handleOpenbanking[country]}
                  position="none"
                  classes={'btn-finance-user btn-openbanking'}
                />
                {openbankingAccounts.length > 0 && (
                  <section className="accounts__section--openbanking">
                    <h3 className="accounts__title">
                      {translate(
                        'components.accounts_accounts.banking_connected',
                      )}
                    </h3>
                    <div className="accounts__list banks">
                      {openbankingAccounts.map((i, key) => {
                        const nameImage = i.name.split('_')
                        return (
                          <div
                            key={key}
                            className="accounts__list--round"
                            data-account={i.id}
                          >
                            <div
                              className={classNames(
                                'accounts__list--img--container',
                                'banks',
                              )}
                            >
                              <img
                                src={
                                  i.country === 'ES'
                                    ? `https://www.afterbanks.com/api/icons/${nameImage[0]}.min.png`
                                    : `https://static.codat.io/public/platforms/${i.name}.png`
                                }
                                alt={i.name}
                                className={classNames('accounts__list--img', {
                                  openbanking_uk: i.country === 'GB',
                                })}
                              />
                              <button
                                data-account={key}
                                data-id={i.id}
                                onClick={(e) => {
                                  removeAccount(
                                    e,
                                    i.country === 'ES'
                                      ? 'openbanking'
                                      : 'openbanking_uk',
                                    i.id,
                                  )
                                }}
                                className="accounts__list--remove"
                              >
                                <div className="delete-icon" />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      <div className=" accounts__section">
        <h3 className="accounts__title">
          {translate('components.accounts_accounts.upload_finance_documents')}
        </h3>
        <CustomButton
          label={translate(
            'components.accounts_accounts.upload_finance_documents',
          )}
          onClick={() => handleOpenUploadPanel('financeDocuments')}
          position="none"
          classes={'btn-finance-user'}
        />
        <FinanceFilesContainer type="financeDocuments" files={finance.files} />
      </div>
    </>
  )
}

export default ConnectFinanceAccounts
