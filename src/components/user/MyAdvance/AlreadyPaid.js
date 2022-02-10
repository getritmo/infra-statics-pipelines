import React, { Fragment } from 'react'
import ReactTooltip from 'react-tooltip'
import { getFormat } from '../../../data/data'
import translate from '../../../i18n/translate'
import PropTypes from 'prop-types'

export const AlreadyPaid = ({
  alreadyPayed,
  percentageAlreadyPayed,
  paymentsAmount,
}) => {
  return (
    <Fragment>
      {percentageAlreadyPayed !== 0 && (
        <div
          data-tip
          data-for="percentageAlreadyPayed"
          className={'table-graph__cell colored already-paid'}
          style={{ width: percentageAlreadyPayed + '%' }}
        >
          <ReactTooltip
            id="percentageAlreadyPayed"
            aria-haspopup="true"
            role="example"
            effect="solid"
            delayShow={100}
            className={'tooltip__cashflow'}
          >
            <div className={'tooltip__cashflow--row'}>
              <div>
                {translate('views.my_advances.refunded.value', {
                  paymentsAmount: paymentsAmount,
                  amount: getFormat(alreadyPayed, 'euro'),
                })}
              </div>
            </div>
          </ReactTooltip>
          <div className="table-graph__explanation" />
        </div>
      )}
    </Fragment>
  )
}
AlreadyPaid.propTypes = {
  alreadyPayed: PropTypes.number.isRequired,
  percentageAlreadyPayed: PropTypes.number.isRequired,
  paymentsAmount: PropTypes.number.isRequired,
}

export default AlreadyPaid
