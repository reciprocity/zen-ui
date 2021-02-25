# Contributing

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/).

## Components Guidelines

Check the [Components Guidelines doc](./components-guidelines.md).

## Update npm package

Grant privileges for Zen-UI package and login to your npm account in terminal. Then run the following commands:
1. Make sure your git status is clean!
1. `yarn npm:build`
1. `npm version [version]` where version is `major | minor | patch`
1. `npm publish`

## Testing zen-ui in the ZenComply app locally
1. Go to (ZenComply repo)[https://github.com/reciprocity/zencomply], clone repo and follow repo/readme.md to run the app locally. After it has been run successfully, stop it.
1. From new tab in terminal go to repo `zen-ui` folder and run `yarn link`
1. Go back to `ZenComply` terminal tab and run `yarn link '@reciprocity/zen-ui'`. This will substitute folder `zencomply/node_modules/@reciprocity/zen-ui` with symlink to your local folder `zen-ui\dist`.
1. Now run both `ZenComply` in one terminal tab and `zen-ui` in another. Keep them both running.
1. Any change you made in `zen-ui` will automatically be visible in `ZenComply`.
* Note! HMR doesn't work. So you need to refresh `ZenComply` manually after `zen-ui` rebuilds because of your change.
