import config from 'auth_config.json'
const serverHost = process.env.REACT_APP_SERVER_URL

export const apiCallApplications = async (token, url = '', method, body) => {
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
}

export const apiCallApplicationsAdmin = async (
  token,
  url = '',
  method,
  body,
) => {
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
}

export const apiCallApplicationsUsers = async (
  token,
  url = '',
  method,
  body,
) => {
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
}

export const apiCallCustom = async (token, url = '', method, body) => {
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
}
