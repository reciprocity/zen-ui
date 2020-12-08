# zen-steps



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                       | Type                                                           | Default                 |
| ------------- | -------------- | --------------------------------- | -------------------------------------------------------------- | ----------------------- |
| `activeIndex` | `active-index` | Index of currently active step    | `0`                                                            | `0`                     |
| `clickable`   | `clickable`    | User can click step to go to step | `StepsFilter.All \| StepsFilter.Completed \| StepsFilter.None` | `StepsFilter.Completed` |
| `steps`       | --             | Ordered array of possible steps   | `StepItem[]`                                                   | `[]`                    |


## Events

| Event      | Description         | Type                     |
| ---------- | ------------------- | ------------------------ |
| `selected` | User clicked a step | `CustomEvent<StepEvent>` |


----------------------------------------------


