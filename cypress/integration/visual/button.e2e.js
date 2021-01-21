/// <reference types="cypress" />
import {createVisualTests} from '../../support/utils/visualTesting';

describe('Button visual tests', () => {

  const pageId = 'buttons-button--default';
  const stories = ["story--buttons-button--story-simple",
  "story--buttons-button--story-loading",
  "story--buttons-button--story-disabled",
  "story--buttons-button--story-with-leading-slot",
  "story--buttons-button--default-story"];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories)
});
