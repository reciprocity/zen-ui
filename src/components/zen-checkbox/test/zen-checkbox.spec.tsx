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

  it('renders checkbox with label', async () => {
    const page = await newSpecPage({
      components: [ZenCheckbox],
      html: `<zen-checkbox label="This is an example label"></zen-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-checkbox label="This is an example label">
        <mock:shadow-root>
          <input class="input-control" type="checkbox">
          <label>
            This is an example label
          </label>
        </mock:shadow-root>
      </zen-checkbox>
    `);
  });

  it('renders checkbox with label and it is disabled', async () => {
    const page = await newSpecPage({
      components: [ZenCheckbox],
      html: `<zen-checkbox label="This is an example label" disabled=""></zen-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-checkbox label="This is an example label" disabled="">
        <mock:shadow-root>
          <input class="input-control" type="checkbox" disabled="">
          <label class="disabled">
            This is an example label
          </label>
        </mock:shadow-root>
      </zen-checkbox>
    `);
  });

  it('renders checkbox with label and it is required', async () => {
    const page = await newSpecPage({
      components: [ZenCheckbox],
      html: `<zen-checkbox label="This is an example label" required=""></zen-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-checkbox label="This is an example label" required="">
        <mock:shadow-root>
          <input class="input-control" type="checkbox" required="">
          <label>
            This is an example label
            <span class="required">
              *
            </span>
          </label>
        </mock:shadow-root>
      </zen-checkbox>
    `);
  });
});
