import React from 'react'
import translate from '../../../i18n/translate'

const RevenueInfo = () => {
  return (
    <p>
      {translate('components.revenue_info.p1')}
      <br />
      {translate('components.revenue_info.p2')}
      <br />
      {translate('components.revenue_info.p3')}
    </p>
  )
}

export default RevenueInfo
