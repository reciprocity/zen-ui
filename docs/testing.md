# Testing

# Guidelines
- In order to reduce flakiness, all tests must always be deterministic!
  - Meaning when running a test several times, the outcome must be the same.
# Types of tests
- Unit
  - These tests assert against the expected output of a given unit's functionality. Prefer to write and test pure functions as there is no need to account for any side effects.
  - These tests are located next to the source code.
- Integration
  - These tests check the expected functionality for an integration of units. Prefer to test only the minimum set of necessary components for a given integration test. The same also applies for mocking/stubbing components.
  - These tests are located next to the source code.
- E2E and visual tests aka VRT (Visual Regression Testing)
  - As this project provides isolated UI components it does not rely on any external APIs. Given this, there is no need to spin up or mock a database or API calls. However, E2E and visual tests should test an app from the perspective of how the end-user would use it, which in this case is interacting with the components through Storybook.
  - Snapshot diffing is used for visual testing. In order to ensure there are no small differences in snapshots caused by (even slight) differences in runtime environments (like OS fonts and scrollbars) and to guarantee the same environment on local machine and CI, visual testing is enabled only when running tests in headless mode in a Docker container.
  - These tests are located in the project's global scope. In this case all the tests, configs, and related files are located in the `./cypress` folder.

# Technology
We use [Jest](https://jestjs.io/) for unit and integration tests, and [Cypress](https://www.cypress.io/) for E2E and visual tests.

# Running tests

## Unit and integration

To run unit and integration tests in Jest:
```bash
yarn test
```

## E2E and visual

First start Storybook:
```bash
yarn start
```

To run E2E and visual tests in Cypress:
```bash
# Runs Cypress in interactive mode, without visual testing
yarn run test:e2e

# Runs Cypress in headless mode, with visual testing
yarn run test:e2e:headless
# Runs Cypress in headless mode and updates snapshots for visual testing
yarn run test:e2e:update
```
