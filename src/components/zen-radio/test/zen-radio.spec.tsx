import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { simulateKey } from '../../helpers/jest';

let radios: HTMLZenRadioElement[] = [];
jest.mock('query-selector-shadow-dom', () => ({
  ...jest.requireActual('query-selector-shadow-dom'),
  querySelectorAllDeep: jest.fn(() => {
    return radios;
  }),
}));

import { ZenRadio } from '../zen-radio';

const radioInput = (element: HTMLZenRadioElement) => element.shadowRoot.querySelector('input');

describe('Radio', () => {
  let page: SpecPage;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [ZenRadio],
      html: `
        <zen-radio group="group-a" value="0">Option 1</zen-radio>
        <zen-radio group="group-a" value="1">Option 2</zen-radio>
        <zen-radio group="group-a" value="2">Option 3</zen-radio>
      `,
    });
    radios = Array.from(page.doc.querySelectorAll('zen-radio'));

    /** Mock Input Elements focus and blur function */
    for (const element of radios) {
      radioInput(element).focus = jest.fn();
      radioInput(element).blur = jest.fn();
    }
  });

  it('renders radios', async () => {
    expect(radios.length).toEqual(3);
  });

  it('checks input', async () => {
    expect(radioInput(radios[0]).checked).toEqual(false);
    radios[0].checked = true;
    await page.waitForChanges();
    expect(radioInput(radios[0]).checked).toEqual(true);
  });

  it('unchecks input when other radio selected', async () => {
    expect(radioInput(radios[0]).checked).toEqual(false);
    radios[0].checked = true;
    await page.waitForChanges();
    expect(radioInput(radios[0]).checked).toEqual(true);
    radios[1].checked = true;
    await page.waitForChanges();
    expect(radioInput(radios[0]).checked).toEqual(false);
    expect(radioInput(radios[1]).checked).toEqual(true);
  });

  it('deselects all on setting empty "selected" prop', async () => {
    radios[2].checked = true;
    await page.waitForChanges();
    expect(radioInput(radios[2]).checked).toEqual(true);
    radios[0].selected = '';
    await page.waitForChanges();
    for (const element of [radios[0], radios[1], radios[2]]) {
      expect(element.checked).toEqual(false);
    }
  });

  it('deselects all on setting invalid "selected" prop', async () => {
    radios[2].checked = true;
    await page.waitForChanges();
    expect(radioInput(radios[2]).checked).toEqual(true);
    radios[0].selected = 'gfdbc8';
    await page.waitForChanges();
    for (const element of [radios[0], radios[1], radios[2]]) {
      expect(element.checked).toEqual(false);
    }
  });

  it('emits "change" event on change', async () => {
    const eventSpy = jest.fn();
    radios[2].addEventListener('change', eventSpy);

    radios[2].checked = true;
    await page.waitForChanges();
    expect(eventSpy).toHaveBeenCalledTimes(1);
  });

  it('emits "change" event on item from same group change', async () => {
    const eventSpy = jest.fn();
    radios[2].addEventListener('change', eventSpy);

    radios[1].checked = true;
    await page.waitForChanges();
    expect(eventSpy).toHaveBeenCalledTimes(1);
  });

  it('updates prop "selected" on item from same group change', async () => {
    radios[2].checked = true;
    await page.waitForChanges();
    expect(radios[2].selected).toEqual('2');
    radios[0].checked = true;
    await page.waitForChanges();
    expect(radios[2].selected).toEqual('0');
  });

  it('selects next item on key "down"', async () => {
    radios[1].checked = true;
    await page.waitForChanges();
    expect(radios[2].selected).toEqual('1');

    simulateKey('ArrowDown', radios[1]);
    await page.waitForChanges();
    expect(radios[2].selected).toEqual('2');
  });

  it('selects previous item on key "up"', async () => {
    radios[1].checked = true;
    await page.waitForChanges();
    expect(radios[2].selected).toEqual('1');

    simulateKey('ArrowUp', radios[1]);
    await page.waitForChanges();
    expect(radios[2].selected).toEqual('0');
  });

  it('selects last on key "up" on first item', async () => {
    simulateKey('ArrowUp', radios[0]);
    await page.waitForChanges();
    expect(radios[0].selected).toEqual('2');
  });

  it('selects first on key "down" on last item', async () => {
    simulateKey('ArrowDown', radios[2]);
    await page.waitForChanges();
    expect(radios[2].selected).toEqual('0');
  });
});
