import React, { Fragment, useEffect, useMemo, useState } from 'react'
import {
  checkAccounts,
  checkLastSync,
  customStyles,
  dataKpi,
  dataLTV,
  formatMonthAndYear,
  getFormat,
  optionsLTV,
  RIConnectorsByType,
} from '../../data/data'
import translate from '../../i18n/translate'
import SynchronizingAccounts from '../ritmoInsights/SynchronizingAccounts'
import CheckAccounts from '../ritmoInsights/CheckAccounts'
import { useIntl } from 'react-intl'
import Select from 'react-select'
import LTVTooltips from 'components/ritmoInsights/LTV/LTVTooltips'

const options = optionsLTV.map((opt) => ({
  ...opt,
  label: translate(opt.label),
}))

const KPIs = [
  'revenue_cohort',
  'orders_cohort',
  'aov_cohort',
  'ltv',
  'cac',
  'ltv_cac',
]

export const LTVGraph = ({ data, extraResults, accounts, openRIPanel }) => {
  const { formatMessage, locale } = useIntl()

  const [hoverX, setHoverX] = useState(null)
  const [hoverY, setHoverY] = useState(null)
  const [metric, setMetric] = useState(options[0])
  const [tableData, setTableData] = useState([])

  const maxRows = useMemo(() => data?.data_current?.length || 0, [data])

  useEffect(() => {
    const calculateColorRange = (value, min, max) => {
      if (value >= max) return 20
      if (value <= min) return 0
      return parseInt(((value - min) / (max - min)) * 20)
    }

    const getMax = (data) => {
      let dataArray = data.data_current.reduce((acc, curr) => {
        const newRow = curr.cohort.reduce((accCohort, currCohort) => {
          const value = currCohort[metric.value]
          if (value !== -1) accCohort.push(value)
          return accCohort
        }, [])
        acc = acc.concat(newRow)
        return acc
      }, [])

      const min = Math.min(...dataArray) * metric.multiplier
      const max = Math.max(...dataArray) * metric.multiplier

      return [min, max]
    }

    const setColors = (data, min, max) => {
      let dataArray = data.data_current.map((row) => {
        return row.cohort.map((element) => {
          const value = element[metric.value] * metric.multiplier
          const output =
            element[metric.value] !== -1
              ? {
                  value: getFormat(value, metric.format, metric.noDecimals),
                  color: calculateColorRange(value, min, max),
                }
              : {
                  value: undefined,
                  color: '00',
                }
          return output
        })
      })
      setTableData(dataArray)
    }

    if (data) {
      setTableData([])
      let [min, max] = getMax(data)
      setColors(data, min, max)
    }
  }, [data, metric])

  const mouseOver = (i, j) => {
    setHoverX(i)
    setHoverY(j)
  }

  const resetHover = () => {
    setHoverX(null)
    setHoverY(null)
  }

  const getHoverClass = (x, y) => {
    return hoverX === x || hoverY === y ? ' active' : ''
  }

  const handleMetricChange = (e) => {
    setMetric(options.find((opt) => opt.value === e.value))
  }

  return (
    <div className="dashboard__cells-container rows-0">
      <div className="dashboard__cells--layout ltv">
        <div className="dashboard__header">
          <div className="dashboard__header--column vertical">
            <h2 className="dashboard__cells--title-graph ltv-table">
              <span>
                {translate(`data.ri.ltv.ltv_cohorts_title.${metric.value}`)}
              </span>
              <div
                className="dashboard__help"
                onClick={() => {
                  openRIPanel(dataKpi.ltv_cohorts)
                }}
              >
                <div className="dashboard__help--text">
                  {translate('common.more_info')}
                </div>
              </div>
            </h2>
            <h4 className="dashboard__cells--subtitle-graph">
              {translate(`data.ri.ltv.ltv_cohorts_subtitle.${metric.value}`)}
            </h4>
          </div>
          <div className="dashboard__header--column ltv">
            <div className="dashboard__header--column-filters ltv">
              <Select
                options={options}
                styles={customStyles()}
                defaultValue={options[0]}
                onChange={handleMetricChange}
              />
            </div>
          </div>
        </div>
        {/* CONNECTED & SYNCHED */}{' '}
        {data &&
          extraResults &&
          checkAccounts(RIConnectorsByType.ltv_cohorts, accounts) &&
          !checkLastSync(RIConnectorsByType.ltv_cohorts, accounts) && (
            <div className="ltv__table--container">
              <div className="ltv__table--wrapper">
                {/* FIRST VALUES */}
                <div className="ltv__table">
                  <div className="ltv__row labels">
                    <div className="ltv__cel3l width100" />
                  </div>
                  {/* LABELS FIRST 2 ROWS */}
                  <div className="ltv__row labels">
                    <div
                      className={'ltv__cell label' + getHoverClass(0)}
                      onMouseOver={() => {
                        mouseOver(0, -1)
                      }}
                      onMouseLeave={resetHover}
                    >
                      {translate('common.acquisition_name')}
                    </div>
                    <div
                      className={'ltv__cell label with-help' + getHoverClass(1)}
                      onMouseOver={() => {
                        mouseOver(1, -1)
                      }}
                      onMouseLeave={resetHover}
                    >
                      <div className="ltv__cell--container">
                        {translate('components.kpi.customers_cohort.title')}
                        <div className="ltv__cell--container-symbol">
                          <div
                            data-tip
                            data-for="LTVTooltip"
                            className="ltv__header--help"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {data.data_current.map((ltv, i) => {
                    return (
                      <div
                        key={`item-${i}-${ltv.x}`}
                        className={'ltv__row data_' + i}
                      >
                        <div
                          className={
                            'ltv__cell acquisition' + getHoverClass(0, i)
                          }
                          onMouseOver={() => {
                            mouseOver(0, i)
                          }}
                          onMouseLeave={resetHover}
                        >
                          {formatMonthAndYear(ltv.x, locale)}
                        </div>

                        {extraResults.customers_cohort &&
                          extraResults.customers_cohort.data_current[i] && (
                            <div
                              className={
                                'ltv__cell value' + getHoverClass(1, i)
                              }
                              onMouseOver={() => {
                                mouseOver(1, i)
                              }}
                            >
                              {extraResults.customers_cohort.data_current[i].y
                                ? getFormat(
                                    extraResults.customers_cohort.data_current[
                                      i
                                    ].y,
                                    extraResults.customers_cohort.data_type,
                                    true, //no decimals
                                  )
                                : ''}
                            </div>
                          )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="ltv__table--wrapper">
                <div className="ltv__table">
                  <div className="ltv__row">
                    <div className="ltv__cell_label ltv__table--detail">
                      {translate('data.ri.detail')}
                    </div>
                    <div className="ltv__cell_label ltv__table--detail">
                      {translate('data.ri.performance')}
                    </div>
                  </div>
                  <div className="ltv__row">
                    {/* LABELS ROWS */}{' '}
                    {dataLTV[0].data.map((data, i) => {
                      return (
                        <div
                          key={`item-${i}-${data.title}`}
                          className={'ltv__cell label ' + getHoverClass(i + 2)}
                          onMouseOver={() => {
                            mouseOver(i + 2, -1)
                          }}
                          onMouseLeave={resetHover}
                        >
                          {data.title}
                        </div>
                      )
                    })}
                    {/* EXTRA COLUMNS LABELS */}{' '}
                    {extraResults && (
                      <>
                        <div className="ltv__cell first" />

                        {KPIs.map((kpi, j) => {
                          return (
                            <Fragment key={kpi}>
                              {extraResults[kpi] && (
                                <div
                                  className={
                                    'ltv__cell label kpis' +
                                    getHoverClass(15 + j)
                                  }
                                  onMouseOver={() => {
                                    mouseOver(j + 15, -1)
                                  }}
                                  onMouseLeave={resetHover}
                                >
                                  <div className="ltv__cell--container">
                                    {formatMessage({
                                      id: `components.kpi.${kpi}.title`,
                                    })}
                                    <div className="ltv__cell--container-symbol">
                                      <div
                                        data-tip
                                        data-for="LTVTooltip"
                                        className="ltv__header--help dark"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Fragment>
                          )
                        })}
                      </>
                    )}
                  </div>
                  {/* EXTRA */}{' '}
                  {tableData.map((ltv, i) => {
                    return (
                      <div
                        key={`ltv-${i}-${ltv.x}`}
                        className={'ltv__row data_' + i}
                      >
                        {ltv &&
                          ltv.map((data, j) => {
                            return (
                              <div
                                data-tip
                                data-for={
                                  data.value !== undefined && 'LTVTooltip'
                                }
                                key={`ltv-${i}-${ltv.x}-cell-${j}`}
                                onMouseOver={() => {
                                  mouseOver(2 + j, i)
                                }}
                                onMouseLeave={() => {
                                  if (i === maxRows - 1) resetHover()
                                }}
                                className={`ltv__cell color color_${
                                  data.color
                                } ${getHoverClass(2 + j, i)}`}
                              >
                                {data.value}
                              </div>
                            )
                          })}{' '}
                        {extraResults && (
                          <>
                            <div className="ltv__cell first" />
                            {KPIs.map((kpi, val) => {
                              return (
                                <Fragment key={kpi}>
                                  {extraResults[kpi] &&
                                    extraResults[kpi].data_current[i] && (
                                      <div
                                        onMouseOver={() => {
                                          mouseOver(15 + val, i)
                                        }}
                                        onMouseLeave={() => {
                                          if (i === maxRows - 1 || val === 5)
                                            resetHover()
                                        }}
                                        className={
                                          'ltv__cell color' +
                                          getHoverClass(val + 15, i)
                                        }
                                      >
                                        {extraResults[kpi].data_current[i].y
                                          ? getFormat(
                                              extraResults[kpi].data_current[i]
                                                .y,
                                              extraResults[kpi].data_type,
                                              kpi === 'orders_cohort', //no decimals for orders_cohort
                                            )
                                          : ''}
                                      </div>
                                    )}
                                </Fragment>
                              )
                            })}
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              {data.data_current && hoverX !== null && hoverY !== null && (
                <LTVTooltips x={hoverX} y={hoverY} data={data.data_current} />
              )}
            </div>
          )}
        {/* NOT CONNECTED */}{' '}
        {!checkAccounts(RIConnectorsByType.ltv_cohorts, accounts) && (
          <>
            <div className="dashboard__cell">
              <CheckAccounts
                openRightPanel={() => {
                  openRIPanel(dataKpi.ltv_cohorts)
                }}
              />
            </div>
          </>
        )}
        {checkAccounts(RIConnectorsByType.ltv_cohorts, accounts) &&
          checkLastSync(RIConnectorsByType.ltv_cohorts, accounts) && (
            <div className="dashboard__cell">
              {/* SYNCHRONIZING ACCOUNTS */}
              {checkAccounts(RIConnectorsByType.ltv_cohorts, accounts) &&
                checkLastSync(RIConnectorsByType.ltv_cohorts, accounts) && (
                  <SynchronizingAccounts
                    openRightPanel={() => {
                      openRIPanel(dataKpi.ltv_cohorts)
                    }}
                  />
                )}
              {/* NOT AVAILABLE ACCOUNTS */}{' '}
              {!checkAccounts(RIConnectorsByType.ltv_cohorts, accounts) && (
                <CheckAccounts
                  openRightPanel={() => {
                    openRIPanel(dataKpi.ltv_cohorts)
                  }}
                />
              )}
            </div>
          )}
      </div>
    </div>
  )
}

export default LTVGraph
