/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Button visual tests', () => {
  const pageId = 'layout-space';
  const stories = [
    'story--layout-space--sizes',
    'story--layout-space--aligns-vert',
    'story--layout-space--aligns-horz',
    'story--layout-space--aligns-column-vert',
    'story--layout-space--aligns-column-horz',
    'story--layout-space--paddings',
    'story--layout-space--children',
    'story--layout-space--default-story',
  ];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories, 'sb-zen-space');
});
