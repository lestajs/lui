describe('LUI', () => {
  it('checked', () => {
    cy.visit('http://localhost:1234/')
    cy.get('.lstCheckbox').click()
    cy.get('.lstCheckboxInp').should('be.checked')
  })
})