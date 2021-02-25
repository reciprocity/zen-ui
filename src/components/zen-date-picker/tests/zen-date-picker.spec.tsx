import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { simulateKey } from '../../helpers/jest';

const popperMock = {
  destroy: jest.fn(),
  state: {
    placement: 'bottom',
  },
};
import * as popper from '@popperjs/core';
popper.createPopper = jest.fn(() => popperMock);

import { helpers } from '../date-helpers';
helpers.today = jest.fn(() => new Date(1972, 1, 18));

import { ZenDatePicker } from '../zen-date-picker';
import { ZenInput } from '../../zen-input/zen-input';
import { ZenPopover } from '../../zen-popover/zen-popover';

// -----------------------------------------------------------------------------
describe('zen-date-picker', () => {
  let page: SpecPage;
  let datepicker: HTMLZenDatePickerElement;
  let input: HTMLZenInputElement;
  let calendar: HTMLZenPopoverElement;

  const render = async () => {
    jest.clearAllTimers();
    jest.useFakeTimers();
    page = await newSpecPage({
      components: [ZenDatePicker, ZenInput, ZenPopover],
      html: /*html*/ `
        <zen-date-picker />
      `,
    });
    await page.waitForChanges();
    datepicker = page.root as HTMLZenDatePickerElement;
    input = datepicker.shadowRoot.querySelector('#date-input');
    calendar = datepicker.shadowRoot.querySelector('.calendar');
  };

  async function focusInput() {
    const focusin = new Event('focusin', { bubbles: true, composed: true });
    datepicker.dispatchEvent(focusin);
    await page.waitForChanges();
  }

  function setInputValue(value) {
    input.value = value;
    const event = new Event('change', { bubbles: true, composed: true });
    input.dispatchEvent(event);
  }

  // ---------------------------------------------------------------------------
  it('should render with calendar hidden', async () => {
    await render();
    expect(calendar.visible).toBeFalsy();
  });

  it('should set today date on init', async () => {
    await render();
    expect(datepicker.value).toEqual(new Date(1972, 2 - 1, 18));
  });

  it('should render day numbers', async () => {
    await render();
    const numbers = calendar.querySelectorAll('.day-num');
    expect(numbers.length).toEqual(31);
    expect(numbers[5].textContent).toEqual('4');
    expect(numbers[30].textContent).toEqual('29');
  });

  it('should open on input focus', async () => {
    await render();
    await focusInput();
    expect(calendar.visible).toBeTruthy();
  });

  it('should update value on input change', async () => {
    await render();
    setInputValue('02/02/2021', input);
    const event = new Event('change', { bubbles: true, composed: true });
    input.dispatchEvent(event);
    await page.waitForChanges();
    expect(datepicker.value).toEqual(new Date(2021, 2 - 1, 2));
  });

  it('should set value on number click', async () => {
    await render();
    const numbers = calendar.querySelectorAll('.day-num');
    numbers[5].click();
    await page.waitForChanges();
    expect(datepicker.value).toEqual(new Date(1972, 2 - 1, 4));
  });

  it('should mark day number on value change', async () => {
    await render();
    setInputValue('02/02/2021');
    await page.waitForChanges();
    const numbers = calendar.querySelectorAll('.day-num');
    expect(numbers[2].classList.contains('selected')).toBeTruthy();
  });

  it('should update calendar title on value change', async () => {
    await render();
    setInputValue('02/02/2021');
    await page.waitForChanges();
    const date = calendar.querySelector('.date');
    expect(date.textContent).toEqual('February 2021');
  });

  it('should change month date using arrows', async () => {
    await render();
    const date = calendar.querySelector('.date');
    const arrows = calendar.querySelectorAll('.navigation .icon');

    arrows[1].click();
    await page.waitForChanges();
    expect(date.textContent).toEqual('January 1972');

    arrows[2].click();
    arrows[2].click();
    await page.waitForChanges();
    expect(date.textContent).toEqual('March 1972');

    arrows[0].click();
    await page.waitForChanges();
    expect(date.textContent).toEqual('March 1971');

    arrows[3].click();
    arrows[3].click();
    await page.waitForChanges();
    expect(date.textContent).toEqual('March 1973');
  });

  it('should close calendar on value set', async () => {
    await render();
    const inputElement = input.shadowRoot.querySelector('input');
    inputElement.focus = jest.fn();

    await focusInput();
    expect(calendar.visible).toBeTruthy();

    datepicker.value = new Date(1972, 2 - 1, 4);
    await page.waitForChanges();
    expect(calendar.visible).toBeFalsy();
  });

  it('should close calendar on ESC', async () => {
    await render();
    await focusInput();
    expect(calendar.visible).toBeTruthy();
    simulateKey('Escape', datepicker);
    await page.waitForChanges();
    expect(calendar.visible).toBeFalsy();
  });

  it('should open and closes calendar on SPACE', async () => {
    await render();
    expect(calendar.visible).toBeFalsy();
    simulateKey(' ', datepicker);
    await page.waitForChanges();
    expect(calendar.visible).toBeTruthy();
    simulateKey(' ', datepicker);
    await page.waitForChanges();
    expect(calendar.visible).toBeFalsy();
  });
});