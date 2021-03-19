/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Sortable visual tests', () => {
  const pageId = 'in-progress-sortable-sortable--default';

  const stories = [
    'story--in-progress-sortable-sortable--default-story',
    'story--in-progress-sortable-sortable--sortable',
  ];

  const skippedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skippedStories);
  });

  createVisualTests(stories, skippedStories, 'sb-zen-sortable');
});
