/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Sortable visual tests', () => {
  const pageId = 'lists-sortable-sortable--default';

  const stories = ['story--lists-sortable-sortable--default-story', 'story--lists-sortable-sortable--sortable'];

  const skippedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skippedStories);
  });

  createVisualTests(stories, skippedStories, 'sb-zen-sortable');
});
