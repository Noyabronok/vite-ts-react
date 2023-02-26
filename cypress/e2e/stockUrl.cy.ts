/// <reference types="cypress" />

describe("e2e stock url app tests", () => {
  it("Should rehidrate stocks from url on load", () => {
    cy.visit("/", {
      qs: {
        mock: true,
        stocks: "PLTR~P2LT34.SAO~PTX.FRK",
      },
    });
    cy.findAllByRole("article").should("have.length", 3);
    cy.findByLabelText("PLTR")
      .should("be.visible")
      .within(() => {
        cy.findByLabelText("Country").should("have.text", "USA");
        cy.findByLabelText("Price").should("have.text", "$ 10.11 USD");
      });
  });
});
