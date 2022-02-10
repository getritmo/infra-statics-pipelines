import React, { Fragment } from 'react'
import ReactTooltip from 'react-tooltip'
import { getFormat } from '../../../data/data'
import translate from 'i18n/translate'
import PropTypes from 'prop-types'

export const PaymentLeft = ({ outstandingBalance, percentageToBePayed }) => {
  return (
    <Fragment>
      {outstandingBalance > 0 && (
        <div
          data-tip
          data-for="percentageToBePayed"
          className={'table-graph__cell colored payment-left'}
          style={{ width: percentageToBePayed + '%' }}
        >
          <ReactTooltip
            id="percentageToBePayed"
            aria-haspopup="true"
            role="example"
            effect="solid"
            delayShow={100}
            className={'tooltip__cashflow'}
          >
            <div className={'tooltip__cashflow--row'}>
              <div>
                <span>
                  {translate('views.my_advances.outstanding.text', {
                    amount: getFormat(outstandingBalance, 'euro'),
                  })}
                </span>
              </div>
            </div>
          </ReactTooltip>

          <div className="table-graph__explanation" />
        </div>
      )}
    </Fragment>
  )
}

PaymentLeft.propTypes = {
  outstandingBalance: PropTypes.number.isRequired,
  percentageToBePayed: PropTypes.number.isRequired,
}
export default PaymentLeft
