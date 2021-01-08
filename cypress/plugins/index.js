/// <reference types="cypress" />

const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
};
