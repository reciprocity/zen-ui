/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Toggle visual tests', () => {
  const pageId = 'forms-toggle--default';
  const stories = ['story--forms-toggle--variants', 'story--forms-toggle--default-story'];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories);
});
