/*eslint no-undef: 0*/

describe('Component Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:1234/')
  })
  it('Component display button', () => {
    cy.get('.lstBtn').eq(0).should('be.visible')
  })

  it('should display tabs with correct content', () => {
    cy.get('.lstBtn').should('have.length', 4)
    cy.get('.lstBtn span.lstBtnText').eq(0).should('contain', 'A')
    cy.get('.lstBtn span.lstBtnText').eq(1).should('contain', 'B')
    cy.get('.lstBtn span.lstBtnText').eq(2).should('contain', 'C')
  })

  it('should switch tabs when clicked', () => {
    cy.get('.lstBtn', { timeout: 10000 }).should('be.visible')
    cy.get('.lstBtn span.lstBtnText').eq(1).click()
    cy.get('.lstBtn.active div[section="content"]').should('contain', 'B1')
  })

  it('should add new item on button click', () => {
    cy.get('.btn1 button').should('be.visible')
    cy.get('.btn1 button span.lstBtnText').click()
    cy.get('.lstBtn').should('have.length', 5)
    cy.get('.lstBtn').eq(3).should('contain', 'Checked (external method)')
  })
})
