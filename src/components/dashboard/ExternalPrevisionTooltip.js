import React from 'react'
import { getFormat } from '../../data/data'
import translate from '../../i18n/translate'

export const ExternalTooltip = (props) => {
  // Tooltip Element
  const dataInitial = props.dataInitial
  const type = 'type_' + dataInitial.id

  return (
    <div className="tooltip">
      <div id={type + '__data0'} className="tooltip__row first">
        <div id={type + '__data0_label'} className="tooltip__label first">
          {dataInitial ? dataInitial.label : ''}
        </div>
      </div>
      <div id={type + '__data0'} className="tooltip__row first">
        <div className="tooltip__value green">
          {translate('components.external_prevision_tooltip.main_forecast')}
          &nbsp;
          <span id={type + '__data0_value'}>
            {dataInitial
              ? getFormat(dataInitial.value, dataInitial.format)
              : ''}
          </span>
        </div>
      </div>

      <div id={type + '__data1'} className="tooltip__row">
        {/* <div id={type + "__data1_label"} className="tooltip__label">
                    {dataInitial ? dataInitial.label_prev : ''}
                </div> */}
        <div className="tooltip__value  hidden">
          Min - Max:{' '}
          <span id={type + '__data1_value'}>
            {dataInitial
              ? getFormat(dataInitial.value_prev, dataInitial.format)
              : ''}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ExternalTooltip
