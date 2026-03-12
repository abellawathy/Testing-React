describe('Vote Thread', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');

    cy.get('input[type=email]').type('test@mail.com');
    cy.get('input[type=password]').type('123456');

    cy.contains('Login').click();
  });

  it('should upvote thread', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testid=upvote-button]').first().click();
  });
});
