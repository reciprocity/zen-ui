import { newSpecPage } from '@stencil/core/testing';
import { ZenTableHeader } from '../zen-table-header';

describe('zen-table-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenTableHeader],
      html: `<zen-table-header>Content</zen-header-header>`,
    });

    expect(page.root).toEqualHtml(`
      <zen-table-header>
        <mock:shadow-root>
          <slot>
          </slot>
        </mock:shadow-root>
        Content
      </zen-table-header>
    `);
  });

  it('applies `sticky` attribute to child elements if `sticky` prop is set', async () => {
    const page = await newSpecPage({
      components: [ZenTableHeader],
      html: `
        <zen-table-header sticky>
          <div></div>
          <div></div>
          <div></div>
        </zen-header-header>
      `,
    });

    expect(page.root).toEqualHtml(`
      <zen-table-header sticky="">
        <mock:shadow-root>
          <slot>
          </slot>
        </mock:shadow-root>
        <div sticky></div>
        <div sticky></div>
        <div sticky></div>
      </zen-table-header>
    `);
  });
});
