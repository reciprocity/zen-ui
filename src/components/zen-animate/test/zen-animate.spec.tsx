import { newSpecPage } from '@stencil/core/testing';
import { htmlToElement } from '../../helpers/jest';

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
});
