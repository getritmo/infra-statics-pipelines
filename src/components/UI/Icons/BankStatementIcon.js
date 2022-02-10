import React from 'react'
import PropTypes from 'prop-types'

const BankStatementIcon = ({ width = 48, height = 48, fill, classes }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    height={height}
    width={width}
    fill={fill}
    viewBox="0 0 48 48"
    version="1.1"
    x="0px"
    y="0px"
    className={classes}
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g fillRule="nonzero" fill={fill}>
        <g>
          <path d="M5,4.00989318 C5,1.79529033 6.79642476,0 9.00002553,0 L40.9999745,0 C43.2091276,0 45,1.79405245 45,4.00989318 L45,43.9901068 C45,46.2047097 43.2035752,48 40.9999745,48 L9.00002553,48 C6.79087243,48 5,46.2059475 5,43.9901068 L5,4.00989318 Z M9,43.9901068 C9,43.9983938 40.9999745,44 40.9999745,44 C40.9950047,44 41,4.00989318 41,4.00989318 C41,4.00160623 9.00002553,4 9.00002553,4 C9.00499535,4 9,43.9901068 9,43.9901068 Z M13,14 C13,12.8954305 13.8982124,12 14.9907951,12 L31.0092049,12 C32.1086907,12 33,12.8877296 33,14 C33,15.1045695 32.1017876,16 31.0092049,16 L14.9907951,16 C13.8913093,16 13,15.1122704 13,14 Z M13,22 C13,20.8954305 13.8982124,20 14.9907951,20 L31.0092049,20 C32.1086907,20 33,20.8877296 33,22 C33,23.1045695 32.1017876,24 31.0092049,24 L14.9907951,24 C13.8913093,24 13,23.1122704 13,22 Z M13,30 C13,28.8954305 13.9019504,28 15.0085302,28 L22.9914698,28 C24.1007504,28 25,28.8877296 25,30 C25,31.1045695 24.0980496,32 22.9914698,32 L15.0085302,32 C13.8992496,32 13,31.1122704 13,30 Z" />
        </g>
      </g>
    </g>
  </svg>
)

BankStatementIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fill: PropTypes.string,
  classes: PropTypes.string,
}

export default BankStatementIcon
