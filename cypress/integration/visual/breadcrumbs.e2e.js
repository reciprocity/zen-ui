/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Breadcrumbs visual tests', () => {
  const pageId = 'navigation-breadcrumbs--default';

  const stories = [
    'story--navigation-breadcrumbs--links',
    'story--navigation-breadcrumbs--links-and-text',
    'story--navigation-breadcrumbs--default-story',
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories);
});
