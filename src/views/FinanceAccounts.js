import React from 'react'
import { Container } from 'reactstrap'
import Accounts from '../components/Accounts/Accounts'
import Breadcrumb from '../components/Breadcrumb'
import Loading, { LoadingSize } from '../components/Loading'
import { openPanel } from './../actions/global'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { getCookie } from '../data/data'
import translate from '../i18n/translate'
import FinanceIcon from 'components/UI/Icons/FinanceIcon'
import LockIcon from 'components/UI/Icons/LockIcon'
import { CustomButton } from 'components/UI'
import PrivacyBanner from 'components/Banners/PrivacyBanner'
import { useDispatch, useSelector } from 'react-redux'

export const FinanceAccounts = () => {
  const {
    appData: { application },
  } = useSelector((state) => state)
  const dispatch = useDispatch()

  const isLoading = !Object.keys(application).length
  const isPublic = getCookie('special-content')

  // TODO: Translate document titles.
  document.title = 'Finance Accounts - RITMO App'

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
    const url = '/company-details'
    document
      .querySelector('.menu-column__section a[href="' + url + '"]')
      .click()
  }

  return (
    <Container className="">
      <Breadcrumb
        previous={translate('views.finance_accounts.breadcrumb.previous')}
        actual={translate('views.finance_accounts.breadcrumb.current')}
      />
      <div className="layout-app__header">
        <h1 className="layout-app__title title-with-icon">
          <FinanceIcon classes={'header-icon'} />
          <span>{translate('views.finance_accounts.text1')}</span>
        </h1>
        <CustomButton
          variant="icon"
          position="left"
          size="small"
          icon={<LockIcon height={'70%'} width={'70%'} />}
          onClick={handleLockIconClick}
        />
      </div>

      {!isPublic && (
        <p className={'layout-app__p'}>
          {translate('views.finance_accounts.text2')}
        </p>
      )}

      <PrivacyBanner />

      {isLoading ? (
        <div className="spinner__container--top">
          <LoadingSize size={60} />
        </div>
      ) : (
        <Accounts type={'finance'} submitContinue={submitContinue} />
      )}
    </Container>
  )
}

export default withAuthenticationRequired(FinanceAccounts, {
  loginOptions: {
    language: document.cookie.indexOf('locale=es') === -1 ? 'en' : 'es',
  },
  Redirecting: () => <Loading />,
})
