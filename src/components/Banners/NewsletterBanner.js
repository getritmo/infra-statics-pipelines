import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { CustomButton } from '../UI'
import { useIntl } from 'react-intl'
import translate from '../../i18n/translate'
import { useSelector, useDispatch } from 'react-redux'
import useAPI from 'hooks/useAPI'
import { setIsSubscribed } from 'actions/appData'

const NewsletterBanner = ({ classes, close }) => {
  const [step, setStep] = useState(0)
  const [counter, setCounter] = useState(null)
  const [closing, setClosing] = useState(false)
  const { formatMessage, locale } = useIntl()
  const { user } = useSelector((state) => state.appData)
  const { apiCallApplicationsUsers } = useAPI()

  const dispatch = useDispatch()

  const handleNewsletterSubscription = async () => {
    try {
      const url = `/${user.user_id}/newsletter`
      const body = { subscribed: true }
      await apiCallApplicationsUsers(url, 'PATCH', body)
      dispatch(setIsSubscribed(true))
      setCounter(30)
      setStep(1)
    } catch (e) {
      setStep(-1)
      console.error('ERROR on SUBSCRIBING to newsletter: ', e)
    }
  }

  useEffect(() => {
    const timer =
      counter >= 0 && setInterval(() => setCounter((s) => s - 1), 1000)
    if (counter === 0) setClosing(true)
    return () => clearInterval(timer)
  }, [counter])

  useEffect(() => {
    if (closing) setTimeout(() => close(), 1000)
  }, [closing, close])

  const SubscribeView = () => (
    <>
      <span className={'newsletter-banner__header'}>
        {translate('components.banner.newsletter.header')}
      </span>

      <span className={'newsletter-banner__content'}>
        {formatMessage({ id: 'components.banner.newsletter.text' })}
      </span>
      <CustomButton
        label={formatMessage({ id: 'components.banner.newsletter.button' })}
        size={'small'}
        onClick={handleNewsletterSubscription}
      />
      <span className={'newsletter-banner__footer'}>
        {formatMessage({ id: 'components.banner.newsletter.footer' })}&nbsp;
        <a
          className={'link'}
          target="_blank"
          rel="noopener noreferrer"
          href={
            locale === 'es-ES'
              ? 'https://www.getritmo.com/politica-de-privacidad'
              : 'https://www.getritmo.com/en/politica-de-privacidad'
          }
        >
          {formatMessage({ id: 'components.banner.newsletter.footerAnchor' })}
        </a>
      </span>
    </>
  )

  const ConfirmationView = () => (
    <>
      <div
        className="newsletter-banner__close"
        onClick={() => {
          setClosing(true)
        }}
      />
      <span className={'newsletter-banner__header'}>
        {translate('components.banner.newsletter.confirmation.header')}
      </span>

      <span className={'newsletter-banner__content'}>
        {formatMessage({
          id: 'components.banner.newsletter.confirmation.text',
        })}
      </span>

      <span className={'newsletter-banner__footer'}>
        {translate('components.banner.newsletter.confirmation.footer', {
          seconds: counter,
        })}
      </span>
    </>
  )

  const ErrorView = () => (
    <>
      <span className={'newsletter-banner__header'}>
        {translate('components.banner.newsletter.error.header')}
      </span>

      <span className={'newsletter-banner__content'}>
        {formatMessage({ id: 'components.banner.newsletter.error.text' })}
      </span>
      <CustomButton
        label={formatMessage({
          id: 'components.banner.newsletter.error.button',
        })}
        size={'small'}
        onClick={handleNewsletterSubscription}
      />
    </>
  )

  return (
    <div
      className={classnames(`newsletter-banner ${classes}`, {
        'banner-slide-out': closing,
      })}
    >
      {step === -1 && <ErrorView />}
      {step === 0 && <SubscribeView />}
      {step === 1 && <ConfirmationView />}
    </div>
  )
}

export default NewsletterBanner
