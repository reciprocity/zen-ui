/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Status tracker visual tests', () => {
  const pageId = 'navigation-status-tracker--default';
  const stories = [
    'story--navigation-status-tracker--default-story',
    'story--navigation-status-tracker--story-selected',
  ];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories, 'sb-zen-status-tracker');
});
