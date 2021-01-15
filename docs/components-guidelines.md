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

can be changed into zen component by just prepending tag names with `zen-`:

```html
<zen-select name="cars" id="cars" @change="myFunction()">
  <zen-option value="volvo">Volvo</zen-option>
  <zen-option value="saab">Saab</zen-option>
  <zen-option value="mercedes">Mercedes</zen-option>
  <zen-option value="audi">Audi</zen-option>
</zen-select>
```

### Emit native events
Emit native events (`click`, `change`, `input`,...) instead of making them up to ensure consistent UX for library consumers.
Note that the majority of these events will bubble up and you don't need to emit them manually. Emiting them manually might even be a bad idea because event.target will be different (host element instead of the actual element).
Note also that if `event.composed` is false, it will not bubble out of shadow dom! Therefore events with `event.composed` false need to be emitted manually. An example of such an event would be input's event `change`.

### Writing stories
Template for a new component's story page can be found here:
`/src/components/zen-spinner/template.stories.mdx.sample`
