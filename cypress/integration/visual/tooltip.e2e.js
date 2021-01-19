/// <reference types="cypress" />

describe('Tooltip visual tests', {scrollBehavior: 'center'}, () => {
  
  // Cypress.config('scrollBehavior', 'center');
  const pageId = 'notifications-tooltip--variant';
  const story = ["story--notifications-tooltip--variant",
  "story--notifications-tooltip--slot",
  "story--notifications-tooltip--scrollable",
  "story--notifications-tooltip--default-story"
];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(story);
    cy.get('zen-tooltip[always-visible="true"]').each((el) => {
      cy.wrap(el).should('be.visible');
    });
  });

  it('Verifies ' + `${story[0]}`, () => {
    cy.get(`#${story[0]}`).matchImageSnapshot();
  });

  it('Verifies ' + `${story[1]}`, () => {
    cy.get(`#${story[1]}`).parents('.innerZoomElementWrapper').matchImageSnapshot();
  });

  it('Verifies ' + `${story[2]}`, () => {
    cy.get(`#${story[2]}`).within(() => {
      cy.contains('Multiple users selected').click();
      cy.get('zen-tooltip').should('be.visible');
    }).parents('.innerZoomElementWrapper').matchImageSnapshot();
  })

  it('Verifies ' + `${story[3]}`, () => {
    cy.get(`#${story[3]}`).within(() => {
      cy.get('zen-button').click();
      cy.get('zen-tooltip').should('be.visible');
    }).parents('.innerZoomElementWrapper').matchImageSnapshot();
  })
});
