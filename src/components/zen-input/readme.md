.

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description               | Type               | Default |
| ------------- | ------------- | ------------------------- | ------------------ | ------- |
| `disabled`    | `disabled`    | Disables input.           | `boolean`          | `false` |
| `hasFocus`    | `has-focus`   | Paint focused border      | `boolean`          | `false` |
| `invalid`     | `invalid`     | Shows invalid styles.     | `boolean`          | `false` |
| `placeholder` | `placeholder` | Placeholder of the input. | `string`           | `null`  |
| `value`       | `value`       | The value of the input.   | `number \| string` | `''`    |


## Events

| Event      | Description                             | Type                         |
| ---------- | --------------------------------------- | ---------------------------- |
| `zenBlur`  | Emitted when the input loses focus.     | `CustomEvent<FocusEvent>`    |
| `zenFocus` | Emitted when the input has focus.       | `CustomEvent<FocusEvent>`    |
| `zenInput` | Emitted when a keyboard input occurred. | `CustomEvent<KeyboardEvent>` |


## Slots

| Slot             | Description              |
| ---------------- | ------------------------ |
| `"leadingSlot"`  | Slot placed at the left  |
| `"trailingSlot"` | Slot placed at the right |


----------------------------------------------


