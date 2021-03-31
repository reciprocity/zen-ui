/// <reference types="cypress" />

describe('Avatar details visual tests', () => {
  const pageId = 'graphics-avatar-avatar--story-avatar';
  const stories = [
    'story--graphics-avatar-avatar--story-avatar',
    'story--graphics-avatar-avatar--story-avatar-multiple-users',
    'story--graphics-avatar-avatar--default-story',
  ];

  function setPopupVisible(selector) {
    cy.get(selector)
      .find('sb-zen-popover')
      .then(el => {
        el.attr('visible', true);
      })
      .wait(300);
  }

  before(() => {
    cy.visitStorybookIframe(pageId);
    cy.verifyAllStoriesHaveVRT(stories);
  });
  it('Verifies ' + `${stories[0]}`, () => {
    setPopupVisible('#avatar');
    cy.get('#avatar').find('.popup').matchImageSnapshot();
  });

  it('Verifies ' + `${stories[1]}`, () => {
    setPopupVisible('#avatar-multi');
    cy.get('#avatar-multi').find('.popup').matchImageSnapshot();
  });

  it('Verifies ' + `${stories[2]}`, () => {
    setPopupVisible('#avatar-control');
    cy.get('#avatar-control').find('.popup').matchImageSnapshot();
  });
});
