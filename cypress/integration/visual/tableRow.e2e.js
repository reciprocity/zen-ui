/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Table row visual tests', () => {
  const pageId = 'tables-table-row--default';

  const stories = ['story--tables-table-row--default-story'];

  const skippedStories = [
    'story--tables-table-row--story-row',
    'story--tables-table-row--story-rows-selectable',
    'story--tables-table-row--story-row-expandable',
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skippedStories);
  });

  createVisualTests(stories, skippedStories, 'sb-zen-table-row');
});
