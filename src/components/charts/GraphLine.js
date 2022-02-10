import React, { Fragment, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { weekNumber } from 'weeknumber'
import DashboardButtons from '../dashboard/DashboardButtons'
import ExternalTooltip from '../dashboard/ExternalTooltip'
import {
  checkAccounts,
  checkLastSync,
  formatDate,
  getFormat,
  getPreviousYear,
  getYear,
} from './../../data/data'
import CheckAccounts from '../ritmoInsights/CheckAccounts'
import SynchronizingAccounts from '../ritmoInsights/SynchronizingAccounts'
import { LoadingMin } from '../Loading'
import { useIntl } from 'react-intl'

let animationDuration = 1000

const GraphLine = (props) => {
  const { formatMessage } = useIntl()

  const getOrCreateLine = (chart) => {
    let lineEl = chart.canvas.parentNode.querySelector('span')

    if (!lineEl) {
      lineEl = document.createElement('span')
      lineEl.style.borderLeft = '1px dashed rgba(0, 0, 0, 0.1)'
      lineEl.style.position = 'absolute'
      lineEl.style.top = 0
      lineEl.style.bottom = '30px'
      lineEl.style.opacity = 1
      lineEl.style.width = '1px'
      lineEl.style.zIndex = 2
      chart.canvas.parentNode.appendChild(lineEl)
    }
    return lineEl
  }
  const currency = props.currency
  let format = props.dataInitial.format
  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div')

    if (!tooltipEl) {
      tooltipEl = document.createElement('div')

      const table = document.createElement('table')
      table.style.margin = '0px'

      tooltipEl.appendChild(table)
      chart.canvas.parentNode.appendChild(tooltipEl)
    }

    return tooltipEl
  }

  const externalTooltipHandler = (context) => {
    // Tooltip Element
    const { chart, tooltip } = context
    const lineEl = getOrCreateLine(chart)
    const tooltipEl = getOrCreateTooltip(chart)

    const percentageLayer = document.getElementById(
      'type_' + props.dataInitial.id + '__data0_percentage',
    )
    const value0 = document.getElementById(
      'type_' + props.dataInitial.id + '__data0_value',
    )
    const value1 = document.getElementById(
      'type_' + props.dataInitial.id + '__data1_value',
    )
    const label0 = document.getElementById(
      'type_' + props.dataInitial.id + '__data0_label',
    )
    const label1 = document.getElementById(
      'type_' + props.dataInitial.id + '__data1_label',
    )

    // When we leave the tooltip
    function updateData(
      label,
      labelPrev,
      value,
      valuePrev,
      finalPercentage,
      format,
      currency,
    ) {
      const finalValue = getFormat(value, format, false, currency)
      const finalValuePrev = getFormat(valuePrev, format, false, currency)
      let percentageDifff = ''
      if (valuePrev !== '--') {
        percentageDifff = parseFloat(
          ((value - valuePrev) * 100) / valuePrev,
        ).toFixed(2)
        if (percentageLayer.classList.contains('true')) {
          percentageLayer.classList.remove('true')
        }
        if (percentageLayer.classList.contains('false')) {
          percentageLayer.classList.remove('false')
        }

        percentageLayer.classList.add(parseInt(percentageDifff) > 0)
        percentageLayer.innerHTML = finalPercentage
        label1.innerHTML = labelPrev
        value1.innerHTML = finalValuePrev
      }
      value0.innerHTML = finalValue
      label0.innerHTML = label
    }

    const percentage = chart.canvas.parentNode.dataset.percentage
    const label = chart.canvas.parentNode.dataset.label
    const labelPrev = chart.canvas.parentNode.dataset.labelPrev
    const value = chart.canvas.parentNode.dataset.value
    format = chart.canvas.parentNode.dataset.format
    const valuePrev = chart.canvas.parentNode.dataset.valuePrev

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0
      lineEl.style.opacity = 0

      updateData(
        label,
        labelPrev,
        value,
        valuePrev,
        percentage,
        format,
        currency,
      )
      return
    }

    // Set Text
    if (tooltip.body) {
      const dataPoints = tooltip.dataPoints

      // const valueData = dataPoints[0].raw.x;
      // let finalData = valueData;
      dataPoints.forEach((body, i) => {
        const labelLayer = i === 0 ? label0 : label1
        const valueLayer = i === 0 ? value0 : value1

        const week = document.getElementById('global_week').innerHTML
        if (dataPoints[1]) {
          const PrevValue = dataPoints[1].raw.y

          const percentageDifff =
            PrevValue !== 0
              ? parseFloat(
                  ((dataPoints[0].raw.y - PrevValue) * 100) / PrevValue,
                ).toFixed(2)
              : 0
          const finalPercentage = percentageDifff !== 0 ? percentageDifff : ''

          percentageLayer.innerHTML = getFormat(finalPercentage, 'percentage')
          if (percentageLayer.classList.contains('true')) {
            percentageLayer.classList.remove('true')
          }
          if (percentageLayer.classList.contains('false')) {
            percentageLayer.classList.remove('false')
          }
          percentageLayer.classList.add(parseInt(finalPercentage) > 0)
          // const valueDataPrev = dataPoints[1] ? getPreviousYear(dataPoints[1].raw.x) : '';
          // finalData = i === 0 ? valueData: valueDataPrev;
        }

        valueLayer.innerHTML = getFormat(
          dataPoints[i].raw.y,
          format,
          false,
          currency,
        )
        labelLayer.innerHTML =
          props.aggregate === 'weekly'
            ? week +
              ' ' +
              weekNumber(new Date(dataPoints[0].raw.x)) +
              (i === 1 ? getYear(getPreviousYear(dataPoints[0].raw.x)) : '')
            : formatDate(dataPoints[i].raw.x, props.aggregate, i)

        if (dataPoints[1] && dataPoints[1].raw.y === 0) {
          percentageLayer.classList.remove('false')
          percentageLayer.classList.remove('true')
          percentageLayer.innerHTML = ''
          value1.innerHTML = ''
          label1.innerHTML = ''
        }
      })
    }

    const { offsetLeft: positionX } = chart.canvas

    lineEl.style.opacity = 1
    lineEl.style.left = positionX + tooltip.caretX + 'px'
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    tension: 0.051,
    elements: {
      point: {
        radius: 1,
        hitRadius: 10,
        hoverBorderWidth: 0,
        hoverRadius: 6,
      },
    },
    animation: {
      duration: animationDuration,
    },
    layout: {
      paddingTop: 100,
    },
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        enabled: props.tooltip,
        position: 'average',
        external:
          props.tooltipExternal === true ? externalTooltipHandler : false,
      },
    },
    scales: {
      y: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index) {
            return index % 2 === 0
              ? getFormat(value, format, false, currency)
              : ''
          },
          display: true,
          maxRotation: 0,
          color: '#000',
          font: {
            color: 'rgba(0,0,0,1)',
            weight: 'bold',
            size: '12px',
            family: 'Gilroy Light',
          },
        },
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: true,
          lineWidth: 0,
        },
      },
      x: {
        text: 'xAxs',
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: true,
          lineWidth: 0,
          borderDash: [6, 6],
          tickBorderDash: [5, 1],
          drawTicks: true,
        },
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          color: '#000',
          font: {
            family: 'Gilroy Light',
            size: '12px',
            weight: 'bold',
          },
          callback: function (value) {
            let result
            const week = document.getElementById('global_week').innerHTML
            if (props.aggregate === 'weekly') {
              result =
                props.data !== '' && props.data[0][value] !== undefined
                  ? week + ' ' + weekNumber(new Date(props.data[0][value].x))
                  : ''
            } else {
              result =
                props.data !== '' && props.data[0][value]
                  ? formatDate(props.data[0][value].x, props.aggregate)
                  : ''
            }
            return result
          },
        },
      },
    },
  }

  animationDuration = 0

  const [timeStatus] = useState('monthly')
  const colors = []

  const dataCanvas = (canvas) => {
    const ctx = canvas.getContext('2d')

    const colorMain = ctx.createLinearGradient(0, 0, ctx.canvas.width / 2, 0)
    const colorMain2colors = ctx.createLinearGradient(
      0,
      0,
      ctx.canvas.width / 2,
      0,
    )
    const colorMain2 = ctx.createLinearGradient(0, 0, ctx.canvas.width / 2, 0)
    const colorSec = ctx.createLinearGradient(0, 0, ctx.canvas.width / 2, 0)
    const colorSec2 = ctx.createLinearGradient(0, 0, ctx.canvas.width / 2, 0)
    const colorDashed = ctx.createLinearGradient(0, 0, ctx.canvas.width / 2, 0)
    const colorDashed2 = ctx.createLinearGradient(0, 0, ctx.canvas.width / 2, 0)

    colorMain2colors.addColorStop(0, 'rgba(16,78,137, .82)')
    colorMain2colors.addColorStop(0.73, 'rgba(37,134,190, .82)')
    colorMain2colors.addColorStop(0.73, 'rgba(70,70,70, .82)')
    colorMain2colors.addColorStop(1, 'rgba(70,70,70, .82)')

    colorMain.addColorStop(0, 'rgba(16,78,137, .82)')
    colorMain.addColorStop(1, 'rgba(37,134,190, .82)')

    colorMain2.addColorStop(0, 'rgba(16,78,137, .8)')
    colorMain2.addColorStop(1, 'rgba(37,134,190, .8)')

    colorSec.addColorStop(0, 'rgba(100,100,100, .8)')
    colorSec.addColorStop(1, 'rgba(100,100,100, .58)')
    colorSec2.addColorStop(0, 'rgba(70,70,70, .28)')
    colorSec2.addColorStop(1, 'rgba(70,70,70, .28)')

    colorDashed.addColorStop(0, 'rgba(200,200,200, .8)')
    colorDashed.addColorStop(1, 'rgba(200,200,200, .8)')
    colorDashed2.addColorStop(0, 'rgba(200,200,200, .28)')
    colorDashed2.addColorStop(1, 'rgba(200,200,200, .28)')

    const datasets = []
    const dataAmount = props.data !== undefined ? props.data.length : 0

    if (dataAmount > 2) {
      colors.push([colorMain2colors, colorMain2])
      colors.push([colorDashed, colorDashed2])
      colors.push([colorDashed, colorDashed2])
    } else {
      colors.push([colorMain, colorMain2])
      colors.push([colorSec, colorSec2])
    }

    for (let i = 0; i < dataAmount; i++) {
      datasets.push({
        label: 'line' + i,
        type: 'line',
        borderColor: colors[i][0],
        backgroundColor: colors[i][1],
        borderWidth: i === 0 ? 2 : 1,
        fill: false,
        pointRadius: 0,
        borderDash: i <= 0 ? [0, 0] : [4, 2],
        data: props.data[i],
      })
    }

    const result = {
      datasets: datasets,
    }

    return result
  }

  return (
    <>
      <div id="global_week" className="hidden">
        {formatMessage({ id: 'common.week' })}
      </div>
      <div
        className={
          'dashboard__relative' +
          (!checkAccounts(props.connectors, props.accounts) ||
          props.data === undefined ||
          props.updateGraphs
            ? ' hidden'
            : '')
        }
      >
        <LoadingMin />
      </div>

      {props.dataInitial !== '' &&
        checkAccounts(props.connectors, props.accounts) &&
        !checkLastSync(props.connectors, props.accounts) && (
          <ExternalTooltip
            dataInitial={props.dataInitial}
            currency={currency}
          />
        )}

      {/* Filters by Daily, Weekly, Monthly */}
      {checkAccounts(props.connectors, props.accounts) &&
        props.data !== undefined &&
        props.updateGraphs && (
          <DashboardButtons
            active={timeStatus}
            KPIType={props.KPIType}
            filter={props.filter}
            aggregate={props.aggregate}
            updateGraph={props.updateGraph}
            onChangeAggregate={props.onChangeAggregate}
            weeksRange={props.weeksRange}
          />
        )}

      <div
        className="dashboard__cell"
        data-value={props.dataInitial ? props.dataInitial.value : ''}
        data-value-prev={props.dataInitial ? props.dataInitial.value_prev : ''}
        data-label={props.dataInitial ? props.dataInitial.label : ''}
        data-label-prev={props.dataInitial ? props.dataInitial.label_prev : ''}
        data-percentage={props.dataInitial ? props.dataInitial.percentage : ''}
        data-format={props.dataInitial ? props.dataInitial.format : ''}
      >
        {props.connectors && (
          <>
            {/* Graph Loaded */}
            {checkAccounts(props.connectors, props.accounts) &&
              !checkLastSync(props.connectors, props.accounts) &&
              props.data !== undefined &&
              props.data[0].length !== 0 &&
              props.updateGraphs && (
                <Bar
                  id={props.type}
                  data={dataCanvas}
                  options={options}
                  type="bar"
                />
              )}

            {/* Synchorinig Accounts */}
            {checkAccounts(props.connectors, props.accounts) &&
              checkLastSync(props.connectors, props.accounts) && (
                <SynchronizingAccounts openRightPanel={props.openRightPanel} />
              )}

            {/* NOT AVAILABLE Accounts */}
            {!checkAccounts(props.connectors, props.accounts) && (
              <CheckAccounts openRightPanel={props.openRightPanel} />
            )}
          </>
        )}
      </div>
    </>
  )
}

export default GraphLine
