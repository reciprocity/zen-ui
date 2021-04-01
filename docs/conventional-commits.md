# Conventional Commits

_"A specification for adding human and machine readable meaning to commit messages"_

This means that our commits message have information relevant for both the developers and the integration tool(s); for example:

```
feat(zen-dropdown): add top margin
```

This tells us the following things:

- A new functionality was added (`feat`).
- The next version, following [SemVer](http://semver.org/), should be bumped to a new minor.
- The functionality is related to the component `zen-dropdown`.
- A top margin was added

Before continuing, please read [the official documentation](https://www.conventionalcommits.org/en/v1.0.0/).

Since `semantic-release` doesn't support the exclamation symbol for breaking changes, we use the following format:

```
<type>[optional scope]: <description>

[optional breaking-changes]
```

#### Type

| Name | Description | Changelog | Release |
| ---- | ----------- | --------- | ------- |
| feat | A new feature | **Yes** | **Yes** |
| fix | A bug fix | **Yes** | **Yes** |
| perf | A code change that improves performance | **Yes** | **Yes** |
| revert | Reverts a previous commit | **Yes** | **Yes** |
| docs | Documentation only changes | No | No |
| style | Changes that do not affect the meaning of the code (like linting changes) | No | No |
| refactor | A code change that neither fixes a bug nor adds a feature | No | No |
| test | Adding missing tests or correcting existing tests | No | No |
| build | Changes that affect the build system or external dependencies | No | No |
| ci | Changes to our CI configuration files and scripts | No | No |
| chore | Other changes that don't modify src or test files | No | No |

> - Whether or not the commit goes to the Changelog is decided by [the package that generates it](https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-angular/writer-opts.js#L44-L46).
> - Whether or not the commit generates a release is decided by [`semantic-release` plugin that analizes the commits](https://github.com/semantic-release/commit-analyzer/blob/master/lib/default-release-rules.js).

#### Scope

The scope is something really useful in terms that it gives context to the commit, but unless you already have a list of possible scopes, or a strict convention, it can end up being a mess; for example, you can see `project`, `app` and `*` being used as scope to represent a global change.

Since this is a library of components, **we use their names as the scopes**.

#### Description

_"The description is a short summary of the code changes, e.g., fix: array parsing issue when multiple spaces were contained in string."_

The only thing to add here, besides the information provided on the specification, is that, as good practice, the messages should be written using the [imperative](https://en.wikipedia.org/wiki/Imperative_mood) present tense writing form.

> This was originally on the CC documentation but they had an issue with the versioning on the site and the branch that got merged didn't have it; it will be back on the FAQ section soon.

#### Breaking change

Unfortunately, there are some issues with the tooling and the support the exclamation symbol as an indicator of a breaking change, so we need to manually add the commit body.

Instead of just using `git commit -m '...'`, if the commit has a breaking change, we just run `git commit` and when the editor opens, we write the header and, on a new line, we add `BREAKING CHANGE: [reason]`. For example:

```
feat(zen-input): add something

BREAKING CHANGE: something else was removed.
```
