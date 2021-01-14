/// <reference types="cypress" />

describe('Button visual tests', () => {
  const pageId = 'buttons-button--default';
  const stories = ["story--buttons-button--default", 
  "story--buttons-button--primary-button-story", 
  "story--buttons-button--secondary-button-story", 
  "story--buttons-button--tertiary-button-story", 
  "story--buttons-button--destructive-button-story", 
  "story--buttons-button--positive-button-story", 
  "story--buttons-button--with-leading-slot", 
  "story--buttons-button--with-trailing-slot", 
  "story--buttons-button--with-both-slot"];

  before(() => {
    cy.visitStorybookIframe(pageId);
  });

  stories.forEach(story => {
    it('Verifies ' + `${story}`, () => {
      cy.get(`#${story}`).matchImageSnapshot();
    });
  });
});
