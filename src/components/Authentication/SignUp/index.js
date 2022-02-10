import React, { useState } from 'react'
import { getCurrency } from 'data/data'
import translate from 'i18n/translate'
import config from 'auth_config.json'
import { useIntl } from 'react-intl'
import { useAuth0 } from '@auth0/auth0-react'
import Step1 from './Step1'
import Step2 from './Step2'
import ModalPrivacy from 'components/ModalPrivacy'
import RitmoOverlay from 'components/Overlay/RitmoOverlay'

const serverHost = process.env.REACT_APP_SERVER_URL
const query = new URLSearchParams(window.location.search)

const SignUp = ({ isPublic, setFormFilled }) => {
  const [redirecting, setRedirecting] = useState(false)
  const [step, setStep] = useState(1)
  const [modal, setModal] = useState(false)
  const [formData, setFormData] = useState({})

  const onboardProduct = query.get('onboard_product')

  const { formatMessage, locale } = useIntl()
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  const lang = locale.split('-')[0]

  const handleSubmit = async (form) => {
    setRedirecting(true)
    //Include last form data and store
    localStorage.setItem(
      'registration-form',
      JSON.stringify({
        ...formData,
        ...form,
        currency: getCurrency(formData.country),
      }),
    )

    localStorage.setItem('formFilled', true)

    if (!isAuthenticated) {
      const params = {
        screen_hint: 'signup',
        language: lang,
      }
      if (localStorage.getItem('public_token')) {
        fetch(`${serverHost}${config.api}/ecommerce/email`, {
          method: 'POST',
          body: JSON.stringify({
            public_token: localStorage.getItem('public_token'),
          }),
        })
          .then((reply) => reply.json())
          .then((data) => {
            params.login_hint = data.email
            loginWithRedirect(params)
          })
          .catch((err) => {
            console.error(`ERROR while redirecting to signup: `, err)
            loginWithRedirect(params)
          })
      } else {
        await loginWithRedirect(params)
      }
    } else {
      setFormFilled(true)
    }
  }

  const goNext = () => {
    setStep((s) => s + 1)
  }

  const goBack = (e) => {
    e.preventDefault()
    setStep((s) => s - 1)
  }

  if (redirecting) {
    return (
      <RitmoOverlay
        message={formatMessage({
          id: 'views.registration.completing_registration',
        })}
      />
    )
  }

  return (
    <>
      {modal && <ModalPrivacy setModal={setModal} />}
      <div className={'layout-columns__form--auth-container'}>
        <div className={'layout-columns__wrapper'}>
          <div className={`layout-columns__form step-${step}`}>
            <div className="steps">
              <Step1
                onSubmit={(form) => {
                  setFormData((s) => ({ ...s, ...form }))
                  goNext()
                }}
                {...{ isPublic, onboardProduct }}
              />
              <Step2
                onSubmit={(form) => {
                  handleSubmit(form)
                }}
                {...{ setModal, goBack }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="layout-columns__footer-links">
        <a
          href={formatMessage({ id: 'views.registration.link1' })}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          {translate('views.registration.text1')}
        </a>
        <a
          href={formatMessage({ id: 'views.registration.link2' })}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          {translate('views.registration.text2')}
        </a>
        <a
          href={formatMessage({ id: 'views.registration.link3' })}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          {translate('views.registration.text3')}
        </a>
      </div>
    </>
  )
}

export default SignUp
