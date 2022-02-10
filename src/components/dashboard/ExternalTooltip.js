import React, { Fragment } from 'react'
import { getFormat } from '../../data/data'

export const ExternalTooltip = ({ dataInitial, currency }) => {
  // Tooltip Element
  const type = 'type_' + dataInitial.id

  return (
    <div className="tooltip">
      <div id={type + '__data0'} className="tooltip__row first">
        <div id={type + '__data0_label'} className="tooltip__label first">
          {dataInitial ? dataInitial.label : ''}
        </div>
        <div id={type + '__data0_value'} className="tooltip__value first">
          {dataInitial.value !== '--'
            ? getFormat(dataInitial.value, dataInitial.format, false, currency)
            : ''}
        </div>

        {dataInitial.percentage && (
          <div
            id={type + '__data0_percentage'}
            className={
              'tooltip__percentage ' +
              (dataInitial.percentage !== '--' &&
              dataInitial.percentage !== undefined
                ? parseFloat(dataInitial.percentage) > 0
                : '')
            }
          >
            {dataInitial.percentage !== '--' ? dataInitial.percentage : ''}
          </div>
        )}
      </div>

      <div id={type + '__data1'} className="tooltip__row">
        {dataInitial.label_prev && (
          <>
            <div id={type + '__data1_label'} className="tooltip__label">
              {dataInitial ? dataInitial.label_prev : ''}
            </div>
            <div id={type + '__data1_value'} className="tooltip__value">
              {dataInitial.value_prev !== '--'
                ? getFormat(
                    dataInitial.value_prev,
                    dataInitial.format,
                    false,
                    currency,
                  )
                : ''}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ExternalTooltip
