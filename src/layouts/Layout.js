import React, { Fragment } from 'react'
import Header from './../components/Header'

import { useAuth0 } from '@auth0/auth0-react'

const Layout = (props) => {
  const { isAuthenticated } = useAuth0()

  return (
    <div className="layout-initial">
      {isAuthenticated && (
        <>
          <Header />
        </>
      )}
      {props.children}
    </div>
  )
}

export default Layout
