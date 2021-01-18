/// <reference types="cypress" />
import {createVisualTests} from '../../support/utils/visualTesting';

describe('Spinner visual tests', () => {

  const pageId = 'icons-spinner--button';
  const stories = ["story--icons-spinner--button", "story--icons-spinner--default-story"];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories);
});
