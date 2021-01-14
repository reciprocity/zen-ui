/// <reference types="cypress" />

describe('Button visual tests', () => {
  const pageId = 'buttons-button--default';
  const stories = ["story--buttons-button--story-simple", 
  "story--buttons-button--story-loading", 
  "story--buttons-button--story-disabled", 
  "story--buttons-button--story-with-leading-slot", 
  "story--buttons-button--story-with-trailing-slot", 
  "story--buttons-button--story-with-leading-and-trailing-slots", 
  "story--buttons-button--default-story"];

  before(() => {
    cy.visitStorybookIframe(pageId);
  });

  stories.forEach(story => {
    it('Verifies ' + `${story}`, () => {
      cy.get(`#${story}`).matchImageSnapshot();
    });
  });
});
