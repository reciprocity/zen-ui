/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Lozenge visual tests', () => {
  const pageId = 'graphics-lozenge--default';
  const stories = ['story--graphics-lozenge--default-story', 'story--graphics-lozenge--story-variants'];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories, 'sb-zen-lozenge');
});
