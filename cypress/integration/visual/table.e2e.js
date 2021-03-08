/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Table visual tests', () => {
  const pageId = 'tables-table--default';

  const stories = [
    'story--tables-table--with-fragments',
    'story--tables-table--sticky-header',
    'story--tables-table--no-header',
    'story--tables-table--selectable',
    'story--tables-table--tree',
    'story--tables-table--custom',
    'story--tables-table--default-story',
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories, [], 'sb-zen-table');
});
