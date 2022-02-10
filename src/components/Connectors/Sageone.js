import React from 'react'
import DefaultContent from './DefaultContent'
import FaqInfo from './FaqInfo'
import translate from '../../i18n/translate'

const Sageone = (props) => {
  return (
    <div className="panel__content--scroll--wrapper">
      <h2 className="panel__title">{translate('components.sageone.header')}</h2>
      <div className="panel__content--scroll">
        <div className="panel__content--scroll--content">
          <DefaultContent closePanel={props.closePanel} />
        </div>
        <FaqInfo />
      </div>
    </div>
  )
}

export default Sageone
