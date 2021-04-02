/// <reference types="cypress" />

describe('Avatar group visual tests', () => {
  const pageId = 'graphics-avatar-avatar-group--default';
  const stories = [
    'story--graphics-avatar-avatar-group--story-avatar-group',
    'story--graphics-avatar-avatar-group--story-avatar-group-colors',
    'story--graphics-avatar-avatar-group--default-story',
  ];

  function setPopupVisible(el) {
    cy.wrap(el)
      .find('sb-zen-popover')
      .then(el => {
        el.attr('visible', true);
      })
      .wait(300);
  }

  beforeEach(() => {
    cy.visitStorybookIframe(pageId);
    cy.get('sb-zen-avatar-group').should('be.visible');
    cy.verifyAllStoriesHaveVRT(stories);
  });
  it('Verifies ' + `${stories[0]}`, () => {
    cy.get('#avatar-group')
      .find('sb-zen-avatar')
      .first()
      .then(el => {
        setPopupVisible(el);
        cy.wrap(el).find('.popup').matchImageSnapshot('Avatar group popover - single user');
      });
    cy.get('#avatar-group')
      .find('sb-zen-avatar')
      .last()
      .then(el => {
        setPopupVisible(el);
        cy.wrap(el).find('.popup').matchImageSnapshot('Avatar group popover - multiple users');
      });
  });

  it('Verifies ' + `${stories[1]}`, () => {
    cy.get(`#${stories[1]}`).matchImageSnapshot('Avatar colors - icons');
    cy.get('#avatar-group-colors')
      .find('sb-zen-avatar')
      .first()
      .then(el => {
        setPopupVisible(el);
        cy.wrap(el).find('.popup').matchImageSnapshot('Avatar colors popover');
      });
  });

  it('Verifies ' + `${stories[2]}`, () => {
    cy.get(`#${stories[2]}`).matchImageSnapshot('Avatar group - medium icons');
    cy.get('#maxIcons').clear().type('3{enter}');
    cy.contains('tr', 'size').find('select').select('lg');
    cy.get('#avatar-group-control').should('have.attr', 'size', 'lg');
    cy.get(`#${stories[2]}`).matchImageSnapshot('Avatar group - large icons with 3 icons');
  });
});
