/// <reference types="cypress" />
import {createVisualTests} from '../../support/utils/visualTesting';

describe('Dropdown visual tests', () => {

  const pageId = 'forms-dropdown--button';
  const stories = ["story--forms-dropdown--button",
  "story--forms-dropdown--invite-people",
  "story--forms-dropdown--default-story"];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories);
});
