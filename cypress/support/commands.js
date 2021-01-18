import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

const isInteractiveMode = Cypress.config('isInteractive');

function addMatchImageSnapshotCommandInMode(isInteractiveMode) {
  if (isInteractiveMode) {
    Cypress.Commands.add('matchImageSnapshot', () => {
      cy.log('Skipping snapshot');
    });
  } else {
    addMatchImageSnapshotCommand({failureThreshold: 0.03,
      failureThresholdType: 'percent',
      customDiffConfig: { threshold: 0.1 },});
  }
}

addMatchImageSnapshotCommandInMode(isInteractiveMode);

/**
 * Visits URL iframe's content of a given Storybook docs page
 *
 * @param {string} id  Storybook docs page id
 */
Cypress.Commands.add('visitStorybookIframe', (id) => {
  Cypress.log({ name: 'CUSTOM - visitStorybookIframe: ' });

  cy.visit(`iframe.html?id=${id}&viewMode=docs`);
});

/**
 * Compares number of stories found on the page with the
 * number of tests created
 *
 * @param {string} stories  Array of stories set for testing
 * @param {string} skipedStories  Array of skiped stories
 */
Cypress.Commands.add ('verifyAllStoriesHaveVRT', (stories, skipedStories =[]) => {
  Cypress.log({ name: 'CUSTOM - verifyAllStoriesHaveVRT: ' });
  cy.get('[id^=story--]').each((selector) => {
    let selectors =[];
    selectors.push(selector);
  }).then((selectors) => {
    expect(selectors.length).to.equal(stories.length + skipedStories.length)
  });
});


