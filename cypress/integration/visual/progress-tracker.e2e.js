/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Progress tracker visual tests', () => {
  const pageId = 'navigation-progress-tracker--default-story';
  const stories = ['story--navigation-progress-tracker--default-story'];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories);
});
