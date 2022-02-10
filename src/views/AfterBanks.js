import React from 'react'
import { Redirect } from 'react-router-dom'

const AfterBanks = () => {
  const url = localStorage.getItem('afterBanksUrl')
  const redirectToRegistration = false // props.url ? false : true;

  window.addEventListener('message', function (event) {
    if (event.data === 'information successfully sent') {
      window.parent.postMessage('successfully sent', '*')
    }
  })

  document.write('<script src="' + url + '"></script>')
  return (
    <>
      <script src={url} type="type/application" async />

      {redirectToRegistration && <Redirect to="/registration" />}
    </>
  )
}

export default AfterBanks
