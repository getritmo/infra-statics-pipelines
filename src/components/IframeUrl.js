import React from 'react'
import useAPI from 'hooks/useAPI'
// TESTING OPENBANKING 32945945D

export const IframeUrl = (props) => {
  const { apiCallApplications } = useAPI()

  // Iframe Listener
  window.addEventListener('message', function (event) {
    if (
      event.origin === 'https://www.afterbanks.com' &&
      event.data === 'information successfully sent'
    ) {
      getStatus()
    }
  })

  // Gets the url to start connecting the Connector.
  const getStatus = async () => {
    let response = await apiCallApplications('', 'GET')
    updateStatus(response)
    props.closeIframe()
  }

  const updateStatus = (data) => {
    props.updateStatus(data.application)
  }
  return (
    <>
      <div className="iframe-overlay" id="iframe" onClick={props.closeIframe}>
        <iframe
          name="menu"
          title="name"
          src={props.url}
          width="100%"
          height="100%"
          frameBorder={0}
        />
      </div>
      <button className="iframe-overlay__close" onClick={props.closeIframe} />
    </>
  )
}

export default IframeUrl
