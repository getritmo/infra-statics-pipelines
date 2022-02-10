import React, { Fragment } from 'react'

import { Redirect } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { setCookie } from '../data/data'

const query = new URLSearchParams(window.location.search)

const publicToken = query !== undefined ? query.get('public_token') : null
if (publicToken) {
  localStorage.setItem('public_token', publicToken)
}

const SignUpShopify = () => {
  const { isLoading } = useAuth0()

  localStorage.setItem('special-content', true)

  setCookie('special-content', true)

  if (isLoading) {
    return null
  }

  const redirectToRegistration = true

  return <>{redirectToRegistration && <Redirect to="/registration" />}</>
}

export default SignUpShopify
