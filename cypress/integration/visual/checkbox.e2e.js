/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Checkbox visual tests', () => {
  const pageId = 'forms-checkbox--default';
  const stories = ['story--forms-checkbox--story-form-group', 'story--forms-checkbox--default-story'];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories);
});
