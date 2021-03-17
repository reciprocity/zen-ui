## Components Guidelines

#### Components should behave as default html components
When building components keep in mind, that it should behave the same way as default html components.
It means if you have a working default html component, you should only change tag name into zen component and everything will still work as expected. Eg:

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

## Emitting events
- **Emit native events** (`click`, `change`, `input`,...) instead of making them up to ensure consistent UX for library consumers.
- **To emit native events** do not use directive `@Event()`. Use `this.host.dispatchEvent(new window.Event('change'));` instead.
- **To document native event** in events table add json doc comment in the `tsx` file right above `@Component` directive: `/** @event change | Called on any selection change */`. Native event need to be documented manually as Stencil can't pick it up automatically.

- Note that majority of these events will bubble up and **you don't need to emit** them manually. Emitting them manually might even be a bad idea because `event.target` will be different (host element instead of the actual element).
- Note also that if `event.composed` is false, it will not bubble out of shadow dom! Therefore events with `event.composed` false need to be emitted manually. An example of such an event would be input's event `change`.

### Property names conventions
For size variations always use conventional shorthands:
`xs`, `sm`, `md`, `lg`, `xl`, `2xl`,...

### Padding properties
Padding prop of each component should always default to `none`! Consumers should be aware of introducing additional paddings.

## Writing stories
Template for a new component's story page can be found here:
`/src/components/zen-spinner/template.stories.mdx.sample`

1. When exposing different possible values for a prop, be sure to add `<zen-text variant="label">` beneath each example, so user can quickly see what value is used.

## Documentation
- All **available slots** that component supports should be listed above `@Component` directive like this:
```javascript
/**
 * @slot leadingSlot - Slot placed at the left
 * @slot trailingSlot - Slot placed at the right
 */
```

## Writing Tests

### Visual regression test (VRT)
When you create a new component:
- create new file (copy one of the existing) in folder `cypress/integration/visual/component.e2e.js`
- set correct `pageId` and `stories`
- then run command `yarn test:e2e:update --spec 'cypress/integration/visual/component.e2e.js'` to create screenshots for each story
- commit everything

# Pull request Checklist
- Each native event `dispatch` has doc comment `@event`
- Story with controls includes `logEvents()`
