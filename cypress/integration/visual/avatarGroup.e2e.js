/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Avatar group visual tests', () => {
  const pageId = 'graphics-avatar-avatar-group--default';
  const stories = [
    'story--graphics-avatar-avatar-group--story-avatar-group',
    'story--graphics-avatar-avatar-group--story-avatar-group-colors',
    'story--graphics-avatar-avatar-group--default-story',
  ];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories, 'sb-zen-avatar-group');
});
