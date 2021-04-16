/// <reference types="cypress" />

describe('Tooltip visual tests', { scrollBehavior: 'center' }, () => {
  const pageId = 'notifications-tooltip--slot';
  const story = [
    'story--notifications-tooltip--slot',
    'story--notifications-tooltip--scrollable',
    'story--notifications-tooltip--default-story',
    'story--notifications-tooltip--hyperlink',
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(story);
    cy.get('sb-zen-popover').each(() => {
      cy.get('.popup-wrap .popup').should('not.be.visible');
    });
  });

  it('Verifies ' + `${story[0]}`, () => {
    cy.get(`#${story[0]}`)
      .find('sb-zen-popover')
      .then(el => {
        el.attr('visible', true);
      });
    cy.get(`#${story[0]}`).find('.popup-wrap .popup').should('be.visible').wait(300).matchImageSnapshot();
  });

  it('Verifies ' + `${story[1]}`, () => {
    cy.get(`#${story[1]}`)
      .find('sb-zen-popover')
      .then(el => {
        el.attr('visible', true);
      });
    cy.get(`#${story[1]}`).find('.popup-wrap .popup').should('be.visible').wait(300).matchImageSnapshot();
  });

  it('Verifies ' + `${story[2]}`, () => {
    cy.get(`#${story[2]}`)
      .find('sb-zen-popover')
      .then(el => {
        el.attr('visible', true);
      });
    cy.get(`#${story[2]}`).find('.popup-wrap .popup').should('be.visible').wait(300).matchImageSnapshot();
  });
});
