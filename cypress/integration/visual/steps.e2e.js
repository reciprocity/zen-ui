/// <reference types="cypress" />
import {createVisualTests} from '../../support/utils/visualTesting';

describe('Steps visual tests', () => {

  const pageId = 'navigation-steps--default-story';
  const stories = ["story--navigation-steps--default-story"];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories);
});
