describe('Vote Thread in Detail Page', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/v1/login').as('login');
    cy.visit('http://localhost:3000/login');
    cy.get('[data-testid=email-input]').type('poop@ex.com');
    cy.get('[data-testid=password-input]').type('12345678');
    cy.get('[data-testid=login-button]').click();
    cy.wait('@login');
    cy.contains('Create Thread', { timeout: 10000 }).should('exist');
    cy.intercept('GET', '**/v1/threads').as('getThreads');
  });

  it('should upvote thread successfully', () => {
    cy.wait('@getThreads');
    cy.get('[data-testid=thread-title]').first().click();

    cy.intercept('POST', '**/v1/threads/**/*-vote').as('voteAPI');

    cy.get('[data-testid=upvote-button]').click();

    cy.wait('@voteAPI').its('response.statusCode').should('eq', 201);

    cy.get('[data-testid=upvote-button]').should('exist');
  });
});
