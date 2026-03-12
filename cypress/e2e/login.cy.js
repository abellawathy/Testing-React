describe('Login Flow', () => {
  it('should login successfully', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[type=email]').type('test@mail.com');

    cy.get('input[type=password]').type('123456');

    cy.contains('Login').click();

    cy.url().should('include', '/');
  });
});
