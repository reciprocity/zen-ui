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
