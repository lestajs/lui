/*eslint no-undef: 0*/

describe('LUI', () => {
  beforeEach(() => {
    cy.intercept('https://cdn.jsdelivr.net/gh/lestajs/core@latest/dist/lesta.global.js')
    cy.visit('http://localhost:1234/')
  })
  it('Component display check', () => {
    cy.get('.lstCheckbox').eq(0).should('be.visible')
  })
  it('Component value management', () => {
    cy.get('.lstCheckbox').eq(0).click()
    cy.get('.lstCheckboxInp').eq(1).should('be.checked')
  })
  it('Disabled state management', () => {
    cy.get('.btn1').click()
    cy.get('.lstCheckboxInp').eq(4).should('be.disabled')
  })
  it('Error state management', () => {
    cy.get('.btn2').click()
    cy.get('.lstCheckbox').eq(4).should('have.class', 'lstError')
  })
  it('Label text setting', () => {
    cy.get('.lstCheckboxText').eq(0).should('have.text', 'Select all options')
  })
  it('Visual size setting (with param / default)', () => {
    cy.get('.lstCheckbox').eq(1).should('have.attr', 'size', 'small')
    cy.get('.lstCheckbox').eq(2).should('have.attr', 'size', 'medium')
  })
  it('Name attribute setting', () => {
    cy.get('.lstCheckboxInp').eq(1).should('have.attr', 'name', 'small')
  })
  it('Receiving data from components (name, new value)', () => {
    cy.get('.lstCheckbox').eq(1).click()
    cy.get('.result').should('text', 'Last action: small-true')
    cy.get('.lstCheckbox').eq(1).click()
    cy.get('.result').should('text', 'Last action: small-false')
  })
  it('Value change in component using external "set" method', () => {
    cy.get('.btn3').click()
    cy.get('.lstCheckboxInp').eq(4).should('be.checked')
    cy.get('.btn2 > button').should('be.disabled')
  })
})