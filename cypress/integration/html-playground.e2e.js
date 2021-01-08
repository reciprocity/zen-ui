/// <reference types="cypress" />

import { toInlineFrameContentUrl } from '../utils';

context('HTML Playground', () => {
  const pageId = 'playground--page';

  before(() => {
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
