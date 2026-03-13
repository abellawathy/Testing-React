describe('Create Thread', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/v1/authentications').as('login');

    cy.visit('http://localhost:3000/login');

    cy.get('[data-testid=email-input]').type('poop@ex.com');
    cy.get('[data-testid=password-input]').type('12345678');
    cy.get('[data-testid=login-button]').click();

    cy.wait('@login');
  });

  it('should create new thread', () => {
    cy.intercept('POST', '**/v1/threads').as('createThread');

    cy.contains('Create Thread').click();

    cy.get('input[placeholder=Title]').type('Thread Cypress Test');
    cy.get('textarea[placeholder=Body]').type(
      'Ini thread yang dibuat oleh Cypress'
    );
    cy.get('input[placeholder=Category]').type('testing');

    cy.get('[data-testid=create-thread-btn]').click();

    cy.wait('@createThread');

    cy.contains('Thread Cypress Test', { timeout: 10000 }).should('exist');
  });
});
