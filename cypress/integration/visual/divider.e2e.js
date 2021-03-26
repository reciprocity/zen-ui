/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Divider visual tests', () => {
  const pageId = 'graphics-divider';

  const stories = ['story--graphics-divider--text'];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories, [], 'sb-zen-divider');
});
