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
    cy.matchImageSnapshot({ capture: 'viewport', clip: { x: 0, y: 150, width: 1000, height: 200 } });
  });

  it('Verifies ' + `${stories[1]}`, () => {
    setPopupVisible('#avatar-multi');
    cy.matchImageSnapshot({ capture: 'viewport', clip: { x: 0, y: 150, width: 1000, height: 400 } });
  });

  it('Verifies ' + `${stories[2]}`, () => {
    setPopupVisible('#avatar-control');
    cy.matchImageSnapshot({ capture: 'viewport', clip: { x: 0, y: 500, width: 1000, height: 350 } });
  });
});
