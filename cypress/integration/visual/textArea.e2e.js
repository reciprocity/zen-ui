/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Text area visual tests', () => {
  const pageId = 'forms-textarea--textarea-within-group';
  const stories = ['story--forms-textarea--textarea-within-group', 'story--forms-textarea--button'];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories, [], 'sb-zen-textarea');
});
