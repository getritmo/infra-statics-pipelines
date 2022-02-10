import React from 'react'
import PropTypes from 'prop-types'

const FinanceDocument = ({ width = 48, height = 48, fill, classes }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    width={width}
    fill={fill}
    viewBox="0 0 32 32"
    x="0px"
    y="0px"
    className={classes}
  >
    <g data-name="Layer 10">
      <path d="M25.71,8.29l-6-6A1,1,0,0,0,19,2H7A1,1,0,0,0,6,3V29a1,1,0,0,0,1,1H25a1,1,0,0,0,1-1V9A1,1,0,0,0,25.71,8.29ZM20,5.41,22.59,8H20ZM24,28H8V4H18V9a1,1,0,0,0,1,1h5Z" />
      <path d="M11,15a1,1,0,0,0,0,2h1a1,1,0,0,0,2,0,2,2,0,0,0,2-2V14a2,2,0,0,0-2-2H12V11h3a1,1,0,0,0,0-2H14a1,1,0,0,0-2,0,2,2,0,0,0-2,2v1a2,2,0,0,0,2,2h2v1Z" />
      <path d="M21,20H11a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z" />
      <path d="M21,24H11a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z" />
      <path d="M21,16H19a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z" />
      <path d="M18,13a1,1,0,0,0,1,1h2a1,1,0,0,0,0-2H19A1,1,0,0,0,18,13Z" />
    </g>
  </svg>
)

FinanceDocument.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.string,
}

export default FinanceDocument
