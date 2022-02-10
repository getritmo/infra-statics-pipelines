import React from 'react'
import translate from '../../../i18n/translate'

const TransactionsInfo = () => {
  return (
    <p>
      {translate('components.transactions_info.p1')}
      <br />
      {translate('components.transactions_info.p2')}
      <br />
      {translate('components.transactions_info.p3')}
    </p>
  )
}

export default TransactionsInfo
