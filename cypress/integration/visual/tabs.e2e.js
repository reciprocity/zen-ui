/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Tabs visual tests', () => {
  const pageId = 'in-progress-tabs--default';
  const stories = ['story--in-progress-tabs--default'];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories);
});
