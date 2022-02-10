import React from 'react'
import { Container } from 'reactstrap'
import Breadcrumb from '../components/Breadcrumb'
import Loading from '../components/Loading'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import LifeTimeValueComponent from '../components/ritmoInsights/LifeTimeValueComponent'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'

export const LifeTimeValue = () => {
  const {
    appData: { application },
  } = useSelector((state) => state)

  return (
    <Container>
      <Helmet>
        <title>RITMO Insights - LifeTime Value</title>
      </Helmet>
      <Breadcrumb previous="Ritmo Insights" actual="LifeTime Value" />
      {Object.keys(application).length && <LifeTimeValueComponent />}
    </Container>
  )
}

export default withAuthenticationRequired(LifeTimeValue, {
  loginOptions: {
    language: document.cookie.indexOf('locale=es') === -1 ? 'en' : 'es',
  },
  Redirecting: () => <Loading />,
})
