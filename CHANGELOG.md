## [0.1.7](https://github.com/reciprocity/zen-ui/compare/0.1.6...0.1.7) (2021-03-25)

### Bug Fixes

* Add possibility to override avatar group colors [#261](https://github.com/reciprocity/zen-ui/pull/261)
* Date picker is not closed properly if user type the date [#258](https://github.com/reciprocity/zen-ui/pull/258)
* Date picker width now can be changed [#252](https://github.com/reciprocity/zen-ui/pull/252)
* Dropdown receives focus but doesn't open [#251](https://github.com/reciprocity/zen-ui/pull/251)
* REQUEST: Datepicker default value [#250](https://github.com/reciprocity/zen-ui/pull/250)
* Reflect the change of the progress tracker active index [#245](https://github.com/reciprocity/zen-ui/pull/245)
* Remove negative margins from zen-space [#239](https://github.com/reciprocity/zen-ui/pull/239)


### Features

* Panel - Add animations [#260](https://github.com/reciprocity/zen-ui/pull/260)
* Skeleton component [#249](https://github.com/reciprocity/zen-ui/pull/249)
* Implement notifications/alerts [#241](https://github.com/reciprocity/zen-ui/pull/241)

### BREAKING CHANGES

* `zen-panel`: Padding is changed! Both header and content have default padding set.
* `zen-panel`: Zen-text is no longer wrapping header. Common header should be `<zen-text slot="header">Item title</zen-text>`

## 0.1.6 (2021-03-12)

### PRs merged in this release

* `PLAT-1470` Zen-space padding should default to 'none'
* `QUICK-FIX` Fix textarea height on resizing
* `PLAT-1430` Add zen text improvements
* `QUICK-FIX` Move Panel under Layout group
* `PLAT-1462` Checkbox with intermediate state
* `PLAT-1426` Add resize, row, cols properties
* `Revert PLAT-1250` Zen space elements after first one in slot have margin left set."
* `PLAT-1338` Add avatar details component
* `PLAT-1174` Remove form-group component
* `QUICK-FIX` ZenPanel: Correctly use dynamic prefix
* `PLAT-1357` Default value for date format is not applied to the date picker
* `PLAT-1358` Date picker is missing a X icon to remove the date from field
* `QUICK-FIX` Pin dependencies
* `PLAT-1389` Dropdown - Scroll on keyboard selection

### BREAKING CHANGES

* Removed component `zen-form-group`. Use component `zen-space` instead.

## 0.1.4 (2021-03-08)

### BREAKING CHANGES

* Tooltip: props `showDelay` and `hideDelay` have been joined into prop `delay`. (Note that delay still supports shorthand for show and hide prop.)

## 0.1.3 (2021-02-19)

### BREAKING CHANGES

* All zen components need to be prefixed.

## 0.1.2 (2021-02-17)

### BREAKING CHANGES

* `zen-space`: `width: 100%` isn't default anymore. Add attr `stretch` to make it `width: 100%`. In most cases this should have no impact.

## 0.1.1 (2021-02-16)

Bugfixes and new components.

## 0.1.0 (2021-02-01)

### BREAKING CHANGES

* Events prefixed by `zen-` were changed into native events.<br/>Eg. `zen-change` is now `change`.<br/>This affects the following components:
  - `zen-checkbox`
  - `zen-dropdown`
  - `zen-input`
  - `zen-textarea`
  - `zen-progress-tracker`
* Removed components: `zen-label` and `zen-support-text`. Use component `zen-text` with variant `label` or `support`
* `zen-spinner`: Prop `color` removed. To set custom color: `<zen-spinner style="color: #f00">`
* `zen-button`: Prop `label` removed. To set button label: `<zen-button>Click here</zen-button>`
* `zen-checkbox`: Prop `label` removed. To set checkbox label: `<zen-checkbox>Checkbox label</zen-checkbox>`
* Component `zen-steps` was renamed to `zen-progress-tracker`.

## 0.0.19 (2020-12-24)

### Bug Fixes

* Tooltip: Hide scroller if there's enough height

### Features

* Tooltip: New props `hasArrow`

## 0.0.18 (2020-12-23)

### Features

* Tooltip: new props `hideDelay`, `showDelay`
* Tooltip: new prop `maxHeight` which allows you to create scrollable tooltips
* Tooltip: tooltip will switch position if there's no room to show it

## 0.0.17 (2020-12-22)

#### Bug Fixes

* Dropdown: prevent closing dropdown on scrolling using the scrollbar
* Dropdown: The height of the field should follow the height of `<zen-dropdown>` tag

#### Features

* Dropdown: Added slot `placeholder`
* Dropdown: Added prop `disabled`
* Dropdown: Selected item is copied into the field, so the item in the field is styled correctly (has the same content as an original item - icons, padding & stuff)
* Zen-option: Added prop `disabled`

#### BREAKING CHANGES

* Dropdown: slot `options` is now the default slot
* Zen-option: slot `label` is now the default slot
