/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Panel visual tests', () => {
  const pageId = 'layout-panel--default';

  const stories = [
    'story--layout-panel--text',
    'story--layout-panel--divs',
    'story--layout-panel--form-element',
    'story--layout-panel--form-element-visible',
    'story--layout-panel--default-story',
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories, [], 'sb-zen-panel');
});
