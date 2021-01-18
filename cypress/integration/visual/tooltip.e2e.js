/// <reference types="cypress" />
import {createVisualTests} from '../../support/utils/visualTesting';

describe('Tooltip visual tests', () => {

  const pageId = 'notifications-tooltip--variant';
  const stories = ["story--notifications-tooltip--variant",
"story--notifications-tooltip--slot",
"story--notifications-tooltip--scrollable",
"story--notifications-tooltip--default-story"
];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  createVisualTests(stories);
});
