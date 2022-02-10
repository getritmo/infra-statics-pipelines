import React from 'react'
import PropTypes from 'prop-types'

const PlusIcon = ({ height = 48, width = 48, classes, color = '#000' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    height={height}
    width={width}
    viewBox="0 0 76 76"
    className={classes}
  >
    <g>
      <path
        d="m38,0c-2.7615,0 -5,2.2386 -5,5l0,28.0001l-28,0c-2.7614,0 -5,2.2385 -5,5.00002c0,2.7615 2.2386,5 5,5l28,0l0,27.9999c0,2.7614 2.2385,5 5,5c2.7615,0 5,-2.2386 5,-5l0,-27.9999l28,0c2.7614,0 5,-2.2385 5,-5c0,-2.76152 -2.2386,-5.00002 -5,-5.00002l-28,0l0,-28.0001c0,-2.7614 -2.2385,-5 -5,-5z"
        fill={color}
        fillOpacity="1"
        overflow="visible"
        stroke="none"
        marker="none"
        display="inline"
        visibility="visible"
      />
    </g>
  </svg>
)

PlusIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.string,
  color: PropTypes.string,
}

export default PlusIcon
