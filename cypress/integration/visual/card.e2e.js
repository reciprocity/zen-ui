/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Card visual tests', () => {
  const pageId = 'containers-card--default';

  const stories = [
    'story--containers-card--card',
    'story--containers-card--disabled',
    'story--containers-card--default-story',
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories);
});
