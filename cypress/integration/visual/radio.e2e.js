/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Radio visual tests', () => {
  const pageId = 'forms-radio';
  const stories = [
    'story--forms-radio--button',
    'story--forms-radio--button-control',
    'story--forms-radio--default-story',
  ];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories, 'sb-zen-radio');
});
