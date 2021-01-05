## Components Guidelines

#### Components should behave as default html components
When building components keep in mind, that it should behave the same way as default html components.
It means if you have a working default html component, you should only change tag name into zen component and eveything will still work as expected. Eg:

```html
<select name="cars" id="cars" @change="myFunction()">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
```

can be changed into zen component by just prepending tag names with `zen-` and
also prepending native events with `zen`:

```html
<zen-select name="cars" id="cars" @zenChange="myFunction()">
  <zen-option value="volvo">Volvo</zen-option>
  <zen-option value="saab">Saab</zen-option>
  <zen-option value="mercedes">Mercedes</zen-option>
  <zen-option value="audi">Audi</zen-option>
</zen-select>
```

### Emit default events
Emit default events (`click`, `change`, `input`,...) instead making them up
