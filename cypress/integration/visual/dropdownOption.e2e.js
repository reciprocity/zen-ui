/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Dropdown option visual tests', () => {
  const pageId = 'forms-dropdown-dropdown-option--slots';
  const stories = [
    'story--forms-dropdown-dropdown-option--slots',
    'story--forms-dropdown-dropdown-option--story-sizes',
    'story--forms-dropdown-dropdown-option--default-story',
  ];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories, 'sb-zen-option');
});
