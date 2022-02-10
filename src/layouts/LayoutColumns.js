import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap'

export const LayoutColumns = ({ children }) => {
  return (
    <div className="layout-columns">
      <div className="layout-columns__content">
        <img
          src="/images/svg/white-background.svg"
          alt=""
          className="layout-columns__background"
        />

        <div className="layout-columns__mobile-background-top" />
        <div className="layout-columns__mobile-background-bottom" />

        <Container className="">{children}</Container>
      </div>
    </div>
  )
}

LayoutColumns.propTypes = {
  children: PropTypes.array.isRequired,
}

export default LayoutColumns
