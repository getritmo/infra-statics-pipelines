import React, { Fragment, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { flatten } from 'flat'
import translations from '../i18n/translations'
import { setCookie, getCookie } from '../data/data'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'
import useAPI from 'hooks/useAPI'

export const Context = React.createContext()

let lang = navigator.language

const query = new URLSearchParams(window.location.search)
const qs = query !== undefined ? query.get('locale') : null

const langProcess = (lang) => {
  let langBrowser = 'es-ES'

  if (lang) {
    switch (lang.substring(0, 2)) {
      case 'en':
        langBrowser = 'en-GB'
        break
      case 'fr':
        langBrowser = 'fr-FR'
        break
      case 'es':
        langBrowser = lang === 'es-MX' ? lang : 'es-ES'
        break
      default:
        langBrowser = 'es-ES'
        break
    }
  }
  return langBrowser
}

if (qs) {
  setCookie('locale', langProcess(qs))
  localStorage.setItem('locale_country', langProcess(qs).split('-')[1])
} else if (!getCookie('locale')) {
  setCookie('locale', langProcess(lang))
}

const cookie = getCookie('locale')
if (cookie) {
  lang = cookie
  localStorage.setItem('locale_country', cookie.split('-')[1])
}

const I18nProvider = ({ children }) => {
  const [locale, setLocale] = useState(lang)
  const storeStatus = useSelector((state) => state.appData)
  const [messages, setMessages] = useState(flatten(translations[locale]))

  const { isAuthenticated } = useAuth0()
  const { apiCallApplicationsUsers } = useAPI()

  function selectLang(e) {
    setLocale(e.value)
    setMessages(flatten(translations[e.value]))

    setCookie('locale', e.value)

    if (isAuthenticated) {
      updateUserLanguage(e.value)
    }
  }

  async function updateUserLanguage(newLocale) {
    try {
      const url = `/${storeStatus.user.user_id}`
      const body = {
        locale: newLocale,
      }
      await apiCallApplicationsUsers(url, 'PUT', body)
    } catch (e) {
      console.error('ERROR on PUT user application: ', e)
    }
  }

  return (
    <Context.Provider value={{ locale, selectLang }}>
      <IntlProvider
        textComponent={Fragment}
        locale={locale}
        messages={messages}
      >
        {children}
      </IntlProvider>
    </Context.Provider>
  )
}

export default I18nProvider
