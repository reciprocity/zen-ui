/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Avatar icon visual tests', () => {
  const pageId = 'icons-avatar-avatar-icon--default';
  const stories = [
    'story--icons-avatar-avatar-icon--story-avatar-variants',
    'story--icons-avatar-avatar-icon--story-avatar-sizes',
    'story--icons-avatar-avatar-icon--default-story',
  ];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories, 'sb-zen-avatar-icon');
});
