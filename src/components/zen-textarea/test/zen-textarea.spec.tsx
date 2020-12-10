import { newSpecPage } from '@stencil/core/testing';
import { ZenTextarea } from '../zen-textarea';

describe('zen-textarea', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenTextarea],
      html: `<zen-textarea></zen-textarea>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-textarea>
        <mock:shadow-root><textarea class="input-control"></textarea>
      </zen-textarea>
    `);
  });

  it('renders with custom cols and rows', async () => {
    const page = await newSpecPage({
      components: [ZenTextarea],
      html: `<zen-textarea cols="50" rows="15"></zen-textarea>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-textarea cols="50" rows="15">
        <mock:shadow-root><textarea class="input-control"></textarea>
      </zen-textarea>
    `);
  });

  it('renders with some custom value', async () => {
    const page = await newSpecPage({
      components: [ZenTextarea],
      html: `<zen-textarea value="Something to test"></zen-textarea>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-textarea value="Something to test">
        <mock:shadow-root><textarea class="input-control"></textarea>
      </zen-textarea>
    `);
  });

  it('renders default with disabled property', async () => {
    const page = await newSpecPage({
      components: [ZenTextarea],
      html: `<zen-textarea disabled></zen-textarea>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-textarea disabled="">
        <mock:shadow-root><textarea class="input-control" disabled=""></textarea>
      </zen-textarea>
    `);
  });

  it('renders default with required property', async () => {
    const page = await newSpecPage({
      components: [ZenTextarea],
      html: `<zen-textarea required></zen-textarea>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-textarea required="">
        <mock:shadow-root><textarea class="input-control" required=""></textarea>
      </zen-textarea>
    `);
  });

  it('renders default with all custom properties', async () => {
    const page = await newSpecPage({
      components: [ZenTextarea],
      html: `<zen-textarea disabled required value="Some custom value" rows="22" cols="44"></zen-textarea>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-textarea disabled="" required="" value="Some custom value" rows="22" cols="44">
        <mock:shadow-root><textarea class="input-control" disabled="" required=""></textarea>
      </zen-textarea>
    `);
  });
});
