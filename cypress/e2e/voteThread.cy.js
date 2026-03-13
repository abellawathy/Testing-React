describe('Vote Thread', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[type=email]').type('poop@ex.com');
    cy.get('input[type=password]').type('12345678');

    cy.contains('Login').click();
  });

  it('should upvote thread', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid=upvote-button]').first().click();
  });
});
