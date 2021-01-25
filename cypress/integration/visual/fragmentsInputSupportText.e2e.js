/// <reference types="cypress" />
import {createVisualTests} from '../../support/utils/visualTesting';

describe('Input Support Text visual tests', () => {

  const pageId = 'forms-zfragments-input-support-text--story-simple';
  const stories = ["story--forms-zfragments-input-support-text--story-simple",
  "story--forms-zfragments-input-support-text--default-story"];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories)
});
