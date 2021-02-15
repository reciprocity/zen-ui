/// <reference types="cypress" />

describe('HTML Playground', () => {
  const pageId = 'playground--page';

  before(() => {
    cy.visitStorybookIframe(pageId);
  });

  it('should render title', () => {
    cy.get('#html-playground').should('have.text', 'Html Playground').matchImageSnapshot();
  });
});
