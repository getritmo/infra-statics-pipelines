import React, { useEffect, Fragment } from 'react'

import translate from '../../i18n/translate'
import { LoadingMin } from '../Loading.js'

export const ScoreCard = ({ data, isECommerce }) => {
  const getClass = (value) => {
    if (value >= 75) {
      return 'green'
    } else if (value > 50) {
      return 'orange'
    } else {
      return 'red'
    }
  }

  const overall_score = isECommerce
    ? data[0].overall_score
    : data[0].overall_score_marketplace
  const revenue_trend = isECommerce
    ? data[0].revenue_trend
    : data[0].revenue_trend_marketplace
  const revenue_growth = isECommerce
    ? data[0].revenue_growth
    : data[0].revenue_growth_marketplace
  const revenue_growth_last_year = isECommerce
    ? data[0].revenue_growth_last_year
    : data[0].revenue_growth_last_year_marketplace
  const seasonality = isECommerce
    ? data[0].seasonality
    : data[0].seasonality_marketplace
  const marketing_performance = isECommerce
    ? data[0].marketing_performance
    : data[0].marketing_performance_marketplace

  const financials = isECommerce
    ? data[0].financials
    : data[0].financials_marketplace
  const gross_profit = isECommerce
    ? data[0].gross_profit
    : data[0].gross_profit_marketplace
  const net_profit = isECommerce
    ? data[0].net_profit
    : data[0].net_profit_marketplace
  const conversion_cycle = isECommerce
    ? data[0].conversion_cycle
    : data[0].conversion_cycle_marketplace
  const leverage = isECommerce ? data[0].leverage : data[0].leverage_marketplace

  useEffect(() => {
    /* const getMax = (data) => {
      let minimum = 100
      let maximum = 0

      for (let i = 0; i < data.data_current.length; i++) {
        const date = data.data_current[i];
          for (let j = 0; j < date.extra?.length; j++) {
            const item = date.extra[j] * 100
            maximum = (item > maximum) ? item : maximum
            minimum = (item < minimum && item !== 0) ? item : minimum
          }
      }
      setMax(maximum)
      setMin(minimum)
    }

    if (data) getMax(data); */
  }, [data])
  return (
    <>
      {/* LOADING */}
      {!data && (
        <div className="dashboard__cells-container full">
          <LoadingMin />
        </div>
      )}

      {/* CONNECTED & SYNCHED */}
      {data && (
        <div className={' '}>
          <div className="dashboard__cells--layouta">
            <div className="score-card__table--container">
              <div className="score-card__table">
                <div className="score-card__table--row">
                  <div className="score-card__row">
                    <div className="score-card__label super-big">
                      {isECommerce && (
                        <>
                          Growth Capital <b>eCommerce</b>
                        </>
                      )}
                      {!isECommerce && (
                        <>
                          Growth Capital <b>Marketplace Sellers</b>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="score-card__row half final-result">
                    <div className="score-card__values ">
                      <div className="score-card__label  ">Overall Score:</div>
                      <div
                        className={
                          'score-card__final ' + getClass(overall_score)
                        }
                      >
                        {overall_score}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="score-card__row double-underline">
                  <div className="score-card__label big">
                    Scorecard Breakdown
                  </div>
                  <div className="score-card__values">
                    <div className="score-card__label">Weight</div>
                    <div className="score-card__label">Value</div>
                    <div className="score-card__label">Score</div>
                  </div>
                </div>

                <ScoreCardRow
                  data={revenue_trend}
                  hover={false}
                  classname="underline"
                  label="big"
                  title="revenue_trend"
                />

                <ScoreCardRow
                  data={revenue_growth}
                  hover
                  classname="values"
                  label="big"
                  title="revenue_growth"
                />

                {/* <ScoreCardRow data={data[0].revenue_growth_last_year}
                                          hover={true}
                                          classname={'values'}
                                          label={'big'}
                                          title={'revenue_growth_last_year'}
                            ></ScoreCardRow> */}

                <div className="score-card__row values">
                  <div className="score-card__label big">
                    <b>Revenue Growth</b> (compared to last year)
                    <br />
                    (last 6 months to previous year last 6 months)
                  </div>
                  <div className="score-card__values">
                    <div className="value">{revenue_growth_last_year[0]} %</div>
                    <div className="value">{revenue_growth_last_year[1]} %</div>
                    <div className="value bold">
                      {revenue_growth_last_year[2][0]}
                    </div>
                  </div>

                  <HoverScoreCard data={revenue_growth_last_year[2][1]} />
                </div>

                <div className="score-card__row values">
                  <div className="score-card__label big">
                    <b>Seasonality</b>
                    <br />
                    (Top 2 months of sales/ Last 12 month sales)
                  </div>
                  <div className="score-card__values">
                    <div className="value">{seasonality[0]} %</div>
                    <div className="value">{seasonality[1]} %</div>
                    <div className="value bold">{seasonality[2][0]}</div>
                  </div>

                  <HoverScoreCard data={seasonality[2][1]} />
                </div>

                <div className="score-card__row underline">
                  <div className="score-card__label big">
                    {isECommerce && <>Marketing Performance</>}
                    {!isECommerce && <>Marketplace Metrics (Amazon)</>}
                  </div>
                  <div className="score-card__values">
                    <div className="value">{marketing_performance[0]} %</div>
                    <div className="value">{marketing_performance[1]}</div>
                    <div className="value bold">
                      {marketing_performance[2][0]}
                    </div>
                  </div>
                </div>

                {isECommerce && (
                  <>
                    <div className="score-card__row values">
                      <div className="score-card__label big">
                        <b>Return on Ad Spend</b> (ROAS)
                        <br />
                        (6 month average)
                        <br />
                        [Actual revenue/combined ad expense]
                      </div>
                      <div className="score-card__values">
                        <div className="value">{data[0].ad_spend[0]} %</div>
                        <div className="value">{data[0].ad_spend[1]}</div>
                        <div className="value bold">
                          {data[0].ad_spend[2][0]}
                        </div>
                      </div>

                      <HoverScoreCard data={data[0].ad_spend[2][1]} />
                    </div>

                    <div className="score-card__row values">
                      <div className="score-card__label big">
                        <b>Ecommerce Conversion Rate</b>
                        <br />
                        (6 month average)
                        <br />
                        (Real Transactions/ GA Sessions)
                      </div>
                      <div className="score-card__values">
                        <div className="value">
                          {data[0].conversion_rate[0]} %
                        </div>
                        <div className="value">
                          {data[0].conversion_rate[1]} %
                        </div>
                        <div className="value bold">
                          {data[0].conversion_rate[2][0]}
                        </div>
                      </div>

                      <HoverScoreCard data={data[0].conversion_rate[2][1]} />
                    </div>

                    <div className="score-card__row values">
                      <div className="score-card__label big">
                        Growth in <b>Ecommerce Conversion Rate</b>
                        <br />
                        (6 months vs previous 6 months)
                      </div>
                      <div className="score-card__values">
                        <div className="value">
                          {data[0].commerce_conversion_rate[0]} %
                        </div>
                        <div className="value">
                          {data[0].commerce_conversion_rate[1]} %
                        </div>
                        <div className="value bold">
                          {data[0].commerce_conversion_rate[2][0]}
                        </div>
                      </div>

                      <HoverScoreCard
                        data={data[0].commerce_conversion_rate[2][1]}
                      />
                    </div>
                  </>
                )}

                {!isECommerce && (
                  <>
                    <div className="score-card__row values">
                      <div className="score-card__label big">
                        <b>Geographic Concentration of Sales</b> in a{' '}
                        <b>unique country/MKP</b>
                      </div>
                      <div className="score-card__values">
                        <div className="value">{data[0].geo_sales[0]} %</div>
                        <div className="value">{data[0].geo_sales[1]} %</div>
                        <div className="value bold">
                          {data[0].geo_sales[2][0]}
                        </div>
                      </div>

                      <HoverScoreCard data={data[0].geo_sales[2][1]} />
                    </div>

                    <div className="score-card__row values">
                      <div className="score-card__label big">
                        <b>Account Health</b>
                      </div>
                      <div className="score-card__values">
                        <div className="value">
                          {data[0].account_health[0]} %
                        </div>
                        <div className="value">{data[0].account_health[1]}</div>
                        <div className="value bold">
                          {data[0].account_health[2][0]}
                        </div>
                      </div>

                      <HoverScoreCard data={data[0].account_health[2][1]} />
                    </div>

                    <div className="score-card__row values">
                      <div className="score-card__label big">
                        <b>Brand Owner/reseller</b>
                      </div>
                      <div className="score-card__values">
                        <div className="value">
                          {data[0].brand_reseller[0]} %
                        </div>
                        <div className="value">{data[0].brand_reseller[1]}</div>
                        <div className="value bold">
                          {data[0].brand_reseller[2][0]}
                        </div>
                      </div>

                      <HoverScoreCard data={data[0].brand_reseller[2][1]} />
                    </div>

                    <div className="score-card__row values">
                      <div className="score-card__label big">
                        <b>Product (Catalog) Concentration</b>
                      </div>
                      <div className="score-card__values">
                        <div className="value">
                          {data[0].product_catalog[0]} %
                        </div>
                        <div className="value">
                          {data[0].product_catalog[1]}
                        </div>
                        <div className="value bold">
                          {data[0].product_catalog[2][0]}
                        </div>
                      </div>

                      <HoverScoreCard data={data[0].product_catalog[2][1]} />
                    </div>
                  </>
                )}
                {/* /// FINANCIAL */}

                <div className="score-card__row underline">
                  <div className="score-card__label big">Financials</div>
                  <div className="score-card__values">
                    <div className="value">{financials[0]} %</div>
                    <div className="value">{financials[1]}</div>
                    <div className="value bold">{financials[2][0]}</div>
                  </div>
                  {/*
                                <HoverScoreCard data={data[0].revenue_trend[2][1]}></HoverScoreCard> */}
                </div>

                <div className="score-card__row values">
                  <div className="score-card__label big">
                    <b>Gross Profit Margin</b>
                  </div>
                  <div className="score-card__values">
                    <div className="value">{gross_profit[0]} %</div>
                    <div className="value">{gross_profit[1]} %</div>
                    <div className="value bold">{gross_profit[2][0]}</div>
                  </div>

                  <HoverScoreCard data={gross_profit[2][1]} />
                </div>

                <div className="score-card__row values">
                  <div className="score-card__label big">
                    <b>Net Profit Margin</b>
                  </div>
                  <div className="score-card__values">
                    <div className="value">{net_profit[0]} %</div>
                    <div className="value">{net_profit[1]} %</div>
                    <div className="value bold">{net_profit[2][0]}</div>
                  </div>

                  <HoverScoreCard data={net_profit[2][1]} />
                </div>

                <div className="score-card__row values">
                  <div className="score-card__label big">
                    <b>Cash Conversion Cycle</b>
                    <br />
                    (Receivables Days + Inventory Days - Payables Days)
                  </div>
                  <div className="score-card__values">
                    <div className="value">{conversion_cycle[0]} %</div>
                    <div className="value">{conversion_cycle[1]}</div>
                    <div className="value bold">{conversion_cycle[2][0]}</div>
                  </div>

                  <HoverScoreCard data={conversion_cycle[2][1]} />
                </div>

                <div className="score-card__row values">
                  <div className="score-card__label big">
                    <b>Leverage (Capital Structure)</b>
                    <br />
                    Total liabilities/Total Equity
                  </div>
                  <div className="score-card__values">
                    <div className="value">{leverage[0]} %</div>
                    <div className="value">{leverage[1]}</div>
                    <div className="value bold">{leverage[2][0]}</div>
                  </div>

                  <HoverScoreCard data={leverage[2][1]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export const HoverScoreCard = ({ data }) => {
  return (
    <div className="score-card__hover">
      <div className="score-card__hover--wrapper">
        <div className="score-card__hover--title">
          The score is calculated according to the following ranges:
        </div>
        {data.map((i, j) => {
          return (
            <div key={i + j} className="score-card__hover--item">
              <div className="score-card__hover--item--label">{i.title}</div>
              <div className="score-card__hover--item--value">{i.value}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const ScoreCardRow = ({ title, data, classname, label, hover }) => {
  return (
    <div className={'score-card__row ' + (classname || '')}>
      <div className={'score-card__label ' + (label || '')}>
        {translate('score_card.' + title)}
      </div>
      <div className="score-card__values">
        <div className="value">{data[0]} %</div>
        <div className="value">{data[1]}</div>
        <div className="value bold">{data[2][0]}</div>
      </div>

      {hover && <HoverScoreCard data={data[2][1]} />}
    </div>
  )
}

export default ScoreCard
