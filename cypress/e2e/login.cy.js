describe('Login Flow', () => {
  it('should login successfully', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('[data-testid=email-input]').type('poop@ex.com');
    cy.get('[data-testid=password-input]').type('12345678');
    cy.get('[data-testid=login-button]').click();

    cy.contains('Create Thread').should('exist');
  });
});
