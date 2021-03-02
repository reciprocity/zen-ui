/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Divider visual tests', () => {
  const pageId = 'layout-divider';

  const stories = ['story--layout-divider--text'];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories);
});
