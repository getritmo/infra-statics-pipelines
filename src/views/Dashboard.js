import React from 'react'

import Loading from '../components/Loading'
import { withAuthenticationRequired } from '@auth0/auth0-react'

export const Dashboard = () => {
  return <></>
}

export default withAuthenticationRequired(Dashboard, {
  loginOptions: {
    language: document.cookie.indexOf('locale=es') === -1 ? 'en' : 'es',
  },
  Redirecting: () => <Loading />,
})
