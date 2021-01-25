/// <reference types="cypress" />
import {createVisualTests} from '../../support/utils/visualTesting';

describe('Label visual tests', () => {

  const pageId = 'forms-zfragments-label--story-simple';
  const stories = ["story--forms-zfragments-label--story-simple",
  "story--forms-zfragments-label--default-story"];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories)
});
