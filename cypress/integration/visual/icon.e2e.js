/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Icon visual tests', () => {
  const pageId = 'icons-icon--default';
  const stories = ['story--icons-icon--default-story'];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories);
});
