import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from 'components/Loading'
import { Helmet } from 'react-helmet'
import { Container } from 'reactstrap'
import Breadcrumb from 'components/Breadcrumb'
import { CompanyInfo } from 'components/admin/CompanyInfo'
import {
  CompanyApplication,
  CompanyOpenBanking,
  CompanyPayments,
  CompanyRI,
  CompanyLTV,
  CompanyScoreCard,
  CompanyMyAdvances,
} from 'components/admin/CompanyItems'
import { useLocation } from 'react-router'
import translate from 'i18n/translate'
import useAsyncActions from 'hooks/useAsyncActions'

const Company = () => {
  const company = useSelector((state) => state.appData.company)
  const dispatch = useDispatch()
  const { getCompanyById, getApplicationById, getFeaturesById } =
    useAsyncActions()

  const location = useLocation()
  const route = location.pathname.split('/')[5]
  const { companyId, applicationId } = useParams()

  const [loadingApplication, setLoadingApplication] = useState(true)
  const [loadingCompany, setLoadingCompany] = useState(true)

  useEffect(() => {
    getCompanyById(companyId, () => setLoadingCompany(false))
    getApplicationById(applicationId, () => setLoadingApplication(false))
    getFeaturesById(companyId, 'admin', () => setLoadingApplication(false))
  }, [
    getCompanyById,
    getApplicationById,
    getFeaturesById,
    dispatch,
    companyId,
    applicationId,
  ])

  const tabname = {
    graph: 'Openbanking',
    payments: translate('common.Payments'),
    ['ritmo-insights']: 'RITMO Insights',
    ltv: 'Life Time Value',
    scorecard: 'Score Card',
    ['my-advances']: 'My Advances',
  }

  const CompanyContent = () => {
    switch (route) {
      case undefined:
        return <CompanyApplication />
      case 'graph':
        return <CompanyOpenBanking />
      case 'payments':
        return <CompanyPayments />
      case 'ritmo-insights':
        return <CompanyRI />
      case 'ltv':
        return <CompanyLTV />
      case 'scorecard':
        return <CompanyScoreCard />
      case 'my-advances':
        return <CompanyMyAdvances />
      default:
        return null
    }
  }
  return (
    <>
      <Helmet>
        <title>RITMO Admin - Company Item {company?.name || ''}</title>
      </Helmet>
      <Container className="">
        <Breadcrumb
          previous="Admin"
          actual="Companies"
          previousUrl="/admin/companies"
          id={company?.name || ''}
          extra={tabname[route] && company?.name ? company.name : ''}
          extraUrl={
            company ? `/admin/companies/${companyId}/${applicationId}` : ''
          }
          extraId={tabname[route]}
        />

        {!loadingCompany && !loadingApplication && <CompanyInfo />}

        {loadingCompany || loadingApplication ? (
          <section className="accounts__section admin">
            <Loading />
          </section>
        ) : (
          <CompanyContent />
        )}
      </Container>
    </>
  )
}

export default withAuthenticationRequired(Company, {
  loginOptions: {
    language: document.cookie.indexOf('locale=es') === -1 ? 'en' : 'es',
  },
  Redirecting: () => <Loading />,
})
