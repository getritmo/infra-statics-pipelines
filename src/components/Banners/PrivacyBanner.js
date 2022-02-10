import React from 'react'
import { CustomButton } from 'components/UI'
import LockIcon from 'components/UI/Icons/LockIcon'
import translate from 'i18n/translate'
import { useDispatch, useSelector } from 'react-redux'
import { openPanel } from 'actions/global'
import useAsyncActions from 'hooks/useAsyncActions'

const PrivacyBanner = () => {
  const dispatch = useDispatch()
  const showPrivacy = useSelector((state) => state.globalState.showPrivacy)
  const { savePrivacyCookieAndClose } = useAsyncActions()

  const acceptAndClose = () => {
    savePrivacyCookieAndClose()
  }

  const onLearnMore = () => {
    dispatch(
      openPanel({
        type: 'info',
        subtype: 'privacy',
        mode: 'read',
      }),
    )
  }

  if (!showPrivacy) return null

  return (
    <div className="privacy-banner">
      <div className="privacy-banner__close" onClick={acceptAndClose} />
      <CustomButton
        variant="text"
        label={translate('components.banner.privacy.learnMore')}
        classes="privacy-banner__learn"
        onClick={onLearnMore}
      />
      <div className={'privacy-banner__icon'}>
        <LockIcon width={'100%'} height={'100%'} />
      </div>
      <div className={'privacy-banner__text'}>
        <span className={'privacy-banner__text--title'}>
          {translate('components.banner.privacy.title')}
        </span>
        <span className={'privacy-banner__text--content'}>
          {translate('components.banner.privacy.text')}
        </span>
      </div>
    </div>
  )
}

export default PrivacyBanner
