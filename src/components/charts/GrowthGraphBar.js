import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import DashboardButtons from '../dashboard/DashboardButtons'
import ExternalTooltipGrowth from '../dashboard/ExternalTooltipGrowth'
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

    const value0 = document.getElementById(
      'type_' + props.dataInitial.id + '__data0_value',
    )
    const label0 = document.getElementById(
      'type_' + props.dataInitial.id + '__data0_label',
    )

    function updateData(label, value, format) {
      const finalValue = getFormat(value, format)
      value0.innerHTML = finalValue
      label0.innerHTML = label
    }

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0
      lineEl.style.opacity = 0

      const label = chart.canvas.parentNode.dataset.label
      const value = chart.canvas.parentNode.dataset.value
      const format = chart.canvas.parentNode.dataset.format

      updateData(label, value, format)
      return
    }

    // Set Text
    if (tooltip.body) {
      const dataPoints = tooltip.dataPoints

      dataPoints.forEach((body) => {
        /*
        const PrevValue =  dataPoints[1].raw.y;
        const percentageDifff = (parseFloat((-dataPoints[1].raw.y + dataPoints[0].raw.y) * 100 / body.raw.y)).toFixed(2);

        const finalPercentage = ( percentageDifff !== 0) ? percentageDifff : '';
        percentageLayer.innerHTML = finalPercentage + '%';
        if (percentageLayer.classList.contains('true')) {
          percentageLayer.classList.remove('true');
        }
        if (percentageLayer.classList.contains('false')) {
          percentageLayer.classList.remove('false');
        }
        percentageLayer.classList.add(percentageDifff>0);

        const valueData = tooltip.title[0];
        const valueDataPrev = getPreviousYear(body.raw.x);
        const finalData = i === 0 ? valueData: valueDataPrev;

        */
        const labelLayer = label0
        const valueLayer = value0
        if (valueLayer.parentNode.classList.contains('true')) {
          valueLayer.parentNode.classList.remove('true')
        }
        if (valueLayer.parentNode.classList.contains('false')) {
          valueLayer.parentNode.classList.remove('false')
        }

        valueLayer.parentNode.classList.add(body.parsed.y > 0)
        labelLayer.innerHTML = formatDate(body.label, 'monthly')
        valueLayer.innerHTML = getFormat(body.parsed.y, 'percentage')
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
            return index % 2 === 0 ? getFormat(value, 'percentage') : ''
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
              props.monthlyData.datasets[0].data[value].x,
              'monthly',
            )
          },
        },
      },
    },
  }

  animationDuration = 0

  const [timeStatus, setTimeStatus] = useState('monthly')

  const dataCanvas = (canvas) => {
    const ctx = canvas.getContext('2d')
    const colorOrange = ctx.createLinearGradient(0, 0, ctx.canvas.width / 2, 0)
    const colorOrangeFuture = ctx.createLinearGradient(
      0,
      ctx.canvas.width / 2,
      0,
      0,
    )
    const colorOrangeFutureHover = ctx.createLinearGradient(
      0,
      ctx.canvas.width / 2,
      0,
      0,
    )
    const colorGreen = ctx.createLinearGradient(0, ctx.canvas.height / 4, 0, 0)
    const colorGreenHover = ctx.createLinearGradient(
      0,
      ctx.canvas.height / 4,
      0,
      0,
    )
    const colorGreenFuture = ctx.createLinearGradient(
      0,
      ctx.canvas.height / 4,
      0,
      0,
    )
    const colorGreenFutureHover = ctx.createLinearGradient(
      0,
      ctx.canvas.height / 4,
      0,
      0,
    )

    colorGreen.addColorStop(0, 'rgba(65,117,5, .6)')
    colorGreen.addColorStop(1, 'rgba(139,176,77, .6)')
    colorGreenHover.addColorStop(0, 'rgba(65,117,5, 1)')
    colorGreenHover.addColorStop(1, 'rgba(139,176,77, 1)')

    /* colorGreenFuture.addColorStop(0, 'rgba(65,117,5, .2)'); */
    /* colorGreenFuture.addColorStop(1, 'rgba(139,176,77, .2)'); */

    colorGreenFuture.addColorStop(0, 'rgba(22 ,109,193,.42)')
    colorGreenFuture.addColorStop(1, 'rgba(22 ,109,193,.42)')
    colorGreenFutureHover.addColorStop(0, 'rgba(22 ,109,193,1)')
    colorGreenFutureHover.addColorStop(1, 'rgba(22 ,109,193,1)')
    /* colorGreenFutureHover.addColorStop(0, 'rgba(65,117,5, 1)');
    colorGreenFutureHover.addColorStop(1, 'rgba(139,176,77, 1)'); */

    colorOrange.addColorStop(0, 'rgba(246,137,40, .82)')
    colorOrange.addColorStop(1, 'rgba(233,90,12, .82)')
    colorOrangeFuture.addColorStop(0, 'rgba(246,137,40, .2)')
    colorOrangeFuture.addColorStop(1, 'rgba(233,90,12, .2)')
    colorOrangeFutureHover.addColorStop(0, 'rgba(246,137,40, 1)')
    colorOrangeFutureHover.addColorStop(1, 'rgba(233,90,12, 1)')

    const datasets = []
    const myColors = []
    const myColorsHover = []
    const dataAmount = props.monthlyData.datasets.length
    const now = new Date()

    for (let i = 0; i < props.monthlyData.datasets[0].data.length; i++) {
      const date = new Date(props.monthlyData.datasets[0].data[i].x)
      if (props.monthlyData.datasets[0].data[i].y > 0) {
        myColors[i] = date > now ? colorGreenFuture : colorGreen
        myColorsHover[i] = date > now ? colorGreenFutureHover : colorGreenHover
      } else {
        myColors[i] = date > now ? colorOrangeFuture : colorOrange
        myColorsHover[i] = colorOrangeFutureHover
      }
    }

    for (let i = 0; i < dataAmount; i++) {
      datasets.push({
        type: 'bar',
        borderRadius: 10,
        backgroundColor: myColors,
        hoverBackgroundColor: myColorsHover,
        borderWidth: 0,
        fill: true,
        pointRadius: 0,
        borderDash: 0,
        data:
          timeStatus === 'weekly'
            ? props.weeklyData.datasets[i].data
            : props.monthlyData.datasets[i].data,
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
        <ExternalTooltipGrowth
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
        <Bar id={props.type} data={dataCanvas} options={options} type="bar" />
      </div>
    </>
  )
}

export default GraphLine
