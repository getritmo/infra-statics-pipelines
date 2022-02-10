import React from 'react'
import translate from '../i18n/translate'

export const NotApplied = () => {
  return (
    <div className="layout-app__content">
      <img
        src="/images/svg/ritmo-logo.svg"
        alt="RITMO Logo"
        className="layout-app__header-logo"
      />

      <div className="default-container">
        <div className="message">
          <h1 className="title-h1">{translate('views.validating.text1')}</h1>

          <p className="text-1">{translate('views.validating.text2')}</p>
          <p className="text-1">{translate('views.validating.text3')}</p>
          <p className="text-1">{translate('views.validating.text4')}</p>
          <p className="text-1">{translate('views.validating.text5')}</p>

          <br />
          <a href="https://www.getritmo.com/" className="btn btn-secondary">
            <span>{translate('views.validating.text6')}</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default NotApplied
