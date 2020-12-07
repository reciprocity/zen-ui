import { newSpecPage } from '@stencil/core/testing';
import { ZenCheckbox } from '../zen-checkbox';

describe('zen-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenCheckbox],
      html: `<zen-checkbox></zen-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-checkbox>
        <mock:shadow-root>
          <input class="input-control" type="checkbox">
        </mock:shadow-root>
      </zen-checkbox>
    `);
  });

  it('renders checked checkbox', async () => {
    const page = await newSpecPage({
      components: [ZenCheckbox],
      html: `<zen-checkbox checked></zen-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-checkbox checked="">
        <mock:shadow-root>
          <input checked="" class="input-control" type="checkbox">
        </mock:shadow-root>
      </zen-checkbox>
    `);
  });

  it('renders disabled checkbox', async () => {
    const page = await newSpecPage({
      components: [ZenCheckbox],
      html: `<zen-checkbox disabled></zen-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-checkbox disabled="">
        <mock:shadow-root>
          <input class="input-control" type="checkbox" disabled="">
        </mock:shadow-root>
      </zen-checkbox>
    `);
  });

  it('renders disabled and checked checkbox', async () => {
    const page = await newSpecPage({
      components: [ZenCheckbox],
      html: `<zen-checkbox checked disabled></zen-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-checkbox checked="" disabled="">
        <mock:shadow-root>
          <input checked="" class="input-control" type="checkbox" disabled="">
        </mock:shadow-root>
      </zen-checkbox>
    `);
  });
});
