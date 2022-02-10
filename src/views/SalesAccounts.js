import React from 'react'
import { Container } from 'reactstrap'
import Accounts from '../components/Accounts/Accounts'
import Breadcrumb from '../components/Breadcrumb'
import Loading, { LoadingSize } from '../components/Loading'
import { openPanel } from './../actions/global'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { getCookie } from '../data/data'
import translate from '../i18n/translate'
import SalesIcon from 'components/UI/Icons/SalesIcon'
import LockIcon from 'components/UI/Icons/LockIcon'
import { CustomButton } from 'components/UI'
import PrivacyBanner from 'components/Banners/PrivacyBanner'
import { useDispatch, useSelector } from 'react-redux'

export const SalesAccounts = () => {
  const {
    appData: { application },
  } = useSelector((state) => state)
  const dispatch = useDispatch()

  const isLoading = !Object.keys(application).length
  const isPublic = getCookie('special-content')

  // TODO: Translate document titles.
  document.title = 'Sales Accounts - RITMO App'

  const handleLockIconClick = () => {
    dispatch(
      openPanel({
        type: 'info',
        subtype: 'privacy',
        mode: 'read',
      }),
    )
  }

  // Action to continue to next page
  const submitContinue = () => {
    const url = '/marketing-accounts'
    document
      .querySelector('.menu-column__section a[href="' + url + '"]')
      .click()
  }

  return (
    <Container>
      <Breadcrumb
        previous={translate('views.sales_accounts.breadcrumb.previous')}
        actual={translate('views.sales_accounts.breadcrumb.current')}
      />
      <div className="layout-app__header">
        <h1 className="layout-app__title title-with-icon">
          <SalesIcon classes={'header-icon'} />
          <span>{translate('views.sales_accounts.text1')}</span>
        </h1>
        <CustomButton
          variant="icon"
          position="left"
          size="small"
          icon={<LockIcon height={'70%'} width={'70%'} />}
          onClick={handleLockIconClick}
        />
      </div>

      {!isPublic && <p>{translate('views.sales_accounts.text2')}</p>}

      <PrivacyBanner />

      {isLoading ? (
        <div className="spinner__container--top">
          <LoadingSize size={46} />
        </div>
      ) : (
        <Accounts type={'sales'} submitContinue={submitContinue} />
      )}
    </Container>
  )
}

export default withAuthenticationRequired(SalesAccounts, {
  loginOptions: {
    language: document.cookie.indexOf('locale=es') === -1 ? 'en' : 'es',
  },
  Redirecting: () => <Loading />,
})
