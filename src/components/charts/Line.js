import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import DashboardButtons from '../dashboard/DashboardButtons'

const LineChart = (props) => {
  const [timeStatus, setTimeStatus] = useState('monthly')

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          padding: 20,
        },
        /*
        title: {
          display: true,
          color: 'black',
          font: {
            size: 20,
          },
          padding: 0,
          text: 'Values'
        },
        * */
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || ''

            if (label) {
              label += ': '
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: 'EUR',
              }).format(context.parsed.y)
            }
            if (context.parsed.x !== null) {
              console.log(context.dataset.data[context.parsed.x])
              // label += context.data[context.parsed.x];
            }

            let dataset = ''

            console.log(result)
            for (let i = 0; i < result.datasets.length; i++) {
              if (result.datasets[i].label === context.dataset.label) {
                dataset = result.datasets[i]
                console.log('')
                console.log(dataset.data[context.parsed.x])
                console.log('')

                // label += dataset.data[context.parsed.x];

                break
              }
            }
            console.log(context)
            return label
          },
        },
      } /*
    tooltip: {
      enabled: false,
      external: function(context) {
        // Tooltip Element
        var tooltipEl = document.getElementById('chartjs-tooltip');

        // Create element on first render
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.id = 'chartjs-tooltip';
          tooltipEl.innerHTML = '<table></table>';
          document.body.appendChild(tooltipEl);
        }

        // Hide if no tooltip
        var tooltipModel = context.tooltip;
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }

        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign);
        } else {
          tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
          return bodyItem.lines;
        }

        // Set Text
        if (tooltipModel.body) {
          var titleLines = tooltipModel.title || [];
          var bodyLines = tooltipModel.body.map(getBody);

          var innerHtml = '<thead>';

          titleLines.forEach(function(title) {
            innerHtml += '<tr><th>' + title + '</th></tr>';
          });
          innerHtml += '</thead><tbody>';

          bodyLines.forEach(function(body, i) {
            var colors = tooltipModel.labelColors[i];
            var style = 'background:' + colors.backgroundColor;
            style += '; border-color:' + colors.borderColor;
            style += '; border-width: 2px';
            var span = '<span style="' + style + '"></span>';
            innerHtml += '<tr><td>' + span + body + '</td></tr>';
          });
          innerHtml += '</tbody>';

          var tableRoot = tooltipEl.querySelector('table');
          tableRoot.innerHTML = innerHtml;
        }

        var position = context.chart.canvas.getBoundingClientRect();
        //var bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
       // tooltipEl.style.font = bodyFont.string;
        tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
        tooltipEl.style.pointerEvents = 'none';
      }

    } */,
    },
  }

  let result

  const dataCanvas = (canvas) => {
    const ctx = canvas.getContext('2d')
    const grd = ctx.createLinearGradient(0, 0, ctx.canvas.width / 2, 0)
    const grd2 = ctx.createLinearGradient(0, 0, ctx.canvas.width / 2, 0)
    const grd3 = ctx.createLinearGradient(0, 0, ctx.canvas.width / 2, 0)
    const grd4 = ctx.createLinearGradient(0, 0, ctx.canvas.width / 2, 0)
    grd.addColorStop(0, 'rgba(233,147,12, 0.2)')
    grd3.addColorStop(0, 'rgba(233,147,12, .8)')
    grd.addColorStop(1, 'rgba(233,90,12, 0.1)')
    grd3.addColorStop(1, 'rgba(233,90,12, .8)')

    grd2.addColorStop(0, 'rgba(82,159,239, 0.1)')
    grd4.addColorStop(0, 'rgba(82,159,239, .8)')
    grd2.addColorStop(1, 'rgba(65,129,236, 0.2)')
    grd4.addColorStop(1, 'rgba(65,129,236, .8)')

    result = {
      labels: timeStatus === 'weekly' ? props.weeklyLabel : props.monthlyLabel,
      datasets: [
        {
          type: 'line',
          label:
            timeStatus === 'weekly'
              ? props.weeklyData.datasets[0].label
              : props.monthlyData.datasets[0].label,
          borderColor: grd3,
          borderWidth: 1,
          fill: false,
          tension: 0.2,
          borderCapStyle: 'round',
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'rgba(0,0,0,0)',
          pointColor: 'rgba(0,0,0,0)',
          pointStrokeColor: '#fff',
          data:
            timeStatus === 'weekly'
              ? props.weeklyData.datasets[0].data
              : props.monthlyData.datasets[0].data,
        },
        {
          type: 'line',
          label:
            timeStatus === 'weekly'
              ? props.weeklyData.datasets[1].label
              : props.monthlyData.datasets[1].label,
          borderColor: grd4,
          borderWidth: 1,
          fill: false,
          tension: 0.2,
          borderCapStyle: 'round',
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'rgba(0,0,0,0)',
          pointColor: 'rgba(0,0,0,0)',
          pointStrokeColor: '#fff',
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
        <Line data={dataCanvas} options={options} />
      </div>
    </>
  )
}

export default LineChart
