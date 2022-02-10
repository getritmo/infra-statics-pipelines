import React, { Fragment } from 'react'
import DefaultContent from './DefaultContent'
import FaqInfo from './FaqInfo'
const MarketingOthers = (props) => {
  return (
    <>
      <div className="panel__content--scroll--wrapper">
        <div className="panel__content--scroll">
          <div className="panel__content--scroll--content">
            <DefaultContent closePanel={props.closePanel} />
          </div>
          <FaqInfo />
        </div>
      </div>
    </>
  )
}

export default MarketingOthers
