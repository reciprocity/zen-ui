import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { simulateKey } from '../../helpers/jest';
import { htmlToElement } from '../../helpers/helpers';

let options: NodeListOf<HTMLZenOptionElement> | undefined[] = [];

const popperMock = () => ({
  destroy: jest.fn(),
  state: {
    placement: 'bottom',
    visible: false,
  },
});
import * as popper from '@popperjs/core';
popper.createPopper = jest.fn(() => popperMock());

import * as helpers from '../../helpers/helpers';
helpers.getDefaultSlotContent = jest.fn(() => options);
helpers.getComposedPath = jest.fn(() => []);
helpers.scrollIntoView = jest.fn(() => true);
helpers.waitNextFrame = jest.fn(() => new Promise(resolve => resolve(true)));

import { ZenDropdown } from '../zen-dropdown';
import { ZenPopover } from '../../zen-popover/zen-popover';

describe('zen-dropdown', () => {
  let page: SpecPage;
  let dropdown: Element;
  let list: HTMLZenPopoverElement;

  beforeEach(async () => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  const render = async (attributes: string) => {
    page = await newSpecPage({
      components: [ZenDropdown, ZenPopover],
      html: `<zen-dropdown ${attributes}>
        <zen-option value="admin">Administrator</zen-option>
        <zen-option value="reader">Reader</zen-option>
        <zen-option value="contributor">Contributor</zen-option>
      </ zen-dropdown>`,
    });
    dropdown = page.root;
    list = dropdown.shadowRoot.querySelector('.list');
    options = htmlToElement(`<zen-option value="admin">Administrator</zen-option>
        <zen-option value="reader">Reader</zen-option>
        <zen-option value="contributor">Contributor</zen-option>`);

    await page.waitForChanges();
    const focusin = new Event('focus', { bubbles: true, composed: true });
    dropdown.dispatchEvent(focusin);
  };

  it('should open on focus', async () => {
    await render();
    expect(list.visible).toBeTruthy();
  });

  it('should move focus to next item on arrow-down click', async () => {
    await render();
    simulateKey('ArrowDown', dropdown);

    expect(options[0].getAttribute('focused')).toEqual('true');
    expect(options[1].getAttribute('focused')).toEqual(null);
    simulateKey('ArrowDown', dropdown);

    expect(options[0].getAttribute('focused')).toEqual(null);
    expect(options[1].getAttribute('focused')).toEqual('true');
    simulateKey('ArrowUp', dropdown);

    expect(options[0].getAttribute('focused')).toEqual('true');
    expect(options[1].getAttribute('focused')).toEqual(null);
  });

  it('should select element with Enter key', async () => {
    await render();
    simulateKey('ArrowDown', dropdown);
    simulateKey('ArrowDown', dropdown);
    simulateKey('Enter', dropdown);
    expect(dropdown.value).toEqual('reader');
  });

  it('closes on Enter key', async () => {
    await render();
    simulateKey('Escape', dropdown);
    await page.waitForChanges();
    expect(list.visible).toBeFalsy();
    simulateKey(' ', dropdown);
    expect(list.visible).toBeTruthy();
  });

  it('should render correct icon size', async () => {
    await render();
    const icon = dropdown.shadowRoot.querySelector('.arrow');
    expect(icon.getAttribute('size')).toEqual('md');

    dropdown.size = 'sm';
    await page.waitForChanges();
    expect(icon.getAttribute('size')).toEqual('sm');

    dropdown.size = 'lg';
    await page.waitForChanges();
    expect(icon.getAttribute('size')).toEqual('md');
  });
});
