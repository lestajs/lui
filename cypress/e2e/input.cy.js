/*eslint no-undef: 0*/

describe('LUI', () => {
  beforeEach(() => cy.visit('http://localhost:1234/'))
  it('Component display check', () => {
    cy.get('.lstInput').eq(0).should('be.visible')
  })
  it('Visual size setting (with param / default)', () => {
    cy.get('.lstInput').eq(0).should('have.attr', 'size', 'small')
    cy.get('.lstInput').eq(1).should('have.attr', 'size', 'medium')
  })
  it('clear', () => {
    cy.get('.lstInput').eq(0).should('have.value', 'text')
    cy.get('.btn1 > button').click()
    cy.get('.lstInput').eq(0).should('have.value', '')
  })
  it('Disabled state management', () => {
    cy.get('.btn2 > button').click()
    cy.get('.medium .lstInput').should('be.disabled')
  })
  it('Focus and Blur state management', () => {
    cy.get('.btn3 > button').click()
    cy.get('.lstInput').eq(2).should('have.focus')
    cy.get('.btn3 > button').click()
    cy.get('.lstInput').eq(2).should('not.have.focus')
  })
  it('checking attributes', () => {
    cy.get('.lstInput').eq(0).should('have.attr', 'readonly')
    cy.get('.lstInput').eq(3).should('have.attr', 'placeholder', 'count')
    cy.get('.lstInput').eq(3).should('have.attr', 'min', '16')
    cy.get('.lstInput').eq(3).should('have.attr', 'max', '50')
    cy.get('.lstInput').eq(4).should('have.attr', 'title', 'email')
    cy.get('.lstInput').eq(4).should('have.attr', 'autocomplete', 'off')
    cy.get('.lstInput').eq(5).should('have.attr', 'required')
    cy.get('.lstInput').eq(5).should('have.attr', 'minlength', '3')
    cy.get('.lstInput').eq(5).should('have.attr', 'maxlength', '5')
  })
  it('age', () => {
    cy.get('input[type="number"]').eq(3).should(($input) => {
      const text = $input.val()
      expect(text).to.match(/^[^.,]+$/)
    })
  })
})
