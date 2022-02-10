'use strict'

describe('Authentication tests', () => {
  beforeEach(() => {
    cy.restoreLocalStorage()
  })

  // it('Logout if logged in', () => {
  //   cy.log('Logout if logged in')
  //   cy.visit('/')
  //   cy.location('pathname').then((item) => {
  //     if (item !== '/login') {
  //       cy.logoutUser()
  //       cy.location().should((loc) => {
  //         expect(loc.pathname).to.eq('/registration')
  //       })
  //       cy.wait(1000)
  //       cy.clearLocalStorageSnapshot()
  //     }
  //   })
  // })

  // it('shoud redirect to auth0 login', () => {
  //   cy.log('Root')
  //   cy.visit('/')
  //   cy.window().should('have.property', 'Auth0')
  //   cy.log('/marketing-accounts')
  //   cy.visit('/marketing-accounts')
  //   cy.window().should('have.property', 'Auth0')
  //   cy.log('non-existing')
  //   cy.visit('/alsdkjasd')
  //   cy.window().should('have.property', 'Auth0')
  // })

  // it('should be able to login (user + password)', () => {
  //   cy.loginUser()
  //   cy.wait(1000)
  //   cy.saveLocalStorage()
  // })

  // it('should logout and redirect to /registration', () => {
  //   cy.location().should((loc) => {
  //     expect(loc.pathname).to.eq('/marketing-accounts')
  //   })
  //   cy.logoutUser()
  //   cy.location().should((loc) => {
  //     expect(loc.pathname).to.eq('/registration')
  //   })
  //   cy.wait(1000)
  //   cy.clearLocalStorageSnapshot()
  // })

  it('should register as non qualified lead (Auth0 last)', () => {
    cy.visit('/registration')
    const id = Date.now()
    cy.get('.step-2').should('not.be.visible')
    cy.get('#name').should('be.visible').type(`test${id}`)
    cy.get('#website').should('be.visible').type(`www.test${id}.com`)
    cy.get('#country').should('be.visible').click()
    cy.get('.custom__select__menu').should('be.visible')
    cy.get('#country').should('be.visible').click().type('Spain')
    cy.get('#country-option-ES').should('be.visible').click()
    cy.get('#monthly_income').should('be.visible').click()
    cy.get('#monthly_income-option-0').should('be.visible').click()
    cy.get('#business_type').should('be.visible').click()
    cy.get('#business_type-option-0').should('be.visible').click()
    cy.get('button[data-testid=submit-step1]').should('be.visible').click()
    cy.get('.step-1').should('not.be.visible')
    cy.get('#firstName').should('be.visible').type(`test`)
    cy.get('#surname').should('be.visible').type(`${id}`)
    cy.get('#phone_number').should('be.visible').type(`1233456789`)
    // cy.get('#subscribe_newsletter').check(false).click()
    // cy.get('#subscribe_newsletter').check('true')
    cy.get('#has_accepted_conditions')
      .should('not.be.visible')
      .should('not.be.checked')
    // .check()
    cy.get('label[data-cy=has_accepted_conditions-checkbox-label]').click()
    // cy.get('#has_accepted_conditions + label::before')
    //   .should('be.visible')
    //   .click()
    // .click()
    // .should('be.checked')
    // cy.get('#has_accepted_conditions').check('true')
    // should('have.class', '.step-1').click()
  })
})
