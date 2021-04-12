/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Table visual tests', () => {
  const pageId = 'lists-table-table--default';

  const stories = [
    'story--lists-table-table--with-fragments',
    'story--lists-table-table--sticky-header',
    'story--lists-table-table--no-header',
  ];

  const skippedStories = [
    'story--lists-table-table--selectable',
    'story--lists-table-table--tree-with-header',
    'story--lists-table-table--custom',
    'story--lists-table-table--default-story',
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skippedStories);
  });

  createVisualTests(stories, skippedStories, 'sb-zen-table');
});
