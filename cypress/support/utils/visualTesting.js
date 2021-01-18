/**
 * Create visual tests for all stories defines in the Array
 * and keep track of the skiped tests for some stories
 *
 * @param {string} stories  Array of stories set for testing
 * @param {string} skipedStories  Array of stories which will be skipped
 */

export function createVisualTests (stories, skipedStories = []) {

  stories.forEach(story => {
    it('Verifies ' + `${story}`, () => {
      cy.get(`#${story}`).matchImageSnapshot();
    });
  });

  skipedStories.forEach(story => {
    it.skip('Verifies ' + `${story}`, () => {
      cy.get(`#${story}`).matchImageSnapshot();
    });
  });
}
