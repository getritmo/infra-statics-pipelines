import React from 'react'
import FinanceIcon from 'components/UI/Icons/FinanceIcon'
import translate from 'i18n/translate'
import { accountsFinance, accountsFinanceManual } from 'data/data'
import AccountsItems from 'components/Accounts/AccountsItems'
import AccountsItemsManual from 'components/admin/AccountsItemsManual'
import FinanceFilesContainerAdmin from './FinanceFilesContainerAdmin'
import { LoadingMin } from 'components/Loading'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

const Finance = ({ company, bankStatementFiles, financeDocumentsFiles }) => {
  const {
    application: { accounts },
  } = useSelector((state) => state.appData)

  const { openbanking, openbanking_uk } = accounts

  const openbankingAccounts = [
    ...openbanking.map((account) => ({ ...account, country: 'ES' })),
    ...openbanking_uk.map((account) => ({ ...account, country: 'GB' })),
  ]

  if (!company) {
    return (
      <section className="accounts__section admin">
        <h2 className="layout-app__title">
          <FinanceIcon classes="image-icon" />
          <span>{translate('views.company_item.finance_accounts')}</span>
        </h2>
        <LoadingMin />
      </section>
    )
  }

  return (
    <section className="accounts__section admin">
      <h2 className="layout-app__title">
        <FinanceIcon classes="image-icon" />
        <span>{translate('views.company_item.finance_accounts')}</span>
      </h2>
      <section className="accounts__section">
        <FinanceFilesContainerAdmin
          country={company.country}
          bankStatementFiles={bankStatementFiles}
          financeDocumentsFiles={financeDocumentsFiles}
        />
      </section>
      <section className="accounts__section">
        <h3 className="accounts__title">
          {translate('views.company_item.banking_accounts')}
        </h3>
        {openbankingAccounts.length > 0 && (
          <div className="accounts__list banks">
            {openbankingAccounts.map((i, key) => {
              const nameImage = i.name.split('_')
              return (
                <div
                  key={key}
                  className="accounts__list--round"
                  data-account={i.id}
                >
                  <div className="accounts__list--img--container banks">
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
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {openbankingAccounts.length === 0 && (
          <div className="table__no-info">
            {translate('views.company_item.no_banking')}
          </div>
        )}
      </section>

      <AccountsItemsManual
        accounts={accounts}
        accountsArray={accountsFinanceManual}
      />

      <AccountsItems
        showSync
        typeGraph={false}
        connectors={accountsFinance}
        hideActions={false}
      />
    </section>
  )
}

export default Finance
