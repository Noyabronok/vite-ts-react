/// <reference types="cypress" />

describe('e2e stock url app tests', () => {
  it('Should rehidrate stocks from url on load', () => {
    cy.visit("?stocks=%5B%7B%22symbol%22%3A%22PLTR%22%2C%22name%22%3A%22Palantir+Technologies+Inc%22%7D%5D&mock=true")
    cy.findByLabelText('PLTR').should('be.visible');
    cy.findByLabelText('Country').should('have.text', 'USA');
    cy.findByLabelText('Price').should('have.text', '$ 10.11 USD');
  })
});