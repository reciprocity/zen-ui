/// <reference types="cypress" />

describe('Dropdown visual tests', { scrollBehavior: 'center' }, () => {
  const pageId = 'forms-dropdown-dropdown--button';
  const stories = [
    'story--forms-dropdown-dropdown--button',
    'story--forms-dropdown-dropdown--invite-people',
    'story--forms-dropdown-dropdown--story-form-group',
    'story--forms-dropdown-dropdown--default-story',
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  stories.forEach(story => {
    it('Verifies opened dropdown in ' + `${story}`, () => {
      const dropdown = `#${story} sb-zen-dropdown`;
      cy.get(dropdown).click();

      // field screenshot:
      cy.get(dropdown).should('be.visible').matchImageSnapshot(`field-${story}`);

      // menu screenshot:
      cy.get(dropdown).find('.popup').should('be.visible').matchImageSnapshot();
    });
  });
});
