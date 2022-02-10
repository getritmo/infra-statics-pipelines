import React from 'react'
import { useHistory } from 'react-router-dom'
import { defaultRoute, getCookie } from '../data/data'
import translate from '../i18n/translate'
import { useSelector } from 'react-redux'
import ChainIcon from 'components/UI/Icons/ChainIcon'
import RocketIcon from 'components/UI/Icons/RocketIcon'
import { CustomButton } from 'components/UI'

export const Applied = () => {
  const storeStatus = useSelector((state) => state.appData)
  const history = useHistory()
  const onboardProduct = storeStatus
    ? storeStatus.application.onboard_product
      ? storeStatus.application.onboard_product
      : 'capital'
    : 'capital'
  const isPublic = getCookie('special-content')

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

          {isPublic && (
            <h2 className="title-h2">
              {translate('views.applied.creation_success')}
            </h2>
          )}

          {!isPublic && (
            <>
              {onboardProduct === 'insights' ? (
                <>
                  <br />
                  <p className="text-1">
                    {translate('views.applied.insight.text1')}
                  </p>
                  <p className="text-1">
                    {translate('views.applied.insight.text2')}
                  </p>
                  <br />
                  <CustomButton
                    label={
                      <>
                        <span>{translate('views.applied.accounts')}</span>
                        <ChainIcon classes="image-button" />
                      </>
                    }
                    onClick={() => history.push('/ritmo-insights')}
                  />
                </>
              ) : (
                <>
                  <p className="text-1">
                    {translate('views.applied.subtitle')}
                  </p>
                  <br />
                  <br />
                  <h2 className="title-h2">
                    {translate('views.applied.accounts')}
                  </h2>
                  <p className="text-1">
                    {translate('views.applied.prepare_offer')}
                  </p>
                  <br />
                  <CustomButton
                    label={
                      <>
                        <span>{translate('views.applied.accounts')}</span>
                        <ChainIcon classes="image-button" />
                      </>
                    }
                    onClick={() => history.push(defaultRoute)}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Applied
