import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import AvailableManualAccounts from './AvailableManualAccounts'
import {
  accountsFinanceManual,
  accountsManualMarketing,
  accountsManualSales,
  getCookie,
} from '../../data/data'

import translate from '../../i18n/translate'
import ConnectAccounts from './ConnectAccounts/ConnectAccounts'
import { useSelector } from 'react-redux'
import { CustomButton } from 'components/UI'
// Variable to store the updated connector - not using UseState
const Accounts = ({ type, submitContinue }) => {
  const {
    appData: {
      application: { accounts = undefined, application_id },
    },
  } = useSelector((state) => state)

  const isPublic = getCookie('special-content')
  let manualAccountsIsActive = false

  const connectorsManual = {
    finance: accountsFinanceManual,
    mkt: accountsManualMarketing,
    sales: accountsManualSales,
  }

  if (accounts && connectorsManual[type] !== undefined) {
    for (let i = 0; i < connectorsManual[type].length; i++) {
      if (
        accounts?.[connectorsManual[type][i]] !== undefined &&
        accounts?.[connectorsManual[type][i]].length > 0
      ) {
        manualAccountsIsActive = true
      }
    }
  }

  return (
    <>
      {accounts && manualAccountsIsActive && (
        <section className={`${type} accounts__section`}>
          <h3 className="accounts__title">
            {translate(
              `components.accounts_accounts.${
                type === 'finance' ? 'finance_shared' : 'finance_read'
              }`,
            )}
          </h3>
          <p>{translate(`components.accounts_accounts.${type}_access`)}</p>
          <div className="accounts__manual-list">
            {accounts && connectorsManual[type] && (
              <>
                {connectorsManual[type].map((key) => {
                  return (
                    <Fragment key={key}>
                      {accounts[key].length > 0 && (
                        <AvailableManualAccounts item={key} />
                      )}
                    </Fragment>
                  )
                })}
              </>
            )}
          </div>
        </section>
      )}

      {application_id && (
        <ConnectAccounts
          showAvailableAccounts
          showConnectedAccounts
          showSync={false}
          type={type}
        />
      )}

      {!isPublic && (
        <div className="accounts__submit">
          <CustomButton
            type="button"
            onClick={submitContinue}
            label={translate('common.Continue')}
          />
        </div>
      )}
    </>
  )
}

Accounts.propTypes = {
  type: PropTypes.oneOf(['finance', 'mkt', 'sales']).isRequired,
  submitContinue: PropTypes.func.isRequired,
}

export default Accounts
