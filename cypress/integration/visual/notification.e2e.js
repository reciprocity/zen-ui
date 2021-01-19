/// <reference types="cypress" />
import {createVisualTests} from '../../support/utils/visualTesting';

describe('Notification visual tests', () => {

  const pageId = 'notifications-notification--button';
  const stories = ["story--notifications-notification--button", "story--notifications-notification--default-story"];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories);
});
