import React from 'react'
import PropTypes from 'prop-types'

const LockIcon = ({ height = 48, width = 48, classes }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={'0 0 48 48'}
    width={width}
    height={height}
    className={classes}
  >
    <path
      className={'asa'}
      fill="#FB8C00"
      d="M24,4c-5.5,0-10,4.5-10,10v4h4v-4c0-3.3,2.7-6,6-6s6,2.7,6,6v4h4v-4C34,8.5,29.5,4,24,4z"
    />
    <path
      className={'body'}
      fill="#FB8C00"
      d="M36,44H12c-2.2,0-4-1.8-4-4V22c0-2.2,1.8-4,4-4h24c2.2,0,4,1.8,4,4v18C40,42.2,38.2,44,36,44z"
    />
  </svg>
)

LockIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.string,
}

export default LockIcon
