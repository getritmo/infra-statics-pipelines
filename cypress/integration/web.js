describe('My web application', () => {
  beforeEach(() => {
    const user = Cypress.env('test_user_email')
    cy.loginAuth0(user)
    cy.loadLoginState(user)
  })

  it('Visit the homepage without authentication', () => {
    cy.visit('http://localhost:3001')
  })

  it('Sign in and access a protected resource', () => {
    const user = Cypress.env('DEFAULT_USER')
    cy.visit('http://localhost:3001/marketing-accounts')
    cy.contains('body', `Hello user: ${user}`, {
      timeout: 5000,
    })
  })
})
