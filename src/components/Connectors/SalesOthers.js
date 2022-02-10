import React from 'react'
import DefaultContent from './DefaultContent'
import FaqInfo from './FaqInfo'
const SalesOthers = (props) => {
  return (
    <div className="panel__content--scroll--wrapper">
      <div className="panel__content--scroll">
        <div className="panel__content--scroll--content">
          <DefaultContent closePanel={props.closePanel} />
        </div>
      </div>
      <FaqInfo />
    </div>
  )
}

export default SalesOthers
