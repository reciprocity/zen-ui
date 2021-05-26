/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Badge visual tests', () => {
  const pageId = 'graphics-badge--default';

  const stories = ['story--graphics-badge--default-story'];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories, [], 'sb-zen-badge');
});
