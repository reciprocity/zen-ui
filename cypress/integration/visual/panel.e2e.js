/// <reference types="cypress" />

import { createVisualTests } from '../../support/utils/visualTesting';

describe('Panel visual tests', () => {
  const pageId = 'containers-panel--default';

  const stories = [
    'story--containers-panel--text',
    'story--containers-panel--divs',
    'story--containers-panel--form-element',
    'story--containers-panel--form-element-visible',
    'story--containers-panel--default-story',
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories, [], 'sb-zen-panel');
});
