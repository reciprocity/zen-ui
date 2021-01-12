import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

/**
 * Visits URL iframe's content of a given Storybook docs page
 *
 * @param {string} id  Storybook docs page id
 */
Cypress.Commands.add('visitStorybookIframe', (id) => {
  cy.visit(`iframe.html?id=${id}&viewMode=docs`);
});
