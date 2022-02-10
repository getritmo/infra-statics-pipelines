import React from 'react'
import { Container } from 'reactstrap'
import Loading from '../components/Loading'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { useIntl } from 'react-intl'
import { MyAdvancesComponent } from '../components/user/MyAdvance/MyAdvancesComponent'
import { Helmet } from 'react-helmet'

export const MyAdvanceResume = () => {
  const { formatMessage } = useIntl()

  return (
    <>
      <Container className="">
        <Helmet>
          <title>
            {`RITMO - ${formatMessage({ id: 'views.my_advances.title' })}`}
          </title>
        </Helmet>

        <MyAdvancesComponent />
      </Container>
    </>
  )
}

export default withAuthenticationRequired(MyAdvanceResume, {
  loginOptions: {
    language: document.cookie.indexOf('locale=es') === -1 ? 'en' : 'es',
  },
  Redirecting: () => <Loading />,
})
