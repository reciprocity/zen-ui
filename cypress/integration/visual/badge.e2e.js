/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Badge visual tests', () => {
  const pageId = 'containers-badge--default';

  const stories = ['story--containers-badge--default-story'];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories, [], 'sb-zen-badge');
});
