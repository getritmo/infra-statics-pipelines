import React, { Fragment } from 'react'

import { useAuth0 } from '@auth0/auth0-react'
import translate from '../i18n/translate'
import LanguageSelector from './LanguageSelector'
import { useIntl } from 'react-intl'

const LoginBar = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  const intl = useIntl()

  const params = {
    language: intl.locale.substr(0, 2),
  }

  const storeLoginAction = () => {
    loginWithRedirect(params)
    localStorage.setItem('action', 'login')
  }

  return (
    <>
      {!isAuthenticated && (
        <div className="nav-container">
          <div className="layout-columns__login">
            <img
              src="/images/svg/ritmo-logo.svg"
              className="layout-columns__main-logo"
              alt=""
            />

            <div className="layout-columns__links">
              <a href="/initial" onClick={storeLoginAction} className="link">
                {translate('components.login_bar.login')}
              </a>
              <LanguageSelector position="header" />
            </div>
          </div>
        </div>
      )}

      {isAuthenticated && (
        <div className="nav-container">
          <div className="layout-columns__login">
            <span />
            {/* <a href={process.env.REACT_APP_AUTH0_LOGOUT_URL}
                            onClick={() =>logoutWithRedirectFunction}
                            className="link">Log out</a> */}
          </div>
        </div>
      )}
    </>
  )
}

export default LoginBar
