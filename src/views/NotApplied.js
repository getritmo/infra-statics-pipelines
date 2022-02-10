import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CustomButton } from 'components/UI'
import translate from '../i18n/translate'
import RocketIcon from 'components/UI/Icons/RocketIcon'

export const NotApplied = () => {
  const storeStatus = useSelector((state) => state.appData)
  const onboardProduct = storeStatus
    ? storeStatus.application.onboard_product
      ? storeStatus.application.onboard_product
      : 'capital'
    : 'capital'

  const history = useHistory()

  return (
    <div className="layout-app__content">
      <img
        src="/images/svg/ritmo-logo.svg"
        alt="RITMO Logo"
        className="layout-app__header-logo"
      />

      <div className="default-container">
        <div className="message">
          <h1 className="title-h1">
            <RocketIcon classes="image-onboard" />
            {translate('views.applied.title')}
          </h1>

          {onboardProduct === 'insights' ? (
            <div>
              <div>{translate('views.applied.ritmo_insights_insights')}</div>
              <br />
              <br />
              <CustomButton
                label={translate('views.applied.accounts')}
                onClick={() => history.push('/ritmo-insights')}
              />
            </div>
          ) : (
            <div>
              <div>{translate('views.applied.ritmo_insights_text_1')}</div>
              <br />
              <br />
              <CustomButton
                label={translate('views.applied.ritmo_insights')}
                onClick={() => history.push('/ritmo-insights')}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotApplied
