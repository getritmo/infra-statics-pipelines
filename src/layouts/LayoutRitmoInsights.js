import React from 'react'
import Menu from 'components/Menu/Menu'
import HeaderApp from 'components/HeaderApp'
import RitmoInsights from 'views/RitmoInsights'
import Forecast from 'views/Forecast'
import LifeTimeValue from 'views/LifeTimeValue'
import { useAuth0 } from '@auth0/auth0-react'
import { Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'
import { LoadingSize } from 'components/Loading'

const LayoutRitmoInsights = ({ loading }) => {
  const { isAuthenticated } = useAuth0()

  return (
    <div className="layout-app ritmo-insights">
      {isAuthenticated && (
        <>
          <HeaderApp />
          <Menu />
          {loading ? (
            <Container>
              <div className={'spinner__container'}>
                <LoadingSize size={60} />
              </div>
            </Container>
          ) : (
            <Switch>
              <Route
                exact
                path="/ritmo-insights/life-time-value"
                component={LifeTimeValue}
              />
              <Route exact path="/ritmo-insights" component={RitmoInsights} />
              <Route
                exact
                path="/ritmo-insights/forecast"
                component={Forecast}
              />
              <Route
                path="/ritmo-insights/connector/:any"
                component={RitmoInsights}
              />
            </Switch>
          )}
        </>
      )}
    </div>
  )
}

export default LayoutRitmoInsights
