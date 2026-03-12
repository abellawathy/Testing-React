describe('Add Comment', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');

    cy.get('input[type=email]').type('test@mail.com');
    cy.get('input[type=password]').type('123456');

    cy.contains('Login').click();
  });

  it('should add comment', () => {
    cy.get('[data-testid=thread-title]').first().click();

    cy.get('textarea').type('Komentar dari Cypress');

    cy.contains('Kirim').click();

    cy.contains('Komentar dari Cypress').should('exist');
  });
});
