import React from 'react'
import translate from '../../../i18n/translate'

const ConversionRateInfo = () => {
  return (
    <p>
      {translate('components.conversionRate_info.p1')}
      <br />
      {translate('components.conversionRate_info.p2')}
    </p>
  )
}

export default ConversionRateInfo
