/// <reference types="cypress" />

describe.skip('Dropdown visual tests', { scrollBehavior: false }, () => {
  const pageId = 'forms-dropdown-dropdown--button';
  const dropdown = [
    {
      storie: 'story--forms-dropdown-dropdown--button',
      id: '#dropdown-with-options-slot',
      position: 'bottom-start',
    },
    {
      storie: 'story--forms-dropdown-dropdown--story-sizes',
      id: '#dropdown-size-md',
      position: 'bottom-start',
    },
    {
      storie: 'story--forms-dropdown-dropdown--invite-people',
      id: '#dropdown1',
      position: 'bottom-end',
    },
    {
      storie: 'story--forms-dropdown-dropdown--story-form-group',
      id: '#dropdown-form-group',
      position: 'bottom-start',
    },
    {
      storie: 'story--forms-dropdown-dropdown--default-story',
      id: '#dropdown-controls',
      position: 'bottom-start',
    },
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(dropdown);
  });
  dropdown.forEach(el => {
    it('Verifies opened dropdown in ' + `${el.storie}`, () => {
      cy.get(el.id).scrollIntoView().matchImageSnapshot(`field-${el.storie}`);
      cy.get(el.id).scrollIntoView().click();
      cy.wait(500);
      cy.get(el.id).find(`[data-popper-placement="${el.position}"]`).matchImageSnapshot();
    });
  });
});
