/**
 * Create visual tests for all stories defines in the Array
 * and keep track of the skiped tests for some stories
 *
 * @param {Array<string>} stories  Array of stories set for testing
 * @param {Array<string>} skipedStories  Array of stories which will be skipped
 */

export function createVisualTests(stories, skipedStories = [], selector) {
  stories.forEach(story => {
    it('Verifies ' + `${story}`, () => {
      if (selector) {
        cy.get(`#${story} ${selector}`).should('be.visible');
      }
      cy.get(`#${story}`).matchImageSnapshot();
    });
  });

  skipedStories.forEach(story => {
    it.skip('Verifies ' + `${story}`, () => {
      cy.get(`#${story}`).matchImageSnapshot();
    });
  });
}
