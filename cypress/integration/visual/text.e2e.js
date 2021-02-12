/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Text visual tests', () => {
  const pageId = 'typography-text--default';
  const stories = [
    'story--typography-text--sizes',
    'story--typography-text--headings',
    'story--typography-text--label',
    'story--typography-text--props',
    'story--typography-text--default-story',
  ];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories);
});
