/// <reference types="cypress" />

describe('Tooltip visual tests', { scrollBehavior: 'center' }, () => {
  // Cypress.config('scrollBehavior', 'center');
  const pageId = 'notifications-tooltip--variant';
  const story = [
    'story--notifications-tooltip--variant',
    'story--notifications-tooltip--slot',
    'story--notifications-tooltip--scrollable',
    'story--notifications-tooltip--default-story',
  ];

  function findPopup(cy) {
    return cy.get('sb-zen-tooltip').shadow().find('sb-zen-popover').shadow().find('.popup-wrap .popup');
  }

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(story);
    cy.get('sb-zen-tooltip').each(() => {
      findPopup(cy).should('not.be.visible');
    });
  });

  it('Verifies ' + `${story[0]}`, () => {
    cy.get(`#${story[0]}`).matchImageSnapshot();
  });

  it('Verifies ' + `${story[1]}`, () => {
    cy.get(`#${story[1]}`).parents('.innerZoomElementWrapper').matchImageSnapshot();
  });

  it('Verifies ' + `${story[2]}`, () => {
    cy.get(`#${story[2]}`)
      .within(() => {
        cy.get('sb-zen-button').trigger('mouseover');
        findPopup(cy).should('be.visible').wait(300);
      })
      .parents('.innerZoomElementWrapper')
      .matchImageSnapshot();
  });

  it('Verifies ' + `${story[3]}`, () => {
    cy.get(`#${story[3]}`)
      .within(() => {
        cy.get('sb-zen-button').trigger('mouseover');
        findPopup(cy).should('be.visible').wait(300);
      })
      .parents('.innerZoomElementWrapper')
      .matchImageSnapshot();
  });
});
