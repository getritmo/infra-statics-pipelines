import React, { Fragment } from 'react'
import ReactTooltip from 'react-tooltip'
import { getFormat } from '../../../data/data'
import translate from '../../../i18n/translate'
import PropTypes from 'prop-types'

export const ProcessingPayment = ({
  amountDue,
  percentageAmountDue,
  paymentsAmount,
}) => {
  return (
    <Fragment>
      {percentageAmountDue > 0 && (
        <div
          data-tip
          data-for="percentageAmountDue"
          className={'table-graph__cell colored processing'}
          style={{ width: percentageAmountDue + '%' }}
        >
          <ReactTooltip
            id="percentageAmountDue"
            aria-haspopup="true"
            role="example"
            effect="solid"
            delayShow={100}
            className={'tooltip__cashflow'}
          >
            <div className={'tooltip__cashflow--row'}>
              <div>
                {translate(
                  `views.my_advances.processing.text_${
                    paymentsAmount > 1 ? 'plural' : 'single'
                  }`,
                  {
                    paymentsAmount: paymentsAmount,
                    amount: getFormat(amountDue, 'euro'),
                  },
                )}
                <br />
                {translate('views.my_advances.processing.text_2')}
              </div>
            </div>
          </ReactTooltip>
          <div className="table-graph__explanation" />
        </div>
      )}
    </Fragment>
  )
}

ProcessingPayment.propTypes = {
  amountDue: PropTypes.number.isRequired,
  percentageAmountDue: PropTypes.number.isRequired,
  paymentsAmount: PropTypes.number.isRequired,
}

export default ProcessingPayment
