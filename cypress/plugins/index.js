/// <reference types="cypress" />

const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);

  on('before:browser:launch', (browser, launchOptions) => {
    if (browser.name === 'chrome' && browser.isHeadless) {
      launchOptions.args.push('--window-size=1440,900');

      // force screen to be non-retina (1400x1200 size)
      // launchOptions.args.push('--force-device-scale-factor=1')
    }

    if (browser.name === 'electron' && browser.isHeadless) {
      launchOptions.preferences.width = 1440;
      launchOptions.preferences.height = 900;
      launchOptions.preferences['resizable'] = false;
    }

    if (browser.name === 'firefox' && browser.isHeadless) {
      // menubars take up height on the screen
      launchOptions.args.push('--width=1440');
      launchOptions.args.push('--height=900');
    }

    return launchOptions;
  });
};
