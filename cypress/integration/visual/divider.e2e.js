/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Divider visual tests', () => {
  const pageId = 'layout-divider--default';

  const stories = [
    "story--layout-divider--text",
    "story--layout-divider--divs",
    "story--layout-divider--default-story",
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories);
});
