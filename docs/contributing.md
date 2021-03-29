# Contributing

## Commit Guidelines

We format our commits' messages following [Conventional Commits](https://www.conventionalcommits.org) and we validate them with [`commitlint`](https://commitlint.js.org/) using a [Husky](https://github.com/typicode/husky) hook.

## Components Guidelines

Check the [Components Guidelines doc](./components-guidelines.md).

## Publishing updates

All releases are managed automatically by [`semantic-release`](https://semantic-release.gitbook.io/semantic-release): everytime something gets merged on the `main` branch, a new [SemVer](https://semver.org) version will be calculated from the commits and an update will be published on both NPM and the GitHub registry.

## Testing zen-ui in the ZenComply app locally

1. Go to (ZenComply repo)[https://github.com/reciprocity/zencomply], clone repo and follow repo/readme.md to run the app locally. After it has been run successfully, stop it.
2. From new tab in terminal go to repo `zen-ui` folder and run `yarn link`
3. Go back to `ZenComply` terminal tab and run `yarn link '@reciprocity/zen-ui'`. This will substitute folder `zencomply/node_modules/@reciprocity/zen-ui` with symlink to your local folder `zen-ui\dist`.
4. Now run both `ZenComply` in one terminal tab and `zen-ui` in another. Keep them both running.
5. Any change you made in `zen-ui` will automatically be visible in `ZenComply`.

> Note: Since `zen-ui` is a dependency of `ZenComply`, HMR and automatic refresh won't work for the components, you need to manually refresh the application after the your changes are rebuilt.
