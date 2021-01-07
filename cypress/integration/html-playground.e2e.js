/// <reference types="cypress" />


// TODO: TEMP move this to global scope
const url = 'http://localhost:6006';

// TODO: TEMP move this to global scope
/**
 * Returns URL for iframe content of a given Storybook docs page
 *
 * @param {string} id  Storybook docs page id
 */
function toInlineFrameContentUrl(id) {
  return `${url}/iframe.html?id=${id}&viewMode=docs`;
}


// TODO: worth discussing is whether Cypress tests scoped to
//       a single component should be next to the source code

context('HTML Playground', () => {
  const pageId = 'playground--page';

  beforeEach(() => {
    cy.visit(toInlineFrameContentUrl(pageId));
  })

  // TODO: this would be the other way of doing it
  it.skip('should render title', () => {
    cy.get('#playground--page').click();

    cy.frameLoaded('#storybook-preview-iframe');

    cy.iframe('#storybook-preview-iframe')
      .find('#html-playground')
      .should('have.text', 'Html Playground')
      .matchImageSnapshot('title');
  });

  it('should render title', () => {
    cy
      .get('#html-playground')
      .should('have.text', 'Html Playground')
      .matchImageSnapshot();
  });

  it('should render preview area', () => {
    cy
      .get('html-playground')
      .find('textarea')
      .matchImageSnapshot();
  });
});
