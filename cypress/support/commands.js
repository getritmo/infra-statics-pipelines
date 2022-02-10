// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-localstorage-commands'
import jwt from 'jsonwebtoken'

Cypress.Commands.add(
  'loginUser',
  (username = 'javier+test@getritmo.com', password = 'demoAdmin0!') => {
    cy.visit('/')
    cy.get('input[name=email', { timeout: 10000 }).type(username)
    cy.get('input[name=password').type(password)
    cy.get('button[type=submit').click()
  },
)

Cypress.Commands.add('logoutUser', () => {
  cy.visit('/')
  cy.get('.nav-user-profile').click()
  cy.get('#qsLogoutBtn').should('be.visible').click()
})

Cypress.Commands.add(
  'login',
  (
    username = 'javier+test@getritmo.com',
    // password = 'demoAdmin0!'
  ) => {
    cy.log(`Logging in as ${username}`)
    const client_id = Cypress.env('auth0_client_id')
    const client_secret = Cypress.env('auth0_client_secret')
    const audience = Cypress.env('auth0_audience')
    const scope = 'openid profile email offline_access'

    const authCodeOptions = {
      method: 'GET',
      url: `https://${Cypress.env(
        'auth0_domain',
      )}/authorize?response_type=code&client_id=${client_id}&redirect_uri=my.sbx.getritmo.com&scope=${scope}`,
    }
    cy.request(authCodeOptions).then((resp) => cy.log(resp))

    const options = {
      method: 'POST',
      url: `https://${Cypress.env('auth0_domain')}/oauth/token`,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      form: {
        grant_type: 'authorization_code',
        // username,
        // password,
        audience,
        // scope,
        client_id,
        client_secret,
        redirect_uri: 'https://my.sbx.getritmo.com/registration',
      },
    }
    cy.request(options).then(({ body }) => {
      const { access_token, expires_in, id_token } = body
      cy.log('access_token: ', access_token)
      cy.log('expires_in: ', expires_in)
      cy.log('id_token: ', id_token)
      const key = `@@auth0spajs@@::${client_id}::${audience}::${scope}`
      const auth0Cache = {
        body: {
          client_id,
          access_token,
          id_token,
          scope,
          expires_in,
          decodedToken: {
            user: jwt.decode(id_token),
          },
        },
        expiresAt: Math.floor(Date.now() / 1000) + expires_in,
      }
      window.localStorage.setItem(key, JSON.stringify(auth0Cache))
      window.localStorage.setItem('__cypress', JSON.stringify(auth0Cache))
    })
  },
)

Cypress.Commands.add('getApplication', () => {
  const clientId = Cypress.env('auth0_client_id')
  const audience = Cypress.env('auth0_audience')
  const scope = 'openid email profile offline_access'
  const tokenName = `@@auth0spajs@@::${clientId}::${audience}::${scope}`
  cy.getLocalStorage(tokenName).then((item) => {
    const LSToken = JSON.parse(item)
    console.log('LSToken: ', LSToken)
    const token = LSToken.body.access_token
    const options = {
      method: 'GET',
      url: `https://api.sbx.getritmo.com/api/v1/applications/`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }

    cy.request(options).then((response) => {
      cy.log('Response: ', response.body)
      cy.setLocalStorage(
        'application',
        JSON.stringify(response.body.application),
      )
      cy.setLocalStorage('user', JSON.stringify(response.body.user))
      cy.saveLocalStorage()
    })
  })
})

Cypress.Commands.add('getConnectorUrl', (connector) => {
  const clientId = Cypress.env('auth0_client_id')
  const audience = Cypress.env('auth0_audience')
  const scope = 'openid email profile offline_access'
  const tokenName = `@@auth0spajs@@::${clientId}::${audience}::${scope}`
  cy.getLocalStorage(tokenName).then((item) => {
    const token = JSON.parse(item).body.access_token
    cy.getLocalStorage('application').then((application) => {
      const { application_id } = JSON.parse(application)
      const options = {
        method: 'GET',
        url: `https://api.sbx.getritmo.com/api/v1/applications/${application_id}/connectors/${connector}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
      cy.request(options).then((response) => {
        cy.setLocalStorage('auth_url', JSON.stringify(response.body.auth_url))
        cy.request('GET', response.body.auth_url)
      })
    })
  })
})

// Cypress.Commands.add('connectAmazonAdvertising', () => {})
// Cypress.Commands.add('connectBingAds', () => {})

Cypress.Commands.add('loginWithOauth', () => {
  cy.getLocalStorage('auth_url').then((auth_url) => {
    cy.request('GET', auth_url).then((response) => {
      const htmlDocument = document.createElement('html')
      htmlDocument.innerHTML = response.body
      const loginForm = htmlDocument.getElementsByTagName('form')[0]
      cy.log('loginForm: ', loginForm)
      const requestVerificationToken =
        loginForm.elements.__RequestVerificationToken.value
      cy.log('verificationToken: ', requestVerificationToken)
    })
  })
})

Cypress.Commands.add('forceVisit', (url) => {
  cy.window().then((win) => {
    return win.open(url, '_self')
  })
})
