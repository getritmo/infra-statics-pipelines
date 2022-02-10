import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const ProtectedRoute = ({ component: Component, ...args }) => {
  const { isAuthenticated } = useAuth0()
  return (
    <Route
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to={'/'} />
      }
      {...args}
    />
  )
}

export default ProtectedRoute
