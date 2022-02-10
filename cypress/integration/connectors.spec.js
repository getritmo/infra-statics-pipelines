'use strict'

describe('[MARKETING] Testing connector', () => {
  before(() => {
    cy.log('Executing BEFORE routine')

    cy.visit('/')
    cy.get('.layout-columns__links > .link').click()
    cy.wait(2000)
    cy.location('pathname').then((item) => {
      if (item === '/login') {
        cy.log(`Login user...`)
        cy.wait(1000)
        cy.loginUser()
      }
      cy.getApplication()
      cy.saveLocalStorage()
    })
  })

  // it('[MARKETING] Facebook advertising', () => {
  //   cy.wait(2000)
  //   cy.get(':nth-child(3) > .accounts__item').should('be.visible').click()
  //   cy.wait(3000)
  //   cy.get('[data-testid="cookie-policy-dialog-accept-button"]').then(
  //     ($item) => {
  //       if ($item) {
  //         cy.get('[data-testid="cookie-policy-dialog-accept-button"]').click()
  //       }
  //     },
  //   )
  //   cy.get('#amazonads > .accounts__list--item').should('be.visible')
  // })

  it('[MARKETING] Amazon advertising', () => {
    cy.wait(2000)
    cy.get(':nth-child(4) > .accounts__item').should('be.visible').click()
    cy.wait(3000)
    cy.get('.panel__close').should('be.visible').click()
    cy.get('#amazonads > .accounts__list--item').should('be.visible')
  })

  it('[MARKETING] Bing Ads', () => {
    cy.wait(2000)
    cy.get(':nth-child(5) > .accounts__item').should('be.visible').click()
    cy.wait(3000)
    cy.get('.panel__close').should('be.visible').click()
    cy.get('#bingads > .accounts__list--item').should('be.visible')
  })

  it('[MARKETING] Other accounts', () => {
    cy.wait(2000)
    cy.get(':nth-child(6) > .accounts__item').should('be.visible').click()
    cy.wait(3000)
    cy.get('.panel__close').should('be.visible').click()
    cy.get('#bingads > .accounts__list--item').should('be.visible')
  })
})

describe('[SALES] Testing connector', () => {
  before(() => {
    cy.log('Executing BEFORE routine')

    cy.visit('/')
    cy.get('.layout-columns__links > .link').click()
    cy.wait(2000)
    cy.location('pathname').then((item) => {
      if (item === '/login') {
        cy.log(`Login user...`)
        cy.wait(1000)
        cy.loginUser()
      }
      cy.getApplication()
      cy.saveLocalStorage()
    })
  })

  it('[SALES] Stripe', () => {
    cy.visit('/sales-accounts')
    cy.wait(2000)
    cy.get(':nth-child(1) > .accounts__item').should('be.visible').click()
    cy.get(
      '#skip-account-app > .Button-align > .Flex-flex > .Button-label > span',
    )
      .should('be.visible')
      .click()
    cy.wait(3000)
    cy.get('.panel__close').should('be.visible').click()
    cy.get(`:nth-child(1) > .accounts__list--item`).should('be.visible')
  })

  // it('[MARKETING] Bing Ads', () => {
  //   cy.wait(2000)
  //   cy.get(':nth-child(5) > .accounts__item').should('be.visible').click()
  //   cy.wait(3000)
  //   cy.get('.panel__close').should('be.visible').click()
  //   cy.get('#bingads > .accounts__list--item').should('be.visible')
  // })

  // it('[MARKETING] Other accounts', () => {
  //   cy.wait(2000)
  //   cy.get(':nth-child(6) > .accounts__item').should('be.visible').click()
  //   cy.wait(3000)
  //   cy.get('.panel__close').should('be.visible').click()
  //   cy.get('#bingads > .accounts__list--item').should('be.visible')
  // })
})
