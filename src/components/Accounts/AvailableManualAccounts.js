import React, { Fragment } from 'react'
import translate from '../../i18n/translate'

const AvailableManualAccounts = (props) => {
  const item = props.item
  const index = props.item.replace('manual_', '')
  return (
    <div key={props.item} className={'accounts__manual ' + index}>
      {(item === 'manual_profitandloss' ||
        item === 'manual_balance' ||
        item === 'manual_bankingtransactions') && (
        <>
          {item === 'manual_profitandloss' && (
            <>
              <img
                src="/images/accounts/manual_profitandloss.svg"
                alt=""
                className="accounts__manual--image manual_profitandloss"
              />
              <span className="accounts__manual--text">
                {translate(
                  'components.available_manual_accounts.profit_and_loss',
                )}
              </span>
            </>
          )}
          {item === 'manual_balance' && (
            <>
              <img
                src="/images/accounts/manual_balance.svg"
                alt=""
                className="accounts__manual--image manual_balance"
              />
              <span className="accounts__manual--text">
                {translate('components.available_manual_accounts.balance')}
              </span>
            </>
          )}
          {item === 'manual_bankingtransactions' && (
            <>
              <img
                src="/images/accounts/manual_bankingtransactions.svg"
                alt="manual_bankingtransactions"
                className="accounts__manual--image manual_bankingtransactions"
              />
              <span className="accounts__manual--text">
                {translate(
                  'components.available_manual_accounts.banking_movements',
                )}
              </span>
            </>
          )}
        </>
      )}

      {item !== 'manual_profitandloss' &&
        item !== 'manual_balance' &&
        item !== 'manual_bankingtransactions' && (
          <>
            <img src={'/images/accounts/' + index + '.png'} alt={props.item} />
          </>
        )}
    </div>
  )
}

export default AvailableManualAccounts
