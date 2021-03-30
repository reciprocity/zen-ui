/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Icon visual tests', () => {
  const pageId = 'graphics-icon--default';
  const stories = ['story--graphics-icon--default-story', 'story--graphics-icon--paddings'];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories, 'sb-zen-icon');
});
