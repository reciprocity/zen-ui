/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Card visual tests', () => {
  const pageId = 'layout-card--default';

  const stories = ['story--layout-card--card', 'story--layout-card--disabled', 'story--layout-card--default-story'];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories, [], 'sb-zen-card');
});
