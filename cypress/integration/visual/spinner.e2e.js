/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Spinner visual tests', () => {
  const pageId = 'graphics-spinner--button';
  const stories = ['story--graphics-spinner--button', 'story--graphics-spinner--default-story'];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories, [], 'sb-zen-spinner');
});
