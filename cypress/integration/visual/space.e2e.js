/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Button visual tests', () => {
  const pageId = 'containers-space';
  const stories = [
    'story--containers-space--sizes',
    'story--containers-space--aligns-vert',
    'story--containers-space--aligns-horz',
    'story--containers-space--aligns-column-vert',
    'story--containers-space--aligns-column-horz',
    'story--containers-space--paddings',
    'story--containers-space--children',
    'story--containers-space--default-story',
  ];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories, 'sb-zen-space');
});
