import React from 'react'
import translate from '../../i18n/translate'
import DefaultContent from './DefaultContent'
import FaqInfo from './FaqInfo'

const Xero = (props) => {
  return (
    <div className="panel__content--scroll--wrapper">
      <h2 className="panel__title">{translate('components.xero.header')}</h2>
      <div className="panel__content--scroll">
        <div className="panel__content--scroll--content">
          <DefaultContent closePanel={props.closePanel} />
        </div>
        <FaqInfo />
      </div>
    </div>
  )
}

export default Xero