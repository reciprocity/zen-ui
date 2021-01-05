
# Architecture

## Technology

### Stencil
The components library uses the [Stencil](https://stenciljs.com/docs/introduction) compiler to produce **Standard Web Components**.

### Web components
Web Components are part of the existing Web Standards. Thus they are natively supported by modern web browsers (IE with polyfills).

Therefore they can be consumed in any frontend framework (React, Vue, Angular,...), as well as with vanilla JS.

### Storybook
For presentation, we're using [Storybook](https://storybook.js.org/), which is an industry-standard for presenting component libraries and design styles.

## Folder structure

`.storybook` Storybook configuration files.
`.circleci` Deployment configuration.
`.husky` Pre-Commit and Pre-Push hooks (linters, format, tests).
`src/components` Stencil src folder. Implementation, tests, and stories for each component.
`src/stories` General stories/guides, not based on an individual Zen UI component.
