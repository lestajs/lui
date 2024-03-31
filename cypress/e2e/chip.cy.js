/*eslint no-undef: 0*/

describe('LUI', () => {
  beforeEach(() => {
    cy.intercept('https://cdn.jsdelivr.net/gh/lestajs/core@latest/dist/lesta.global.js')
    cy.visit('http://localhost:1234/')
  })
  it('Component display check', () => {
    cy.get('.lstChip').should('be.visible')
    cy.get('.lstChip > .lstBtn').should('be.visible')
    cy.get('.lstChip > .lstBtn> .lstBtnIcon').should('be.visible')
    cy.get('.lstChip > .lstBtn> .lstBtnIcon').eq(0).should('have.text', ' ')
  })

  it('Component value management', () => {
    cy.get('.lstChip > .lstBtn> .lstBtnIcon').eq(1).click()
    cy.get('.lstChip > .lstBtn').last().should('have.attr', 'name', '1')
    cy.get('.addBtn > button').click()
    cy.get('.lstChip > .lstBtn').last().should('have.attr', 'name', '2')
  })
})
