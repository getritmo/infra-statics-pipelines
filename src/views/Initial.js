import React, { useCallback, useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/Loading'
import Applied from './Applied'
import NotApplied from './NotApplied'
import { decode, inArray } from './../utils/userFunctions'
import { Redirect } from 'react-router-dom'
import translate from '../i18n/translate'
import { useSelector } from 'react-redux'
import { CustomButton } from 'components/UI'
let preventAnalytics = true

export const Initial = () => {
  // Alerts the linker parameter for the default tracker.
  const [redirectToDirectDebit, setRedirectToDirectDebit] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const appData = useSelector((state) => state.appData)

  const validateShowContent = useCallback(() => {
    return appData.application?.status ? true : false
  }, [appData])

  const validateRedirectToDebit = useCallback(() => {
    return appData.application?.status === 1021 ? true : false
  }, [appData])

  useEffect(() => {
    setRedirectToDirectDebit(validateRedirectToDebit())
    setShowContent(validateShowContent())
  }, [appData, validateRedirectToDebit, validateShowContent])

  const { logout } = useAuth0()

  const logoutWithRedirectFunction = () => {
    logout({
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: window.location.origin + '/registration',
    })
  }

  const [Contents] = useState(false)

  const userExists = localStorage.getItem('user-exists')

  const status = appData.application?.status || 0
  const decodeStatus = decode(status)
  const isNotValidUser = inArray(decodeStatus, 1)
  const isValidUser = inArray(decodeStatus, 2)

  if (isNotValidUser) {
    if (preventAnalytics) {
      preventAnalytics = false
      window.dataLayer.push({ event: 'App Register Not Qualified' })
    }
  } else if (isValidUser) {
    if (preventAnalytics) {
      preventAnalytics = false
      window.dataLayer.push({ event: 'App Register' })
    }
  }

  return (
    <>
      {userExists && (
        <Container>
          <div className="layout-app__content">
            <img
              src="/images/svg/ritmo-logo-blue.svg"
              alt="RITMO Logo"
              className="layout-app__header-logo"
            />

            <div className="default-container">
              <div className="message">
                <h1 className="title-h1">{translate('views.initial.text1')}</h1>

                <p className="text-1">{translate('views.initial.text2')}</p>
                <br />
                <hr className="hr" />
                <br />
                <br />
                <CustomButton
                  label={translate('views.initial.text3')}
                  onClick={() => logoutWithRedirectFunction()}
                />
              </div>
            </div>
          </div>
        </Container>
      )}

      {showContent && (
        <Container className="">
          <>
            {redirectToDirectDebit && <Redirect to="/direct-debit" />}
            {!Contents && userExists && (
              <div>
                <div className="layout-app__content">
                  <img
                    src="/images/svg/ritmo-logo.svg"
                    alt="RITMO Logo"
                    className="layout-app__header-logo"
                  />

                  <div className="default-container">
                    <div className="message">
                      <h1 className="title-h1">
                        {translate('views.initial.text1')}
                      </h1>

                      <p className="text-1">
                        {translate('views.initial.text2')}
                      </p>
                      <br />
                      <hr className="hr" />
                      <br />
                      <br />
                      <CustomButton
                        label={translate('views.initial.text')}
                        onClick={() => logoutWithRedirectFunction()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isNotValidUser && <NotApplied />}
            {isValidUser && <Applied />}
          </>
        </Container>
      )}
    </>
  )
}

export default withAuthenticationRequired(Initial, {
  loginOptions: {
    language: document.cookie.indexOf('locale=es') === -1 ? 'en' : 'es',
  },
  Redirecting: () => <Loading />,
})
