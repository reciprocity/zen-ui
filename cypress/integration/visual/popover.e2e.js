/// <reference types="cypress" />

describe('Popover visual tests', { scrollBehavior: 'center' }, () => {
  const pageId = 'containers-popover--story-position-variants';
  const story = [
    'story--containers-popover--story-position-variants',
    'story--containers-popover--story-trigger-events',
    'story--containers-popover--story-scrollable',
    'story--containers-popover--default-story',
  ];

  const skipedStories = ['story--containers-popover--story-filters'];

  beforeEach(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(story, skipedStories);
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
      .scrollIntoView()
      .within(doc => {
        cy.get('[data-test="scroll"]').scrollTo('top');
        cy.get('[data-popper-placement="top-end"]').should('be.visible');
        cy.wrap(doc).matchImageSnapshot('top-end');
        cy.get('[data-test="scroll"]').scrollTo('bottom');
        cy.wait(500);
        cy.wrap(doc).matchImageSnapshot('bottom-end');
      });
  });

  it.skip('Verifies ' + `${story[3]}`, () => {
    cy.get(`#${story[3]}`).within(() => {
      cy.contains('Filter').click();
      cy.get('[data-popper-placement="bottom-start"]').should('be.visible');
    });
    cy.matchImageSnapshot({
      capture: 'viewport',
    });
  });

  it('Verifies ' + `${story[3]}`, () => {
    cy.get(`#${story[3]}`)
      .parents('.docs-story')
      .within(doc => {
        cy.contains('sb-zen-button', 'Button').click();
        cy.get('[data-popper-placement="bottom-start"]').should('be.visible');
        cy.wrap(doc).matchImageSnapshot();
      });
  });
});
