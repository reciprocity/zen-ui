.


<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description                                              | Type                                        | Default      |
| --------------- | ----------------- | -------------------------------------------------------- | ------------------------------------------- | ------------ |
| `borderless`    | `borderless`      | Don't draw border around field                           | `boolean`                                   | `false`      |
| `closeOnSelect` | `close-on-select` | Close dropdown menu after selecting an item              | `boolean`                                   | `true`       |
| `fieldAlign`    | `field-align`     | Alignment of field content and menu (if menuWidth set).  | `Align.CENTER \| Align.LEFT \| Align.RIGHT` | `Align.LEFT` |
| `menuHeight`    | `menu-height`     | To determine if there's enough space under field on open | `number`                                    | `170`        |
| `menuWidth`     | `menu-width`      | Width of menu. Set '100%' to match field width.          | `string`                                    | `'100%'`     |
| `value`         | `value`           | Selected option                                          | `number \| string`                          | `undefined`  |


## Events

| Event       | Description                     | Type                            |
| ----------- | ------------------------------- | ------------------------------- |
| `zenChange` | Emitted on any selection change | `CustomEvent<number \| string>` |


## Methods

### `toggle(open?: boolean) => Promise<void>`

Close an opened dropdown menu

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [zen-animate](../zen-animate)

### Graph
```mermaid
graph TD;
  zen-dropdown --> zen-animate
  style zen-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


