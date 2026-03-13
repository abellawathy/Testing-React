describe('Login Flow', () => {
  it('should login successfully', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[type=email]').type('poop@ex.com');

    cy.get('input[type=password]').type('12345678');

    cy.contains('Login').click();

    cy.url().should('include', '/');
  });
});
