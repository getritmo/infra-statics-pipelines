import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import DashboardButtons from '../dashboard/DashboardButtons'
import ExternalPrevisionTooltip from '../dashboard/ExternalPrevisionTooltip'
import { formatDate, getFormat } from './../../data/data'

const tooltipContent = true
let animationDuration = 1000

const GraphLine = (props) => {
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
  const getOrCreateLineDivision = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div')

    if (!tooltipEl) {
      tooltipEl = document.createElement('div')
      tooltipEl.style.borderLeft = '2px dashed rgba(0, 0, 0, 0.41)'
      tooltipEl.style.position = 'absolute'
      tooltipEl.style.top = 0

      tooltipEl.style.left = 'calc(62% - 52px)'
      tooltipEl.style.bottom = '30px'
      tooltipEl.style.opacity = 1
      tooltipEl.style.width = '1px'
      tooltipEl.style.zIndex = 2

      chart.canvas.parentNode.appendChild(tooltipEl)
    }

    return tooltipEl
  }

  const externalTooltipHandler = (context) => {
    // Tooltip Element
    const { chart, tooltip } = context
    const lineEl = getOrCreateLine(chart)
    const tooltipEl = getOrCreateLineDivision(chart)

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

    function updateData(
      label,
      labelPrev,
      value,
      valuePrev,
      finalPercentage,
      format,
    ) {
      if (finalPercentage !== '') {
        const percentageDifff = parseFloat(
          ((valuePrev - value) * 100) / value,
        ).toFixed(2)
        if (percentageLayer.classList.contains('true')) {
          percentageLayer.classList.remove('true')
        }
        if (percentageLayer.classList.contains('false')) {
          percentageLayer.classList.remove('false')
        }
        percentageLayer.classList.add(percentageDifff > 0)
        percentageLayer.innerHTML = finalPercentage
      }
      const finalValue = getFormat(value, format)
      const finalValuePrev = getFormat(valuePrev, format)
      value0.innerHTML = finalValue
      label0.innerHTML = label
      value1.innerHTML = finalValuePrev
      value1.parentNode.classList.add('hidden')
    }

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      // tooltipEl.style.opacity = 0;
      lineEl.style.opacity = 0

      // const percentage = chart.canvas.parentNode.dataset.percentage;
      const label = chart.canvas.parentNode.dataset.label
      const labelPrev = chart.canvas.parentNode.dataset.labelPrev
      const value = chart.canvas.parentNode.dataset.value
      const format = chart.canvas.parentNode.dataset.format
      const valuePrev = chart.canvas.parentNode.dataset.valuePrev

      updateData(label, labelPrev, value, valuePrev, '', format)
      return
    }

    // Set Text
    if (tooltip.body) {
      const dataPoints = tooltip.dataPoints

      const goodValue =
        dataPoints[0] !== undefined ? dataPoints[0].raw.y : dataPoints[3].raw.y
      const goodValueLabel = dataPoints[1].raw.x
      const minValue = dataPoints[1].raw.y
      const maxValue = dataPoints[2].raw.y
      const range =
        getFormat(minValue, 'kFormatterEuro') +
        ' - ' +
        getFormat(maxValue, 'kFormatterEuro')

      if (goodValue !== minValue) {
        value1.parentNode.classList.remove('hidden')
      } else {
        value1.parentNode.classList.add('hidden')
      }

      label0.innerHTML = formatDate(goodValueLabel, 'monthly')
      value0.innerHTML = getFormat(goodValue, 'kFormatterEuro')
      value1.innerHTML = range
    }

    const { offsetLeft: positionX } = chart.canvas

    lineEl.style.opacity = 1
    lineEl.style.left = positionX + tooltip.caretX + 'px'
    tooltipEl.style.opacity = 1
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
        enabled: false,
        position: 'average',
        // backgroundColor: 'rgba(255,255,255,.9)',
        external: externalTooltipHandler,
      },
    },
    scales: {
      y: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index) {
            return index % 2 === 0 ? getFormat(value, 'kFormatterEuro') : ''
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
            return formatDate(
              props.monthlyData.datasets[1].data[value].x,
              'monthly',
            )
          },
        },
      },
    },
  }

  animationDuration = 0

  const [timeStatus, setTimeStatus] = useState('monthly')
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
    const colorBlue = ctx.createLinearGradient(0, 0, ctx.canvas.width / 2, 0)

    // const perc = document.getElementById('8').width/2 * .5335;

    colorBlue.addColorStop(0, 'rgba(16,78,137, 1)')
    colorBlue.addColorStop(1, 'rgba(16,78,137, 1)')
    colorMain2colors.addColorStop(0, 'rgba(65,117,5, 1)')
    colorMain2colors.addColorStop(1, 'rgba(139,176,77, 1)')
    /*   colorMain2colors.addColorStop(.57, 'rgba(16,78,137, 1)');
    colorMain2colors.addColorStop(1, 'rgba(22 ,109,193, 1)'); */

    colorMain.addColorStop(0, 'rgba(16,78,137, .82)')
    colorMain.addColorStop(1, 'rgba(37,134,190, .82)')

    colorMain2.addColorStop(0, 'rgba(16,78,137, .8)')
    colorMain2.addColorStop(1, 'rgba(37,134,190, .8)')

    colorSec.addColorStop(0, 'rgba(100,100,100, .8)')
    colorSec.addColorStop(1, 'rgba(100,100,100, .58)')
    colorSec2.addColorStop(0, 'rgba(70,70,70, .28)')
    colorSec2.addColorStop(1, 'rgba(70,70,70, .28)')

    colorDashed.addColorStop(0, 'rgba(22 ,109,193,.42)')
    colorDashed.addColorStop(1, 'rgba(22 ,109,193,.42)')
    colorDashed2.addColorStop(0, 'rgba(22 ,109,193,.42)')
    colorDashed2.addColorStop(1, 'rgba(22 ,109,193,.42)')

    const datasets = []
    const dataAmount = props.monthlyData.datasets.length

    if (dataAmount > 2) {
      colors.push([colorMain2colors, colorMain2])
      colors.push([colorDashed, colorDashed2])
      colors.push([colorDashed, colorDashed2])
      colors.push([colorBlue, colorBlue])
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
        borderWidth: i === 3 ? 5 : 3,
        fill: false,
        pointRadius: 0,
        borderDash: i <= 0 || i === 3 ? [0, 0] : [4, 2],
        data: props.monthlyData.datasets[i].data,
      })
    }

    const result = {
      datasets: datasets,
    }

    return result
  }

  const timeUpdate = (item) => {
    animationDuration = 1000
    setTimeStatus(item)

    setTimeout(() => {
      animationDuration = 0
    }, 1000)
  }

  return (
    <>
      {tooltipContent && (
        <ExternalPrevisionTooltip
          type={props.dataInitial.id}
          dataInitial={props.dataInitial}
        />
      )}
      <DashboardButtons active={timeStatus} setTimeStatus={timeUpdate} />
      <div
        className="dashboard__cell"
        data-value={props.dataInitial ? props.dataInitial.value : ''}
        data-value-prev={props.dataInitial ? props.dataInitial.value_prev : ''}
        data-label={props.dataInitial ? props.dataInitial.label : ''}
        data-label-prev={props.dataInitial ? props.dataInitial.label_prev : ''}
        data-percentage={props.dataInitial ? props.dataInitial.percentage : ''}
        data-format={props.dataInitial ? props.dataInitial.format : ''}
      >
        <div className="dashboard__prevision" />
        <Bar id={props.type} data={dataCanvas} options={options} type="bar" />
      </div>
    </>
  )
}

export default GraphLine
