import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Router,
  Route,
  Switch,
  useHistory,
  useLocation,
  Redirect,
} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'
// Daterange picker styles
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
//
import './assets/scss/style.scss'
import Loading from './components/Loading'
import LayoutAdmin from './layouts/LayoutAdmin'
import UserView from 'views/UserView'
import Login from './views/Login'
import Authentication from './views/Authentication'
import SignUpShopify from './views/SignUpShopify'
import { useIntl } from 'react-intl'

// styles
import './App.css'
import Panel from 'components/Panel/Panel'
import Overlay from 'components/Overlay'
import IframeURL from 'components/IframeURL/IframeUrl'
import { setUser, setViewMode } from 'actions/appData'
import { RutterContext } from 'context/RutterContext'
import { Helmet } from 'react-helmet'
import useRutter from 'hooks/useRutter'
import useAsyncActions from 'hooks/useAsyncActions'
import useAPI from 'hooks/useAPI'
import ProtectedRoute from 'components/ProtectedRoute'
import { defaultRoute, userRoutes } from 'data/data'

function validateEmailDomain(email) {
  // returns true if email domain is 'getritmo.com'
  const domain = email.split('@')[1]
  return domain.toLowerCase() === 'getritmo.com'
}

const App = () => {
  const { application_id } = useSelector((state) => state.appData.application)
  const [loading, setLoading] = useState(true)

  const { isLoading, error, user } = useAuth0()

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const locationRef = useRef(location)
  const { saveApplication } = useAsyncActions()
  const { apiCallApplications } = useAPI()

  const { openRutter } = useRutter(application_id)
  const [favicon, setFavicon] = useState('/favicon@2x.png')
  const [manifest, setManifest] = useState('/manifest.json')

  if (typeof window !== 'undefined') {
    const usesDarkMode =
      window.matchMedia('(prefers-color-scheme: dark)').matches || false

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => switchIcon(e.matches))

    switchIcon(usesDarkMode)
  }

  function switchIcon(usesDarkMode) {
    if (usesDarkMode) {
      setTimeout(() => {
        setFavicon('/favicon-dark.png')
        setManifest('/manifest-dark.json')
      }, 100)
    } else {
      setTimeout(() => {
        setFavicon('/favicon-light.png')
        setManifest('/manifest-light.json')
      }, 100)
    }
  }

  const redirectTo = useCallback(
    (path, state) => {
      history.push(path, state)
    },
    [history],
  )

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true)
        let response = await apiCallApplications('', 'GET')
        let { application, user: appUser } = response
        let route = locationRef.current.pathname.split('/')[1]

        // Checks if th user is admin
        appUser.is_admin = user['https://getritmo.com/roles'].includes('admin')
        appUser.is_admin_finance =
          user['https://getritmo.com/roles'].includes('admin-finance')

        if (appUser.is_admin || validateEmailDomain(appUser.email)) {
          globalThis.dataLayer.push({
            user_type: 'admin',
          })
        }

        dispatch(setViewMode('user'))
        dispatch(setUser(appUser))
        saveApplication(application)

        const binState = (application.status >>> 0)
          .toString(2)
          .split('')
          .reverse()
          .join('')

        switch (true) {
          case binState.charAt(2) === '1':
            if (route !== 'initial') {
              if (locationRef.current.state?.showInitial) redirectTo('/initial')
              if (route === 'registration' || route === '') {
                window.dataLayer.push({ event: 'App Login' })
                switch (application.obboard_product) {
                  case 'insights':
                    redirectTo('/ritmo-insigths')
                    break
                  default:
                    redirectTo(defaultRoute)
                    break
                }
              }
            }
            break
          case binState.charAt(1) === '1' &&
            route !== 'ritmo-insights' &&
            route !== 'initial':
            redirectTo('/ritmo-insights')
            break
          default:
            break
        }
      } catch (e) {
        redirectTo('/registration', { createUser: true })
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    if (!isLoading) {
      if (user) {
        init()
      } else {
        setLoading(false)
      }
    }
  }, [
    saveApplication,
    apiCallApplications,
    dispatch,
    user,
    redirectTo,
    isLoading,
  ])

  const isAdmin = user
    ? user['https://getritmo.com/roles'].indexOf('admin') !== -1
    : false
  const isRIUser = user
    ? user['https://getritmo.com/roles'].indexOf('ritmo-insights') !== -1
    : false

  const intl = useIntl()

  if (isAdmin || isRIUser) {
    localStorage.setItem('secret', 'testing-dashboard')
  }

  if (error) {
    return <div>Oops... {error.message}</div>
  }

  if (loading) {
    return <Loading />
  }

  return (
    <RutterContext.Provider value={{ openRutter }}>
      <Helmet>
        <link rel="shortcut icon" id="favicon" href={favicon} />
        <link rel="manifest" id="manifest" href={manifest} />
      </Helmet>
      <Router history={history}>
        <base id="lang" lang={intl.locale.substr(0, 2)} />
        <div id="app" className="">
          <Panel />
          <Overlay />
          <IframeURL />
          <Switch>
            <Route path={'/'} exact component={Login} />
            <Route path="/sign-up" exact component={SignUpShopify} />
            <Route path="/registration" exact component={Authentication} />
            <Route
              path="/registration/existing-customer/:any"
              exact
              component={Authentication}
            />

            {isAdmin && (
              <ProtectedRoute path={'/admin'} component={LayoutAdmin} />
            )}

            <ProtectedRoute
              path={[
                ...userRoutes,
                '/ritmo-insights',
                '/initial',
                '/dashboard',
              ]}
              component={UserView}
            />
            <Redirect from="*" to={defaultRoute} />
          </Switch>
        </div>
      </Router>
    </RutterContext.Provider>
  )
}

export default App
