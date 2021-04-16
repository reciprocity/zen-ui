import { newSpecPage, SpecPage } from '@stencil/core/testing';
import * as popper from '@popperjs/core';
import { simulateKey } from '../../helpers/jest';
import * as helpers from '../../helpers/helpers';

import { ZenDropdown } from '../zen-dropdown';
import { ZenPopover } from '../../zen-popover/zen-popover';

describe('zen-dropdown', () => {
  let page: SpecPage;
  let dropdown: HTMLZenDropdownElement;
  let list: HTMLZenPopoverElement;
  let options: NodeListOf<HTMLZenOptionElement>;

  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
    jest
      .spyOn(popper, 'createPopper')
      .mockClear()
      .mockImplementation(
        () =>
          (({
            destroy: jest.fn(),
            state: {
              placement: 'bottom',
              visible: false,
            },
          } as unknown) as popper.Instance),
      );
    options = ([] as unknown) as NodeListOf<HTMLZenOptionElement>;
    jest
      .spyOn(helpers, 'getDefaultSlotContent')
      .mockClear()
      .mockImplementation(() => (options as unknown) as Element[]);
    jest
      .spyOn(helpers, 'getComposedPath')
      .mockClear()
      .mockImplementation(() => []);
    jest
      .spyOn(helpers, 'scrollIntoView')
      .mockClear()
      .mockImplementation(() => true);
    jest
      .spyOn(helpers, 'waitNextFrame')
      .mockClear()
      .mockImplementation(() => new Promise(resolve => resolve(true)));
  });

  const render = async (attributes?: string) => {
    page = await newSpecPage({
      components: [ZenDropdown, ZenPopover],
      html: `<zen-dropdown ${attributes}>
        <zen-option value="admin">Administrator</zen-option>
        <zen-option value="reader">Reader</zen-option>
        <zen-option value="contributor">Contributor</zen-option>
      </ zen-dropdown>`,
    });
    dropdown = page.root as HTMLZenDropdownElement;
    list = dropdown.shadowRoot.querySelector('.list');
    options = (helpers.htmlToElement(`<zen-option value="admin">Administrator</zen-option>
        <zen-option value="reader">Reader</zen-option>
        <zen-option value="contributor">Contributor</zen-option>`) as unknown) as NodeListOf<HTMLZenOptionElement>;

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
