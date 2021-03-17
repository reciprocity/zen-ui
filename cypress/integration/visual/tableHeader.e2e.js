/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Table header visual tests', () => {
  const pageId = 'lists-table-header--default';

  const stories = ['story--lists-table-header--default-story'];

  const skippedStories = [
    'story--lists-table-header--story-header-selectable',
    'story--lists-table-header--story-header',
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skippedStories);
  });

  createVisualTests(stories, skippedStories, 'sb-zen-table-header');
});
