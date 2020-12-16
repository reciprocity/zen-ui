



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                         | Type      | Default  |
| ---------------- | ----------------- | ----------------------------------- | --------- | -------- |
| `defaultPadding` | `default-padding` | False to enable custom item padding | `boolean` | `true`   |
| `focused`        | `focused`         | Render item as focused              | `boolean` | `false`  |
| `label`          | `label`           | Text inside the item                | `string`  | `'Item'` |
| `selected`       | `selected`        | Render item as selected             | `boolean` | `false`  |


## Slots

| Slot        | Description                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| `"content"` | Replace content of item. Padding stays. To remove it set `defaultPadding="false"` |


## Dependencies

### Used by

 - [zen-dropdown](../zen-dropdown)

### Graph
```mermaid
graph TD;
  zen-dropdown --> zen-option
  style zen-option fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


