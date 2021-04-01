/// <reference types="cypress" />

describe('Tooltip visual tests', { scrollBehavior: 'center' }, () => {
  const pageId = 'notifications-tooltip--variant';
  const story = [
    'story--notifications-tooltip--variant',
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
    const variants = ['dark', 'light', 'error'];
    variants.forEach(variant => {
      cy.get(`[variant="${variant}"]`)
        .find('sb-zen-popover')
        .then(el => {
          el.attr('visible', true);
        });
      cy.get(`[variant="${variant}"]`)
        .find('.popup-wrap .popup')
        .first()
        .should('be.visible')
        .wait(300)
        .matchImageSnapshot(`${variant}`);
    });
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

  it('Verifies ' + `${story[3]}`, () => {
    cy.get(`#${story[3]}`)
      .find('sb-zen-popover')
      .then(el => {
        el.attr('visible', true);
      });
    cy.get(`#${story[3]}`).find('.popup-wrap .popup').should('be.visible').wait(300).matchImageSnapshot();
  });
});
