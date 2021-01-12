declare namespace Cypress {
  interface Chainable {
    /**
     * Visit the storybook Iframe with specified pageId
     *
     * @file support/commands.js
     *
     * @param {string} id PageId defined in the story URl
     *
     * @example
     * cy.visitStorybookIframe('playground--page');
     */
    visitStorybookIframe(id: string): Chainable<Element>;
  }
}
