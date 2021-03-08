/// <reference types="cypress" />

describe.skip('Dropdown visual tests', { scrollBehavior: 'center' }, () => {
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
