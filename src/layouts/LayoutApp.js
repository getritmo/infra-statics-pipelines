import React from 'react'
import Menu from 'components/Menu/Menu'
import SalesAccounts from 'views/SalesAccounts'
import MarketingAccounts from 'views/MarketingAccounts'
import FinanceAccounts from 'views/FinanceAccounts'
import CompanyInfo from 'views/CompanyInfo'
import Offer from 'views/Offer'
import VerificationAdmins from 'views/VerificationAdmins'
import ContractSignal from 'views/ContractSignal'
import DirectDebit from 'views/DirectDebit'
import MyAdvance from 'views/MyAdvance'
import { useAuth0 } from '@auth0/auth0-react'
import HeaderApp from 'components/HeaderApp'
import { Route, Switch } from 'react-router-dom'
import { LoadingSize } from 'components/Loading'
import { Container } from 'reactstrap'

const LayoutApp = ({ loading }) => {
  const { isAuthenticated } = useAuth0()

  return (
    <div className="layout-app">
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
              <Route exact path="/sales-accounts" component={SalesAccounts} />
              <Route
                exact
                path="/sales-accounts/:any"
                component={SalesAccounts}
              />
              <Route
                exact
                path="/sales-accounts/connector/:any"
                component={SalesAccounts}
              />
              <Route
                exact
                path="/marketing-accounts"
                component={MarketingAccounts}
              />
              <Route
                exact
                path="/marketing-accounts/connector/:any"
                component={MarketingAccounts}
              />
              <Route
                exact
                path="/marketing-accounts/:any"
                component={MarketingAccounts}
              />
              <Route
                exact
                path="/finance-accounts"
                component={FinanceAccounts}
              />
              <Route
                exact
                path="/finance-accounts/:any"
                component={FinanceAccounts}
              />
              <Route
                exact
                path="/finance-accounts/connector/:any"
                component={FinanceAccounts}
              />
              <Route path="/company-details" component={CompanyInfo} />
              <Route path="/offer" component={Offer} />
              <Route path="/contract-signal" component={ContractSignal} />
              <Route
                path="/verification-admins"
                component={VerificationAdmins}
              />
              <Route exact path="/direct-debit" component={DirectDebit} />
              <Route
                path="/my-advances/:offerId/:deploymentId"
                component={MyAdvance}
              />
              <Route path="/direct-debit/:any" component={DirectDebit} />
            </Switch>
          )}
        </>
      )}
    </div>
  )
}

export default LayoutApp
