import React from 'react'
import { getFormat } from '../../data/data'
import translate from '../../i18n/translate'

export const ExternalTooltipGrowth = (props) => {
  // Tooltip Element
  const dataInitial = props.dataInitial
  const type = 'type_' + dataInitial.id

  return (
    <div className="tooltip">
      <div id={type + '__data0'} className="tooltip__row first">
        <div id={type + '__data0_label'} className="tooltip__label first">
          {dataInitial ? dataInitial.label : ''}
        </div>
        <div className="tooltip__value green">
          {translate('components.external_tooltip_growth.yty_growth')}{' '}
          <span id={type + '__data0_value'}>
            {dataInitial
              ? getFormat(dataInitial.value, dataInitial.format)
              : ''}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ExternalTooltipGrowth
