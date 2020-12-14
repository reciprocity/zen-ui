import { newSpecPage } from '@stencil/core/testing';
import { ZenButton } from '../zen-button';

describe('zen-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button></zen-button>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-button>
        <mock:shadow-root>
          <button class="btn btn-primary" type="button">
            <slot name="leadingIcon"></slot>
            <slot name="trailingIcon"></slot>
          </button>
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
      <zen-button variant="secondary">
        <mock:shadow-root>
          <button class="btn btn-secondary" type="button">
            <slot name="leadingIcon"></slot>
            <slot name="trailingIcon"></slot>
          </button>
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
      <zen-button variant="tertiary">
        <mock:shadow-root>
          <button class="btn btn-tertiary" type="button">
            <slot name="leadingIcon"></slot>
            <slot name="trailingIcon"></slot>
          </button>
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
      <zen-button variant="destructive">
        <mock:shadow-root>
          <button class="btn btn-destructive" type="button">
            <slot name="leadingIcon"></slot>
            <slot name="trailingIcon"></slot>
          </button>
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
      <zen-button variant="positive">
        <mock:shadow-root>
          <button class="btn btn-positive" type="button">
            <slot name="leadingIcon"></slot>
            <slot name="trailingIcon"></slot>
          </button>
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
      <zen-button>
        <mock:shadow-root>
          <button class="btn btn-primary" type="button">
            <slot name="leadingIcon"></slot>
            <slot name="trailingIcon"></slot>
          </button>
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
      <zen-button>
        <mock:shadow-root>
          <button class="btn btn-primary" type="button">
            <slot name="leadingIcon"></slot>
            <slot name="trailingIcon"></slot>
          </button>
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
      <zen-button>
        <mock:shadow-root>
          <button class="btn btn-primary" type="button">
            <slot name="leadingIcon"></slot>
            <slot name="trailingIcon"></slot>
          </button>
        </mock:shadow-root>
        <zen-spinner slot="leadingIcon"></zen-spinner>
        <zen-spinner slot="trailingIcon"></zen-spinner>
      </zen-button>
    `);
  });
});
