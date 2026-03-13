describe('Add Comment', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/v1/authentications').as('login');

    cy.visit('http://localhost:3000/login');

    cy.get('[data-testid=email-input]').type('poop@ex.com');
    cy.get('[data-testid=password-input]').type('12345678');
    cy.get('[data-testid=login-button]').click();

    cy.wait('@login');

    cy.intercept('GET', '**/v1/threads').as('getThreads');

    cy.visit('http://localhost:3000/');
    cy.wait('@getThreads');
  });

  it('should add comment', () => {
    cy.get('[data-testid=thread-title]').first().click();
    cy.get('textarea').type('Komentar dari Cypress');
    cy.contains('Send').click();
    cy.contains('Komentar dari Cypress').should('exist');
  });
});
