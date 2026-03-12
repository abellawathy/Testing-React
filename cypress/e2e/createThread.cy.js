describe('Create Thread', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[type=email]').type('test@mail.com');
    cy.get('input[type=password]').type('123456');

    cy.contains('Login').click();
  });

  it('should create new thread', () => {
    cy.contains('Buat Thread').click();

    cy.get('input[name=title]').type('Thread Cypress Test');

    cy.get('textarea[name=body]').type('Ini thread yang dibuat oleh Cypress');

    cy.get('input[name=category]').type('testing');

    cy.contains('Buat').click();

    cy.contains('Thread Cypress Test').should('exist');
  });
});
