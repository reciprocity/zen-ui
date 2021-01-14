import { newSpecPage } from '@stencil/core/testing';
import { ZenInput } from '../zen-input';

describe('zen-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input></zen-input>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-input>
        <mock:shadow-root>
        <slot name="leadingSlot"></slot>
          <input placeholder="" type="text" value="">
        <slot name="trailingSlot"></slot>
        </mock:shadow-root>
      </zen-input>
    `);
  });

  it('renders with placeholder', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input placeholder="Test placeholder"></zen-input>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-input placeholder="Test placeholder">
        <mock:shadow-root>
        <slot name="leadingSlot"></slot>
          <input placeholder="Test placeholder" type="text" value="">
        <slot name="trailingSlot"></slot>
        </mock:shadow-root>
      </zen-input>
    `);
  });

  it('renders with value', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input value="Test value"></zen-input>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-input value="Test value">
        <mock:shadow-root>
        <slot name="leadingSlot"></slot>
          <input placeholder="" type="text" value="Test value">
        <slot name="trailingSlot"></slot>
        </mock:shadow-root>
      </zen-input>
    `);
  });

  it('renders as invalid', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input invalid></zen-input>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-input class="invalid" invalid="">
        <mock:shadow-root>
        <slot name="leadingSlot"></slot>
          <input placeholder="" type="text" value="">
        <slot name="trailingSlot"></slot>
        </mock:shadow-root>
      </zen-input>
    `);
  });

  it('renders as disabled', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input disabled></zen-input>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-input class="disabled" disabled="">
        <mock:shadow-root>
        <slot name="leadingSlot"></slot>
          <input disabled="" placeholder="" type="text" value="">
        <slot name="trailingSlot"></slot>
        </mock:shadow-root>
      </zen-input>
    `);
  });

  it('renders fulfilling leadingSlot', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input><component-example slot="leadingSlot" /></zen-input>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-input>
        <mock:shadow-root>
        <slot name="leadingSlot"></slot>
          <input placeholder="" type="text" value="">
        <slot name="trailingSlot"></slot>
        </mock:shadow-root>
        <component-example slot="leadingSlot" />
      </zen-input>
    `);
  });

  it('renders fulfilling trailingSlot', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input><component-example slot="trailingSlot" /></zen-input>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-input>
        <mock:shadow-root>
        <slot name="leadingSlot"></slot>
          <input placeholder="" type="text" value="">
        <slot name="trailingSlot"></slot>
        </mock:shadow-root>
        <component-example slot="trailingSlot" />
      </zen-input>
    `);
  });

  it('renders fulfilling leadingSlot and trailingSlot', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input><component-example slot="leadingSlot" /><component-example slot="trailingSlot" /></zen-input>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-input>
        <mock:shadow-root>
        <slot name="leadingSlot"></slot>
          <input placeholder="" type="text" value="">
        <slot name="trailingSlot"></slot>
        </mock:shadow-root>
        <component-example slot="leadingSlot" />
        <component-example slot="trailingSlot" />
      </zen-input>
    `);
  });
});
