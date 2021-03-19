/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Notification visual tests', () => {
  const pageId = 'notifications-notification-notification--variants';
  const stories = [
    'story--notifications-notification-notification--variants',
    'story--notifications-notification-notification--default-story',
  ];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.get('sb-zen-notification').should('be.visible');
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories, 'sb-zen-notification');
});
