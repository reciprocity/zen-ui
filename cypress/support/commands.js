import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

const isInteractiveMode = Cypress.config('isInteractive');

function addMatchImageSnapshotCommandInMode(isInteractiveMode) {
  if (isInteractiveMode) {
    Cypress.Commands.add('matchImageSnapshot', () => {
      cy.log('Skipping snapshot');
    });
  } else {
    addMatchImageSnapshotCommand();
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
