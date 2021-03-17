/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Table header visual tests', () => {
  const pageId = 'tables-table-header--default';

  const stories = ['story--tables-table-header--default-story'];

  const skippedStories = [
    'story--tables-table-header--story-header-selectable',
    'story--tables-table-header--story-header',
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skippedStories);
  });

  createVisualTests(stories, skippedStories, 'sb-zen-table-header');
});
