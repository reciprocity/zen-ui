/// <reference types="cypress" />

describe('Dropdown visual tests', { scrollBehavior: 'center' }, () => {
  const pageId = 'forms-dropdown--button';
  const stories = [
    'story--forms-dropdown--button',
    'story--forms-dropdown--invite-people',
    'story--forms-dropdown--story-form-group',
    'story--forms-dropdown--default-story',
  ];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  stories.forEach(story => {
    it('Verifies opened dropdown in ' + `${story}`, () => {
      const dropdown = `#${story} sb-zen-dropdown`;
      cy.get(dropdown).click();
      // wait menu:
      cy.get(dropdown)
        .shadow()
        .find('sb-zen-popover')
        .shadow()
        .find('.popup-wrap', { timeout: 1000 })
        .should('be.visible');

      // field screenshot:
      cy.get(dropdown)
        .shadow()
        .find('sb-zen-popover')
        .shadow()
        .find('.popup-wrap')
        .should('be.visible')
        .matchImageSnapshot();

      // menu screenshot:
      cy.get(dropdown).should('be.visible').matchImageSnapshot(`field-${story}`);
    });
  });
});
