/// <reference types="cypress" />

describe('Dropdown visual tests', { scrollBehavior: 'center' }, () => {
  const pageId = 'forms-dropdown-dropdown--button';
  const dropdown = [
    {
      storie: 'story--forms-dropdown-dropdown--story-sizes',
      id: '#dropdown-size-md',
      height: 250,
    },
    {
      storie: 'story--forms-dropdown-dropdown--button',
      id: '#dropdown-with-options-slot',
      height: 300,
    },
    {
      storie: 'story--forms-dropdown-dropdown--invite-people',
      id: '#dropdown1',
      height: 250,
    },
    {
      storie: 'story--forms-dropdown-dropdown--story-form-group',
      id: '#dropdown-form-group',
      height: 250,
    },
    {
      storie: 'story--forms-dropdown-dropdown--default-story',
      id: 'sb-zen-dropdown#dropdown-controls',
      height: 300,
    },
  ];

  beforeEach(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(dropdown);
    cy.get('sb-zen-dropdown').should('be.visible');
  });
  dropdown.forEach(el => {
    it('Verifies opened dropdown in ' + `${el.storie}`, () => {
      cy.get(el.id).matchImageSnapshot(`field-${el.storie}`);
      cy.get(el.id).click();
      cy.wait(500);
      cy.matchImageSnapshot({ capture: 'viewport', clip: { x: 0, y: 250, width: 1000, height: el.height } });
    });
  });
});
