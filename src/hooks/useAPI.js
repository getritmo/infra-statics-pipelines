import { useCallback } from 'react'
import config from '../auth_config.json'
import { useAuth0 } from '@auth0/auth0-react'
const serverHost = process.env.REACT_APP_SERVER_URL

export default function useAPI() {
  const { getAccessTokenSilently } = useAuth0()

  const apiCallApplications = useCallback(
    async (url = '', method, body) => {
      const token = await getAccessTokenSilently()
      return new Promise((resolve, reject) => {
        fetch(`${serverHost}${config.applications}${url}`, {
          method: method,
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            switch (response.status) {
              case 403:
                resolve(response)
                break
              case 200:
                return response.json()
              default:
                /// 500 error SHOWS USER IS ALREADY CREATED
                reject()
                break
            }
          })
          .then((response) => {
            resolve(response)
          })
          .catch((e) => reject(e))
      })
    },
    [getAccessTokenSilently],
  )
  const apiCallApplicationsUsers = useCallback(
    async (url = '', method, body) => {
      const token = await getAccessTokenSilently()
      return new Promise((resolve, reject) => {
        fetch(`${serverHost}${config.users}${url}`, {
          method: method,
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            switch (response.status) {
              case 403:
                resolve(response)
                break
              case 200:
                return response.json()
              default:
                reject()
                break
            }
          })
          .then((resp) => {
            resolve(resp)
          })
          .catch((e) => reject(e))
      })
    },
    [getAccessTokenSilently],
  )

  // Gets the url to start connecting the Connector.
  const apiCallApplicationsAdmin = useCallback(
    async (url = '', method, body) => {
      const token = await getAccessTokenSilently()
      return new Promise((resolve, reject) => {
        fetch(`${serverHost}${config.admin}${url}`, {
          method: method,
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (method !== 'DELETE') return response.json()
          })
          .then((response) => {
            resolve(response)
          })
          .catch((e) => reject(e))
      })
    },
    [getAccessTokenSilently],
  )

  // Gets the url to start connecting the Connector.
  const apiCallApplicationsAdminFormData = useCallback(
    async (url = '', method, body) => {
      const token = await getAccessTokenSilently()
      return new Promise((resolve, reject) => {
        try {
          fetch(`${serverHost}${config.admin}${url}`, {
            method: method,
            processData: false,
            contentType: false,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body,
          })
            .then((response) => response.json())
            .then((data) => {
              resolve(data)
            })
        } catch (e) {
          reject(e)
        }
      })
    },
    [getAccessTokenSilently],
  )

  // Gets the url to start connecting the Connector.
  const apiCallApplicationsFormData = useCallback(
    async (url = '', method, body) => {
      const token = await getAccessTokenSilently()
      return new Promise((resolve, reject) => {
        fetch(`${serverHost}api/v1/${url}`, {
          method: method,
          processData: false,
          contentType: false,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body,
        })
          .then((response) => {
            switch (response.status) {
              case 200:
                return response.json()
              default:
                reject(response)
                break
            }
          })
          .then((data) => {
            resolve(data)
          })
          .catch((e) => {
            reject(e)
          })
      })
    },
    [getAccessTokenSilently],
  )

  const apiFileDownload = useCallback(
    async (url = '', method, file) => {
      const token = await getAccessTokenSilently()
      return new Promise((resolve, reject) => {
        fetch(`${serverHost}${config.api}${url}`, {
          method,
          dataType: 'text',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = file
            document.body.appendChild(a)
            a.click()
            a.remove()
            resolve(blob)
          })
          .catch((e) => reject(e))
      })
    },
    [getAccessTokenSilently],
  )

  const apiFileFetch = useCallback(
    async (url, method, callback = undefined) => {
      const url_def = url !== '' ? '/' + url : url
      const token = await getAccessTokenSilently()
      return new Promise((resolve) => {
        fetch(`${serverHost}${config.api}${url_def}`, {
          method,
          dataType: 'text',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.blob())
          .then((blob) => {
            if (callback) {
              callback(blob)
            }
            resolve(blob)
          })
      })
    },
    [getAccessTokenSilently],
  )

  const apiCallCustom = useCallback(
    async (url = '', method, body) => {
      const token = await getAccessTokenSilently()
      return new Promise((resolve, reject) => {
        fetch(`${serverHost}${config.api}${url}`, {
          method: method,
          body: JSON.stringify(body),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            switch (response.status) {
              case 403:
                resolve(response)
                break
              case 200:
                return response.json()
              default:
                /// 500 error SHOWS USER IS ALREADY CREATED
                reject()
                break
            }
          })
          .then((response) => {
            resolve(response)
          })
          .catch((e) => reject(e))
      })
    },
    [getAccessTokenSilently],
  )

  return {
    apiCallApplications,
    apiCallApplicationsUsers,
    apiCallApplicationsAdmin,
    apiCallApplicationsFormData,
    apiCallApplicationsAdminFormData,
    apiFileDownload,
    apiFileFetch,
    apiCallCustom,
  }
}
