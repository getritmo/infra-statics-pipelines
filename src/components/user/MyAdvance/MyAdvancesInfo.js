import { getFormat } from '../../../data/data'
import Moment from 'react-moment'
import React from 'react'
import { useIntl } from 'react-intl'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

export const MyAdvancesInfo = ({ scenario, offer, deployment }) => {
  const {
    appData: { application },
  } = useSelector((state) => state)
  const { formatMessage } = useIntl()

  return (
    <div>
      {!scenario && <div>No Offer</div>}
      {Object.keys(application).length && scenario && (
        <>
          {deployment && (
            <div className={'my-advances'}>
              {/*ADVANCE AMOUNT*/}
              <div>
                <label>
                  {formatMessage({ id: 'views.my_advances.advance_amount' })}
                </label>
                <div>{getFormat(scenario.raw_amount / 100, 'euro')}</div>
              </div>
              {/*Revenue Share*/}
              <div>
                <label>
                  {formatMessage({ id: 'views.my_advances.revenue_share' })}
                </label>
                <div>{(deployment.revenue_share / 100).toFixed(2)} %</div>
              </div>

              {/*COMMISION RATE*/}
              <div>
                <label>
                  {formatMessage({ id: 'views.my_advances.commission_rate' })}
                </label>
                <div>{(deployment.commission_rate / 100).toFixed(2)} %</div>
              </div>

              {/*START DATE*/}
              <div>
                <label>
                  <span />
                  <div>
                    {formatMessage({
                      id: 'views.my_advances.start_date.title',
                    })}
                    <div
                      data-tip
                      data-place={'top'}
                      data-for="help"
                      className={'dashboard__help'}
                    />
                  </div>

                  <ReactTooltip
                    id="help"
                    aria-haspopup="true"
                    role="example"
                    effect="solid"
                    delayShow={100}
                    className={'tooltip__cashflow top'}
                  >
                    <div className={'tooltip__cashflow--row'}>
                      {formatMessage({
                        id: 'views.my_advances.start_date.tooltip',
                      })}
                    </div>
                  </ReactTooltip>
                </label>
                <div>
                  <Moment format="DD MMM YYYY ">
                    {deployment.deploy_date}
                  </Moment>
                </div>
              </div>
              {/*TOTAL DUE*/}
              <div>
                <label>
                  {formatMessage({ id: 'views.my_advances.total_due' })}
                </label>
                <div>
                  {getFormat(
                    (scenario.raw_amount + scenario.commission) / 100,
                    'euro',
                  )}
                </div>
              </div>
              {/*CURRENCY*/}
              <div>
                <label>{formatMessage({ id: 'common.Currency' })}</label>
                <div>{offer.currency}</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

MyAdvancesInfo.propTypes = {
  scenario: PropTypes.object.isRequired,
  offer: PropTypes.object.isRequired,
  deployment: PropTypes.object.isRequired,
}

export default MyAdvancesInfo
