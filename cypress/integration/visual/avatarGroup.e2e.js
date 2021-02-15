/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Avatar group visual tests', () => {
  const pageId = 'icons-avatar-group--default';
  const stories = ['story--icons-avatar-group--story-avatar-group', 'story--icons-avatar-group--default-story'];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories);
});
