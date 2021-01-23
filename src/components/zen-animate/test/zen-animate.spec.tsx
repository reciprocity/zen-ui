import { newSpecPage } from '@stencil/core/testing';
import { htmlToElement } from '../../helpers/jest';

jest.useFakeTimers();

const fakeSlot = htmlToElement('<div></div>')[0];

import * as helpers from '../../helpers/helpers';
helpers.getSlotElement = jest.fn(() => fakeSlot);
helpers.waitNextFrame = jest.fn(() => new Promise(resolve => resolve(true)));

import { ZenAnimate } from '../zen-animate';

describe('zen-animate', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenAnimate],
      html: `<zen-animate><h1>Slot</h1></zen-animate>`,
    });
    expect(page.root).toEqualHtml(`
      <zen-animate>
      <mock:shadow-root>
        <div></div>
      </mock:shadow-root>
      <h1>Slot</h1>
    </zen-animate>
    `);
  });

  it('does shows when prop changed', async () => {
    const page = await newSpecPage({
      components: [ZenAnimate],
      html: `<zen-animate><h1>Slot</h1></zen-animate>`,
    });
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('slot')).toBeFalsy();
    page.rootInstance.show = true;
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('slot')).toBeTruthy();
  });
});
