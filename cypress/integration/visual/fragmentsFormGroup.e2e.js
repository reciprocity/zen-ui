/// <reference types="cypress" />
import { createVisualTests } from '../../support/utils/visualTesting';

describe('Form group visual tests', () => {
  const pageId = 'forms-zfragments-form-group--supportlabel';
  const stories = [
    'story--forms-zfragments-form-group--supportlabel',
    'story--forms-zfragments-form-group--textarea',
    'story--forms-zfragments-form-group--all-form-elements',
    'story--forms-zfragments-form-group--default-story',
  ];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  createVisualTests(stories, skipedStories);
});
