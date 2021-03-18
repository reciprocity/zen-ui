/// <reference types="cypress" />

describe('Popover visual tests', { scrollBehavior: 'center' }, () => {
  const pageId = 'layout-popover--story-position-variants';
  const story = [
    'story--layout-popover--story-position-variants',
    'story--layout-popover--story-trigger-events',
    'story--layout-popover--story-scrollable',
    'story--layout-popover--story-filters',
    'story--layout-popover--default-story',
  ];

  beforeEach(() => {
    cy.visitStorybookIframe(pageId);
    // cy.verifyAllStoriesHaveVRT(story);
    cy.get('sb-zen-button').should('be.visible');
  });

  it('Verifies ' + `${story[0]}`, () => {
    const variants = ['left', 'bottom-start', 'bottom-end', 'top-start', 'top-end', 'right'];

    variants.forEach(variant => {
      cy.get(`#${story[0]}`)
        .parents('.docs-story')
        .within(doc => {
          cy.contains('sb-zen-button', variant).click();
          cy.get(`[data-popper-placement="${variant}"]`).should('be.visible');
          cy.wrap(doc).matchImageSnapshot(`${variant}Placement`);
        });
    });
  });

  it('Functional test Trigger events ' + `${story[1]}`, () => {
    cy.get(`#${story[1]}`)
      .parents('.docs-story')
      .within(doc => {
        cy.contains('Click toggle').click();
        cy.get('[data-popper-placement="bottom"]').should('be.visible');
        cy.wrap(doc).matchImageSnapshot();
      });
  });

  it('Verifies ' + `${story[2]}`, () => {
    cy.get(`#${story[2]}`)
      .parents('.docs-story')
      .within(doc => {
        cy.get('[data-test="scroll"]').scrollTo('bottom');
        cy.get('[data-popper-placement="top-end"]').should('be.visible');
        cy.wrap(doc).matchImageSnapshot('top-end');
        cy.get('[data-test="scroll"]').scrollTo('bottom');
        cy.get('[data-popper-placement="bottom-end"]').should('be.visible');
        cy.wrap(doc).matchImageSnapshot('bottom-end');
      });
  });

  it('Verifies ' + `${story[3]}`, () => {
    cy.get(`#${story[3]}`).within(() => {
      cy.contains('Filter').click();
      cy.get('[data-popper-placement="bottom-start"]').should('be.visible');
    });
    cy.matchImageSnapshot({
      capture: 'viewport',
      disableTimersAndAnimations: true,
    });
  });

  it('Verifies ' + `${story[4]}`, () => {
    cy.get(`#${story[4]}`)
      .parents('.docs-story')
      .within(doc => {
        cy.contains('sb-zen-button', 'Button').click();
        cy.get('[data-popper-placement="bottom-start"]').should('be.visible');
        cy.wrap(doc).matchImageSnapshot();
      });
  });
});
