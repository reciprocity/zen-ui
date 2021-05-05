/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Sidebar Nav Skeleton visual tests', () => {
  const pageId = 'navigation-sidebar-navigation-sidebar-nav-skeleton';
  const stories = ['story--navigation-sidebar-navigation-sidebar-nav-skeleton--default-story'];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories, 'sb-zen-sidebar-nav-skeleton');
});
