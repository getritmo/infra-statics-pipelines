import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import LayoutColumns from '../layouts/LayoutColumns'
import LoginBar from '../components/LoginBar'
import SignUp from '../components/Authentication/SignUp'
import { useAuth0 } from '@auth0/auth0-react'
import { businessType, getCookie, monthlyIncomeByCurrency } from '../data/data'
import { useIntl } from 'react-intl'
import useAPI from 'hooks/useAPI'
import { setUser } from 'actions/appData'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useAsyncActions from 'hooks/useAsyncActions'
import RitmoOverlay from 'components/Overlay/RitmoOverlay'
import translate from 'i18n/translate'

export const Authentication = ({ match, location }) => {
  const dispatch = useDispatch()
  const [redirecting, setRedirecting] = useState(false)
  const [formFilled, setFormFilled] = useState(
    localStorage.getItem('formFilled'),
  )
  const { isLoading, isAuthenticated, user } = useAuth0()
  const { locale } = useIntl()
  const { apiCallApplicationsUsers, apiCallCustom } = useAPI()
  const { saveApplication } = useAsyncActions()
  const history = useHistory()

  const isPublic = getCookie('special-content')

  if (match.params.any !== undefined) {
    localStorage.setItem('app_nonce', match.params.any)
  }

  useEffect(() => {
    const createUser = async () => {
      return new Promise((resolve) => {
        const userFormData = [
          { key: 'firstName', parse: (v) => v },
          { key: 'phone_number', parse: (v) => v },
          { key: 'surname', parse: (v) => v },
          { key: 'has_accepted_conditions', parse: (v) => Boolean(v) },
          { key: 'is_subscribed', parse: (v) => Boolean(v) },
        ]

        const objectFieldJSON = {
          external_id: user.sub,
          email: user.email,
          locale: locale,
          ...userFormData.reduce((acc, curr) => {
            return {
              ...acc,
              [curr.key]: curr.parse(
                JSON.parse(localStorage.getItem('registration-form'))[curr.key],
              ),
            }
          }, {}),
        }

        objectFieldJSON.name = objectFieldJSON.firstName
        delete objectFieldJSON.firstName

        apiCallApplicationsUsers('', 'POST', objectFieldJSON)
          .then((response) => {
            dispatch(setUser(response))
            if (response.user_id !== undefined) {
              localStorage.setItem('user_id', response.user_id)
              resolve()
            }
          })
          .catch((e) => {
            console.error('user already exists: ', e)
            localStorage.setItem('user-exists', true)

            // redirects to Initial
            history.push({
              pathname: '/initial',
              state: { showInitial: true },
            })
          })
      })
    }

    const createCompany = async () => {
      return new Promise((resolve, reject) => {
        const companyFormData = [
          { key: 'name', parse: (v) => v },
          { key: 'website', parse: (v) => v },
          { key: 'country', parse: (v) => v },
          { key: 'currency', parse: (v) => v },
          { key: 'monthly_income', parse: (v) => parseInt(v) },
          { key: 'business_type', parse: (v) => parseInt(v) },
        ]
        const localStorageData = [
          { key: 'user_id', parse: (v) => parseInt(v) },
          { key: 'utm_campaign', parse: (v) => v },
          { key: 'utm_source', parse: (v) => v },
          { key: 'utm_medium', parse: (v) => v },
          { key: 'utm_content', parse: (v) => v },
          { key: 'utm_term', parse: (v) => v },
          { key: 'referrer', parse: (v) => v },
          { key: 'ps_domain', parse: (v) => v },
          { key: 'ps_api_key', parse: (v) => v },
          { key: 'lead_id', parse: (v) => v },
          { key: 'app_nonce', parse: (v) => v },
          { key: 'public_token', parse: (v) => v },
          { key: 'onboard_product', parse: (v) => v },
        ]

        const objectFieldJSON = {
          ...companyFormData.reduce((acc, curr) => {
            return {
              ...acc,
              [curr.key]: curr.parse(
                JSON.parse(localStorage.getItem('registration-form'))[curr.key],
              ),
            }
          }, {}),
          ...localStorageData.reduce((acc, curr) => {
            return {
              ...acc,
              [curr.key]: curr.parse(localStorage.getItem(curr.key)),
            }
          }, {}),
        }
        apiCallCustom('/companies', 'POST', objectFieldJSON)
          .then((response) => {
            const dataLayerItem = {
              event: 'register_success',
              biz_type: businessType.find(
                (item) => item.value === objectFieldJSON.business_type,
              ).gaName,
              country: objectFieldJSON.country,
              monthly_revs: monthlyIncomeByCurrency(
                objectFieldJSON.currency,
              ).find((item) => item.value === objectFieldJSON.monthly_income)
                .gaName,
              onboard_product:
                localStorage.getItem('onboard_product') || 'capital',
            }

            globalThis.dataLayer.push(dataLayerItem)
            saveApplication(response.application)
            resolve()
          })
          .catch((e) => {
            console.error('ERROR when saving company data: ', e)
            reject(e)
          })
      })
    }

    const cleanLocalStorage = () => {
      localStorage.removeItem('registration-form')
      localStorage.removeItem('user_id')
      localStorage.removeItem('formFilled')
    }

    const executeUserCreation = async () => {
      try {
        setRedirecting(true)
        await createUser()
        await createCompany()
        cleanLocalStorage()
        history.push({
          pathname: '/initial',
          state: { showInitial: true },
        })
      } catch (e) {
        console.error('ERROR during data storage process: ', e)
      } finally {
        setRedirecting(false)
      }
    }

    if (isAuthenticated && location?.state?.createUser && formFilled) {
      executeUserCreation()
    }
  }, [
    isAuthenticated,
    apiCallApplicationsUsers,
    apiCallCustom,
    location,
    history,
    saveApplication,
    dispatch,
    locale,
    user?.email,
    user?.sub,
    formFilled,
  ])

  if (isLoading) {
    return null
  }

  if (redirecting) {
    return (
      <RitmoOverlay
        message={translate('views.registration.completing_registration')}
      />
    )
  }

  return (
    <LayoutColumns>
      <LoginBar />
      <SignUp isPublic={isPublic} setFormFilled={setFormFilled} />
    </LayoutColumns>
  )
}

Authentication.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Authentication
