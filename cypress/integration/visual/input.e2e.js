/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Input visual tests', () => {
  const pageId = 'forms-input';
  const stories = [
    'story--forms-input--story-sizes',
    'story--forms-input--story-with-leading-slot',
    'story--forms-input--story-with-trailing-slot',
    'story--forms-input--story-with-leading-and-trailing-slots',
    'story--forms-input--story-form-group',
    'story--forms-input--default-story',
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories, [], 'sb-zen-input');
});
