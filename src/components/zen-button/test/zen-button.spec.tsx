import { newSpecPage } from '@stencil/core/testing';
import { ZenButton } from '../zen-button';

describe('zen-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button></zen-button>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-button class="btn btn-primary" tabindex="0">
        <mock:shadow-root>
          <slot name="leadingIcon"></slot>
          <span><slot>Button</slot></span>
          <slot name="trailingIcon"></slot>
        </mock:shadow-root>
      </zen-button>
    `);
  });

  it('renders secondary button', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button variant="secondary"></zen-button>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-button variant="secondary" class="btn btn-secondary" tabindex="0">
        <mock:shadow-root>
          <slot name="leadingIcon"></slot>
          <span><slot>Button</slot></span>
          <slot name="trailingIcon"></slot>
        </mock:shadow-root>
      </zen-button>
    `);
  });

  it('renders tertiary button', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button variant="tertiary"></zen-button>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-button variant="tertiary" class="btn btn-tertiary" tabindex="0">
        <mock:shadow-root>
          <slot name="leadingIcon"></slot>
          <span><slot>Button</slot></span>
          <slot name="trailingIcon"></slot>
        </mock:shadow-root>
      </zen-button>
    `);
  });

  it('renders destructive button', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button variant="destructive"></zen-button>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-button variant="destructive" class="btn btn-destructive" tabindex="0">
        <mock:shadow-root>
          <slot name="leadingIcon"></slot>
          <span><slot>Button</slot></span>
          <slot name="trailingIcon"></slot>
        </mock:shadow-root>
      </zen-button>
    `);
  });

  it('renders positive button', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button variant="positive"></zen-button>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-button variant="positive" class="btn btn-positive" tabindex="0">
        <mock:shadow-root>
          <slot name="leadingIcon"></slot>
          <span><slot>Button</slot></span>
          <slot name="trailingIcon"></slot>
        </mock:shadow-root>
      </zen-button>
    `);
  });

  it('renders with leadingIcon slot fulfilled', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button><zen-spinner slot="leadingIcon"></zen-spinner></zen-button>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-button class="btn btn-primary" tabindex="0">
        <mock:shadow-root>
          <slot name="leadingIcon"></slot>
          <span class="ml"><slot>Button</slot></span>
          <slot name="trailingIcon"></slot>
        </mock:shadow-root>
        <zen-spinner slot="leadingIcon"></zen-spinner>
      </zen-button>
    `);
  });

  it('renders with trailingIcon slot fulfilled', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button><zen-spinner slot="trailingIcon"></zen-spinner></zen-button>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-button class="btn btn-primary" tabindex="0">
        <mock:shadow-root>
          <slot name="leadingIcon"></slot>
          <span class="mr"><slot>Button</slot></span>
          <slot name="trailingIcon"></slot>
        </mock:shadow-root>
        <zen-spinner slot="trailingIcon"></zen-spinner>
      </zen-button>
    `);
  });

  it('renders with leadingIcon and trailingIcon slot fulfilled', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button><zen-spinner slot="leadingIcon"></zen-spinner><zen-spinner slot="trailingIcon"></zen-spinner></zen-button>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-button class="btn btn-primary" tabindex="0">
        <mock:shadow-root>
            <slot name="leadingIcon"></slot>
            <span class="ml mr"><slot>Button</slot></span>
            <slot name="trailingIcon"></slot>
        </mock:shadow-root>
        <zen-spinner slot="leadingIcon"></zen-spinner>
        <zen-spinner slot="trailingIcon"></zen-spinner>
      </zen-button>
    `);
  });

  it('renders with loading state', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button disabled></zen-button>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-button class="btn btn-primary disabled" disabled="" tabindex="-1">
        <mock:shadow-root>
            <slot name="leadingIcon"></slot>
            <span><slot>Button</slot></span>
            <slot name="trailingIcon"></slot>
        </mock:shadow-root>
      </zen-button>
    `);
  });

  it('renders with disabled state', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button loading></zen-button>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-button class="btn btn-primary" loading="" tabindex="0">
        <mock:shadow-root>
            <slot name="leadingIcon"></slot>
            <zen-spinner></zen-spinner>
            <span><slot>Button</slot></span>
            <slot name="trailingIcon"></slot>
        </mock:shadow-root>
      </zen-button>
    `);
  });
});
