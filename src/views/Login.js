import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useIntl } from 'react-intl'
import { LoadingSize } from 'components/Loading'
import { defaultRoute } from 'data/data'
import { Redirect } from 'react-router-dom'

const Login = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
  const intl = useIntl()

  if (isLoading) {
    return (
      <div className={'spinner'}>
        <LoadingSize size={60} />
      </div>
    )
  }

  if (!isAuthenticated) {
    loginWithRedirect({
      screen_hint: 'login',
      language: intl.locale.split('-')[0],
    })
  } else {
    return <Redirect to={defaultRoute} />
  }
}

export default Login
