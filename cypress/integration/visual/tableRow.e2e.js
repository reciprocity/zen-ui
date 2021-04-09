/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Table row visual tests', () => {
  const pageId = 'lists-table-row--default';

  const stories = ['story--lists-table-row--default-story'];

  const skippedStories = [
    'story--lists-table-row--story-row',
    'story--lists-table-row--story-rows-selectable',
    'story--lists-table-row--story-row-expandable',
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skippedStories);
  });

  createVisualTests(stories, skippedStories, 'sb-zen-table');
});
