/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Button visual tests', () => {
  const pageId = 'forms-button--default';
  const stories = [
    'story--forms-button--story-simple',
    'story--forms-button--story-sizes',
    'story--forms-button--story-loading',
    'story--forms-button--story-disabled',
    'story--forms-button--story-with-icons',
    'story--forms-button--default-story',
  ];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories, 'sb-zen-button');
});
