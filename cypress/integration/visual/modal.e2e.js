/// <reference types="cypress" />

describe('Text visual tests', () => {
  const pageId = 'containers-modal-window--mutiple';
  const stories = ['story--containers-modal-window--mutiple', 'story--containers-modal-window--default-story'];

  // Example how to skip testing for some user stories
  const skipedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories, skipedStories);
  });

  beforeEach(() => {
    cy.visitStorybookIframe(pageId);
  });

  it('Verifies ' + `${stories[0]}`, () => {
    cy.get(`#${stories[0]}`).contains('Show Editor').click();
    cy.get('#editor').should('have.attr', 'show');
    cy.get('#editor').find('sb-zen-animate').wait(300).matchImageSnapshot('editor');
    cy.get('#editor').find('.x-button').click();
    cy.get('#editor').should('not.have.attr', 'show');
    cy.get(`#${stories[0]}`).contains('Show Confirmation').click();
    cy.get('#confirm').should('have.attr', 'show');
    cy.get('#confirm').find('sb-zen-animate').wait(300).matchImageSnapshot('confirm');
  });

  it('Verifies ' + `${stories[1]}`, () => {
    cy.get(`#${stories[1]}`).contains('Show Editor').click();
    cy.get('#modal1').should('have.attr', 'show');
    cy.get('#modal1').find('sb-zen-animate').wait(300).matchImageSnapshot();
  });
});
