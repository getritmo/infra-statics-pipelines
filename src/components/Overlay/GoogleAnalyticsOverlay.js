import React from 'react'
import translate from 'i18n/translate'

export const GoogleAnalyticsOverlay = () => {
  return (
    <div className="overlay">
      <div className="overlay__container">
        <img
          src="/images/svg/ritmo-logo-blue.svg"
          alt=""
          className="overlay__img"
        />
        <h1 className="overlay__title">
          {translate('components.google_analytics_overlay')}
        </h1>
        <p>
          <div className="min-logo">
            <img
              src="/images/svg/ritmo-logo-min-circle.svg"
              alt=""
              width="72"
              height="72"
              className="logo-circle"
            />

            <img
              src="/images/svg/ritmo-logo-min-ball.svg"
              alt=""
              width="72"
              height="72"
              className="logo-ball"
            />
          </div>
        </p>
      </div>
    </div>
  )
}

export default GoogleAnalyticsOverlay
