/// <reference types="cypress" />

describe('e2e stock app tests', () => {
  beforeEach(() => {
    cy.visit("?mock=true")
  })

  it('Should load the page', () => {
    cy.findByText('Awesome Stock App').should('be.visible');
  })

  it('Should be able to search and select a stock', () => {
    cy.findByLabelText('PLTR').should('not.exist');
    cy.get('#stock-picker').click().type("p");
    
    cy.findByLabelText('PLTR').should('not.exist');
    cy.contains('PLTR').click();
    cy.findByLabelText('PLTR').should('be.visible');
  })

  it('Should be able to load stock summary and quote data', () => {
    cy.get('#stock-picker').click().type("p");
    cy.contains('PLTR').click();
    cy.findByLabelText('PLTR').should('be.visible');
    cy.findByLabelText('Country').should('have.text', 'USA');
    cy.findByLabelText('Price').should('have.text', '$ 10.11 USD');
  })
})
