/// <reference types="cypress" />

describe('Date-picker visual tests', { scrollBehavior: 'center' }, () => {
  const pageId = 'forms-date-picker--default-story';
  const stories = ['story--forms-date-picker--default-story'];

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });

  stories.forEach(story => {
    it('Verifies opened datepicker in ' + `${story}`, () => {
      const datepicker = `#${story} sb-zen-date-picker`;
      cy.get(datepicker).then(picker => {
        picker[0].value = new Date(1972, 1, 18);
        cy.get(datepicker).click();

        // field screenshot:
        cy.get(datepicker)
          .shadow()
          .find('sb-zen-popover')
          .shadow()
          .find('.popup-wrap')
          .should('be.visible')
          .wait(300) // transition
          .matchImageSnapshot();

        // menu screenshot:
        cy.get(datepicker).should('be.visible').matchImageSnapshot(`field-${story}`);
      });
    });
  });
});
