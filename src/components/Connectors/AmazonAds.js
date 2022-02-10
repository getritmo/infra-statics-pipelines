import React from 'react'
import translate from '../../i18n/translate'
import DefaultContent from './DefaultContent'
import FaqInfo from './FaqInfo'

const AmazonAds = (props) => {
  return (
    <div className="panel__content--scroll--wrapper">
      <h2 className="panel__title">
        {translate('components.amazon_ads.header')}
      </h2>
      <div className="panel__content--scroll">
        <div className="panel__content--scroll--content">
          <p>
            <DefaultContent closePanel={props.closePanel} />
          </p>
        </div>
        <FaqInfo />
      </div>
    </div>
  )
}

export default AmazonAds
