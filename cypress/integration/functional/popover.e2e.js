/// <reference types="cypress" />

describe('Popover functional tests', { scrollBehavior: 'center' }, () => {
  const pageId = 'layout-popover--story-position-variants';
  const story = [
    'story--layout-popover--story-position-variants',
    'story--layout-popover--story-trigger-events',
    'story--layout-popover--story-scrollable',
    'story--layout-popover--story-filters',
    'story--layout-popover--default-story',
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.get('sb-zen-button').should('be.visible');
  });
  it('Functional test Trigger events ' + `${story[1]}`, () => {
    cy.get(`#${story[1]}`).within(() => {
      cy.contains('Click toggle').click();
      cy.get('[data-popper-placement="bottom"]').should('be.visible');
      cy.contains('Click toggle').click();
      cy.get('[data-popper-placement="bottom"]').should('not.exist');
    });
    cy.get(`#${story[1]}`).within(() => {
      cy.contains('sb-zen-button', 'Click outside').click();
      cy.get('[data-popper-placement="bottom"]').should('be.visible');
      cy.get('[data-test="outer-element"]').first().click('right');
      cy.get('[data-popper-placement="bottom"]').should('not.exist');
    });
    cy.get(`#${story[1]}`).within(() => {
      cy.contains('sb-zen-button', 'Hover').trigger('mouseover');
      cy.get('[data-popper-placement="bottom"]').should('be.visible');
      cy.contains('sb-zen-button', 'Hover').trigger('mouseout');
      cy.get('[data-popper-placement="bottom"]').should('not.exist');
    });
  });
});
