import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import DashboardButtons from '../dashboard/DashboardButtons'

const options = {
  maintainAspectRatio: false,
  responsive: true,
  tooltips: {
    displayColors: true,
    callbacks: {
      mode: 'x',
    },
  },
  scales: {
    xAxes: [
      {
        stacked: true,
      },
    ],
    yAxes: [
      {
        stacked: true,
      },
    ],
  },
  legend: { position: 'bottom' },
}

const StackedBar = (props) => {
  const [timeStatus, setTimeStatus] = useState('monthly')

  const dataCanvas = (canvas) => {
    const ctx = canvas.getContext('2d')
    const grd = ctx.createLinearGradient(0, 0, ctx.canvas.width / 2, 0)
    const grd2 = ctx.createLinearGradient(0, 0, ctx.canvas.width / 2, 0)
    const grd3 = ctx.createLinearGradient(0, 0, ctx.canvas.width / 2, 0)
    const grd4 = ctx.createLinearGradient(0, 0, ctx.canvas.width / 2, 0)
    grd.addColorStop(0, 'rgba(233,147,12, 0.8)')
    grd.addColorStop(1, 'rgba(233,90,12, 0.6)')
    grd2.addColorStop(0, 'rgba(65,129,236, 0.8)')
    grd2.addColorStop(1, 'rgba(82,159,239, 0.6)')

    grd3.addColorStop(0, 'rgba(233,147,12, .8)')
    grd3.addColorStop(1, 'rgba(233,90,12, .8)')
    grd4.addColorStop(0, 'rgba(82,159,239, .8)')
    grd4.addColorStop(1, 'rgba(65,129,236, .8)')

    const result = {
      labels: timeStatus === 'weekly' ? props.weeklyLabel : props.monthlyLabel,
      datasets: [
        {
          type: 'bar',
          label:
            timeStatus === 'weekly'
              ? props.weeklyData.datasets[0].label
              : props.monthlyData.datasets[0].label,
          backgroundColor: grd,
          stack: '',
          borderWidth: 0,
          fill: true,
          data:
            timeStatus === 'weekly'
              ? props.weeklyData.datasets[0].data
              : props.monthlyData.datasets[0].data,
        },
        {
          type: 'bar',
          stack: '',
          label:
            timeStatus === 'weekly'
              ? props.weeklyData.datasets[1].label
              : props.monthlyData.datasets[1].label,
          backgroundColor: grd2,
          borderWidth: 0,
          fill: true,
          data:
            timeStatus === 'weekly'
              ? props.weeklyData.datasets[1].data
              : props.monthlyData.datasets[1].data,
        },
      ],
    }
    return result
  }

  const timeUpdate = (item) => {
    setTimeStatus(item)
  }

  return (
    <>
      <DashboardButtons active={timeStatus} setTimeStatus={timeUpdate} />
      <div className="dashboard__cell">
        <Bar data={dataCanvas} options={options} type="bar" />
      </div>
    </>
  )
}

export default StackedBar
