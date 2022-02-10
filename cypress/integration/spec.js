it('loads', () => {
  cy.visit('/')
  cy.focused()
    .should('have.class', 'new-todo')
    .and('have.attr', 'placeholder', 'What needs to be done?')
  cy.get('.todo-list li').should('have.length', 1).contains('Use Redux')
})
