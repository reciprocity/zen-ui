# ZenUI

[A collection of UI components](https://zen-ui.zengrc.com/) that are shared across Reciprocity applications.

Powered by [Stencil](https://stenciljs.com/) and [Storybook](https://storybook.js.org/).

## Installation

Before installing, download and install [Node.js](https://nodejs.org/en/). Latest [LTS version](https://nodejs.org/en/about/releases/) is recommended.

It is not necessary to have Docker installed as the project is not containerized.

## Quick start

Install dependencies:
```bash
yarn
```

Start Stencil compiler and Storybook server (available at `http://localhost:6006`):
```bash
# Runs both in watch mode with HMR
yarn start
```

#### Create new Web Components

Scaffolds a new component, creating the folder structure with basic code, styles, unit tests, and documentation:
```bash
yarn create:component zen-{component-name}
```

#### Testing
```bash
yarn test
```

#### Linting and Formatting
Both `lint` and `format` commands will run before the changes are pushed to the repository using a [Husky](https://github.com/typicode/husky) pre-push hook.

```bash
# Checks and fixes linting errors
yarn lint
# Only checks for linting errors
yarn lint:check
```

```bash
# Checks and fixes formatting errors
yarn format
# Only checks for formatting errors
yarn format:check
```

## Using components within your own app

For instructions on how to consume this library check the [Getting Started stories](src/stories/getting_started.stories.mdx).
