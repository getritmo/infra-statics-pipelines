import React from 'react'
import Menu from '../components/Menu/Menu'
import HeaderApp from '../components/HeaderApp'
import Payments from 'views/admin/Payments'
import Company from 'views/admin/Company'
import Companies from 'views/admin/Companies'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setViewMode } from 'actions/appData'

const LayoutAdmin = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setViewMode('admin'))
  }, [dispatch])

  return (
    <div className="layout-app admin">
      <HeaderApp />
      <Menu />
      <Switch>
        <Route exact path="/admin/payments" component={Payments} />
        <Route
          exact
          path={[
            '/admin/companies/:companyId/:applicationId/my-advances/:offerId/:deploymentId',
            '/admin/companies/:companyId/:applicationId/graph',
            '/admin/companies/:companyId/:applicationId/payments',
            '/admin/companies/:companyId/:applicationId/ritmo-insights',
            '/admin/companies/:companyId/:applicationId/ltv',
            '/admin/companies/:companyId/:applicationId/scorecard',
            '/admin/companies/:companyId/:applicationId/my-advances',
            '/admin/companies/:companyId/:applicationId',
          ]}
          component={Company}
        />
        <Route exact path="/admin/companies" component={Companies} />
        <Redirect from="/admin/*" to={'/admin/companies'} />
      </Switch>
    </div>
  )
}

export default LayoutAdmin
