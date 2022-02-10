import React from 'react'
import config from './../../auth_config.json'
import { useAuth0 } from '@auth0/auth0-react'
import useAsyncActions from 'hooks/useAsyncActions'

export const UpdateStatus = (props) => {
  const serverHost = process.env.REACT_APP_SERVER_URL
  const { saveApplication } = useAsyncActions()
  const updateStatus = (data) => saveApplication(data)

  const { getAccessTokenSilently } = useAuth0()

  const triggerUpdate = async () => {
    const jsonData = JSON.stringify(props.statusToUpdate)

    // Gets
    const token = await getAccessTokenSilently()

    // AJAX  TO update Gateway
    await fetch(`${serverHost}${config.applications}`, {
      method: 'POST',
      body: jsonData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // process the api result
        // to use it properly in the app

        // Updates the global status
        updateStatus(data)

        if (props.setRedirectTo) {
          // set the redirection to next page
          props.setRedirectTo(true)
        }
      })
  }

  if (props.preventMultiplePost === 0) {
    triggerUpdate()
  }

  return <></>
}

export default UpdateStatus
