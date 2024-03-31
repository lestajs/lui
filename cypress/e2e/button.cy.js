/*eslint no-undef: 0*/

describe('Component Tests', () => {
  beforeEach(() => {
    cy.intercept('https://cdn.jsdelivr.net/gh/lestajs/core@latest/dist/lesta.global.js')
    cy.visit('http://localhost:1234/')
  })
  it('Component display button', () => {
    cy.get('.lstBtn').eq(0).should('be.visible')
  })

  it('Visual size setting (with param / default)', () => {
    cy.get('.lstBtn').eq(0).should('have.attr', 'size', 'small')
    cy.get('.lstBtn').eq(1).should('have.attr', 'size', 'medium')
  })

  it('The test checks the text value of an element with the result class', () => {
    cy.get('.large > button').click()
    cy.get('.result').should('text', 'Last action: large: Large')
  })

  it('Checking to disable the small button', () => {
    cy.get('.btn1').click()
    cy.get('.small > button').should('be.disabled')
  })

  it('Checks for the presence of an element with the lstSpinner class', () => {
    cy.get('.btn2').click()
    cy.get('.medium > button .lstSpinner').should('exist')
  })

  it('Testing the external set method', () => {
    cy.get('.btn3').click()
    cy.get('.large > button .lstBtnText').should('text', 'Large Changed')
  })

  it('Checking the presence of a spinner using an external method', () => {
    cy.get('.btn4').click()
    cy.get('.large > button .lstSpinner').should('exist')
  })
  it('Detection of click on the button icon', () => {
    cy.get('.large > button .lstBtnIcon').click()
    cy.get('.result').should('text', 'Last action: large: Large | icon')
  })
})
