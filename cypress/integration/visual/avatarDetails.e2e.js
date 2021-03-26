/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Avatar details visual tests', () => {
  const pageId = 'graphics-avatar-avatar-details--default';
  const stories = [
    'story--graphics-avatar-avatar-details--default-story',
    'story--graphics-avatar-avatar-details--story-variants',
  ];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories, 'sb-zen-avatar-details');
});
