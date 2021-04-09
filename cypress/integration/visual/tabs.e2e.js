/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Tabs visual tests', () => {
  const pageId = 'navigation-tabs-tabs--default';
  const stories = ['story--navigation-tabs-tabs--default-story'];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories);
});
