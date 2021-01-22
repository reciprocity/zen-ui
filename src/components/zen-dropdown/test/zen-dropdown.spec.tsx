import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { simulateMouse, htmlToElement, simulateKey } from '../../helpers/jest';

let options: NodeListOf<HTMLZenOptionElement> | undefined[] = [];

jest.useFakeTimers();

jest.unmock('../../helpers/helpers');
import * as helpers from '../../helpers/helpers';
helpers.getDefaultSlotContent = jest.fn(() => options);
helpers.getComposedPath = jest.fn(() => []);
helpers.waitNextFrame = jest.fn(() => new Promise(resolve => resolve(true)));

import { ZenDropdown } from '../zen-dropdown';

describe('Opened zen-dropdown', () => {
  let page: SpecPage;
  let dropdown: Element;
  let field: Element;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [ZenDropdown],
      html: `<zen-dropdown>
        <zen-option value="admin">Administrator</zen-option>
        <zen-option value="reader">Reader</zen-option>
        <zen-option value="contributor">Contributor</zen-option>
      </ zen-dropdown>`,
    });
    dropdown = page.root;
    options = htmlToElement(`<zen-option value="admin">Administrator</zen-option>
        <zen-option value="reader">Reader</zen-option>
        <zen-option value="contributor">Contributor</zen-option>`);

    field = dropdown.shadowRoot.querySelector('.field');
    simulateMouse('mousedown', field);
    await page.waitForChanges();
    jest.advanceTimersByTime(100);
  });

  it('opens on click', async () => {
    expect(dropdown.shadowRoot.querySelector('.field')).toHaveClass('opened');
  });

  it('closes on click outside dropdown', async () => {
    simulateMouse('mousedown', global.document);
    await page.waitForChanges();
    await page.waitForChanges();
    expect(dropdown.shadowRoot.querySelector('.field')).not.toHaveClass('opened');
  });

  it('moves focus to next item on arrow-down click', async () => {
    simulateKey('ArrowDown', dropdown);
    await page.waitForChanges();
    expect(options[0].getAttribute('focused')).toEqual('true');
    expect(options[1].getAttribute('focused')).toEqual(null);
    simulateKey('ArrowDown', dropdown);
    await page.waitForChanges();
    expect(options[0].getAttribute('focused')).toEqual(null);
    expect(options[1].getAttribute('focused')).toEqual('true');
  });

  it('selects element with Enter key', async () => {
    simulateKey('ArrowDown', dropdown);
    await page.waitForChanges();
    simulateKey('ArrowDown', dropdown);
    await page.waitForChanges();
    simulateKey('Enter', dropdown);
    await page.waitForChanges();
    expect(dropdown.value).toEqual('reader');
  });
});
