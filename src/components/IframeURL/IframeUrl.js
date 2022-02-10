import React from 'react'
import { closeIframe } from 'actions/global'
import { useSelector, useDispatch } from 'react-redux'
import useAsyncActions from 'hooks/useAsyncActions'
// TESTING OPENBANKING 32945945D

export const IframeURL = () => {
  const {
    globalState: { iframe },
  } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { updateAppData } = useAsyncActions()

  // Iframe Listener
  window.addEventListener('message', function (event) {
    if (
      event.origin === 'https://www.afterbanks.com' &&
      event.data === 'information successfully sent'
    ) {
      updateAppData(() => dispatch(closeIframe()))
    }
  })

  const handleClose = (e) => {
    if (e !== undefined) {
      e.target.classList.add('hidden')
    }
    const iframe = document.getElementById('script-loaded')
    if (iframe) {
      iframe.classList.add('hidden')
      setTimeout(() => {
        dispatch(closeIframe())
        iframe.remove()
        // cleans the localstorage
        localStorage.clear()
      }, 300)
    } else {
      dispatch(closeIframe())
    }
  }

  if (!iframe.open) return null

  return (
    <>
      <div className="iframe-overlay" id="iframe" onClick={handleClose}>
        <iframe
          name="menu"
          title="name"
          src={iframe.url}
          width="100%"
          height="100%"
          frameBorder={0}
        />
      </div>
      <button className="iframe-overlay__close" onClick={handleClose} />
    </>
  )
}

export default IframeURL
