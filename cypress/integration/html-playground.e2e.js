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

context('HTML Playground', () => {
  const pageId = 'playground--page';

  beforeEach(() => {
    cy.visit(toInlineFrameContentUrl(pageId));
  })

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
