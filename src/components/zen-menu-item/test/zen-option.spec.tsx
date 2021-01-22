import { newSpecPage } from '@stencil/core/testing';
import { propReflectsInAttributes } from '../../helpers/jest';

import { ZenOption } from '../zen-option';

describe('Zen-option', () => {
  it('reflects all props', async () => {
    const page = await newSpecPage({
      components: [ZenOption],
      html: `<zen-option />`,
    });
    const props = {
      selected: true,
      focused: true,
      value: 'some value',
      noHover: true,
      disabled: true,
    };
    expect(await propReflectsInAttributes(page, props)).toBeTruthy();
  });

  it('appends disabled class', async () => {
    const page = await newSpecPage({
      components: [ZenOption],
      html: `<zen-option />`,
    });
    page.rootInstance.disabled = true;
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.background').classList.contains('disabled')).toBeTruthy();
  });
});
