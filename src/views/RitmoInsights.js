import React from 'react'
import { Container } from 'reactstrap'
import Breadcrumb from '../components/Breadcrumb'
import Loading, { LoadingSize } from '../components/Loading'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import RitmoInsightsComponent from '../components/ritmoInsights/RitmoInsights'
import { Helmet } from 'react-helmet'
import { useIntl } from 'react-intl'
import { useSelector } from 'react-redux'

export const RitmoInsights = () => {
  const {
    appData: { application },
  } = useSelector((state) => state)

  const intl = useIntl()

  let isLoaded = !!Object.keys(application).length

  return (
    <Container>
      <Helmet>
        <title>{`RITMO Insights - ${intl.formatMessage({
          id: 'components.menu.dashboard',
        })}`}</title>
      </Helmet>
      <Breadcrumb previous="Ritmo Insights" actual="Dashboard" />

      {isLoaded ? (
        <RitmoInsightsComponent />
      ) : (
        <div className={'spinner__container'}>
          <LoadingSize size={60} />
        </div>
      )}
    </Container>
  )
}

export default withAuthenticationRequired(RitmoInsights, {
  loginOptions: {
    language: document.cookie.indexOf('locale=es') === -1 ? 'en' : 'es',
  },
  Redirecting: () => <Loading />,
})
