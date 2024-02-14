/*eslint no-undef: 0*/

describe('LUI', () => {
  beforeEach(() => cy.visit('http://localhost:1234/'))
  it('Component display check', () => {
    cy.get('.lstBtns').eq(0).should('be.visible')
  })
  it('Disabled state management', () => {
    cy.get('.btn1').click()
    cy.get('.lstBtns > button').eq(0).should('be.disabled')
  })
  it('Error state management', () => {
    cy.get('.btn2').click()
    cy.get('.lstBtns').eq(0).should('have.class', 'lstError')
  })
  it('Visual size setting (default / with param)', () => {
    cy.get('.lstBtns > button').eq(0).should('have.attr', 'size', 'small')
    cy.get('.example2 > fieldset > button').eq(0).should('have.attr', 'size', 'large')
  })
  it('Name attribute setting', () => {
    cy.get('.lstBtns').eq(0).should('have.attr', 'name', 'selector1')
  })
  it('Component type check (radio)', () => {
    cy.get('.lstBtns').eq(0).should('have.class', 'l-radio')
  })
  it('Label text setting', () => {
    cy.get('.lstLbl').eq(0).should('have.text', 'Selector of small radio-buttons')
  })
  it('Receiving data from component (name, value, index)', () => {
    cy.get('.lstBtns > button').eq(0).click()
    cy.get('.text').should('have.text', 'Last action: selector1-Option A-0')
  })
  it('Mode setting (single)', () => {
    cy.get('.lstBtns > button').eq(0).click()
    cy.get('.lstBtns > button').eq(0).should('have.class', 'l-active')
  })
  it('Mode setting (multiple)', () => {
    cy.get('.example2 > fieldset > button').eq(0).click()
    cy.get('.example2 > fieldset > button').eq(1).click()
    cy.get('.example2 > fieldset > button').eq(0).should('have.class', 'l-active')
    cy.get('.example2 > fieldset > button').eq(1).should('have.class', 'l-active')
  })
  it('Change of component value using external method "set"', () => {
    cy.get('.lstBtn').eq(2).click()
    cy.get('.example3 > fieldset > button').eq(0).should('have.class', 'l-active')
  })
})
