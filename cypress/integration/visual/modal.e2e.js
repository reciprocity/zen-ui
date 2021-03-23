/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Text visual tests', () => {
  const pageId = 'containers-modal-window--mutiple';
  const stories = [
    'story--containers-modal-window--mutiple',
    'story--containers-modal-window--paddingless',
    'story--containers-modal-window--default-story',
  ];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
    // TODO: screenshots aren't ok we should add clicks and take screenshot of the modal, not of triggering buttons
  });

  createVisualTests(stories, skipedStories);
});
