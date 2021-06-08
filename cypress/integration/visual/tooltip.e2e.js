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

  const skippedStories = [];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(story, skippedStories);
    cy.get('sb-zen-popover').each(() => {
      cy.get('.popup-wrap .popup').should('not.be.visible');
    });
  });

  it('Verifies ' + `${story[0]}`, () => {
    cy.get(`[data-test="light"]`)
      .find('sb-zen-popover')
      .then(el => {
        el.attr('visible', true);
      });
    cy.get(`[data-test="dark"]`)
      .find('sb-zen-popover')
      .then(el => {
        el.attr('visible', true);
      });
    cy.wait(300);
    cy.matchImageSnapshot({ capture: 'viewport', clip: { x: 0, y: 50, width: 1000, height: 350 } });
  });

  it('Verifies ' + `${story[1]}`, () => {
    cy.get(`#${story[1]}`)
      .find('sb-zen-popover')
      .then(el => {
        el.attr('visible', true);
      });
    cy.wait(300);
    cy.matchImageSnapshot({ capture: 'viewport', clip: { x: 0, y: 350, width: 1000, height: 200 } });
  });

  it('Verifies ' + `${story[2]}`, () => {
    cy.get(`#${story[2]}`)
      .find('sb-zen-popover')
      .then(el => {
        el.attr('visible', true);
      });
    cy.wait(300);
    cy.matchImageSnapshot({ capture: 'viewport', clip: { x: 0, y: 500, width: 1000, height: 350 } });
  });
  it('Verifies ' + `${story[3]}`, () => {
    cy.get(`#${story[3]}`)
      .scrollIntoView()
      .find('sb-zen-popover')
      .then(el => {
        el.attr('visible', true);
      });
    cy.wait(300);
    cy.matchImageSnapshot({ capture: 'viewport', clip: { x: 0, y: 0, width: 1000, height: 350 } });
  });

  it('Verifies ' + `${story[4]}`, () => {
    cy.get(`#${story[4]}`)
      .scrollIntoView()
      .find('sb-zen-popover')
      .then(el => {
        el.attr('visible', true);
      });
    cy.wait(300);
    cy.matchImageSnapshot({ capture: 'viewport', clip: { x: 0, y: 0, width: 1000, height: 550 } });
  });
});
