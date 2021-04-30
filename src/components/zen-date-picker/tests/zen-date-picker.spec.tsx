import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { simulateKey } from '../../helpers/jest';
import * as popper from '@popperjs/core';
import { helpers } from '../date-helpers';

import { ZenDatePicker } from '../zen-date-picker';
import { ZenInput } from '../../zen-input/zen-input';
import { ZenPopover } from '../../zen-popover/zen-popover';

// -----------------------------------------------------------------------------
describe('zen-date-picker', () => {
  let page: SpecPage;
  let datepicker: HTMLZenDatePickerElement;
  let input: HTMLZenInputElement;
  let calendar: HTMLZenPopoverElement;

  beforeEach(() => {
    jest
      .spyOn(popper, 'createPopper')
      .mockClear()
      .mockImplementation(
        () =>
          (({
            destroy: jest.fn(),
            state: {
              placement: 'bottom',
            },
          } as unknown) as popper.Instance),
      );
    jest
      .spyOn(helpers, 'today')
      .mockClear()
      .mockImplementation(() => new Date(1972, 1, 18));
  });

  const render = async (attributes?: string) => {
    jest.clearAllTimers();
    jest.useFakeTimers();
    page = await newSpecPage({
      components: [ZenDatePicker, ZenInput, ZenPopover],
      html: /*html*/ `
        <zen-date-picker ${attributes} />
      `,
    });
    await page.waitForChanges();
    datepicker = page.root as HTMLZenDatePickerElement;
    input = datepicker.shadowRoot.querySelector('#date-input');
    calendar = datepicker.shadowRoot.querySelector('.calendar');
  };

  const focusInput = async () => {
    const focusin = new Event('focus', { bubbles: true, composed: true });
    datepicker.dispatchEvent(focusin);
    await page.waitForChanges();
  };

  const setInputValue = (value: string) => {
    input.value = value;
    const event = new Event('zenChange', { bubbles: true, composed: true });
    input.dispatchEvent(event);
  };

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
    setInputValue('02/02/2021');
    const event = new Event('change', { bubbles: true, composed: true });
    input.dispatchEvent(event);
    await page.waitForChanges();
    expect(datepicker.value).toEqual(new Date(2021, 2 - 1, 2));
  });

  it('should set value on number click', async () => {
    await render();
    const numbers = calendar.querySelectorAll('.day-num') as NodeListOf<HTMLElement>;
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
    const arrows = calendar.querySelectorAll('.navigation .icon') as NodeListOf<HTMLElement>;

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

  it('should fallback to default format if format invalid', async () => {
    await render('format="dd.MM.yyyy"');
    expect(datepicker.format).toBe('dd.MM.yyyy');
    datepicker.format = '';
    expect(datepicker.format).toBe('dd.MM.yyyy');
  });

  it('should clear value on emptying input', async () => {
    await render();
    expect(datepicker.value).toEqual(new Date(1972, 2 - 1, 18));

    setInputValue('');
    expect(JSON.stringify(datepicker.value)).toEqual('null');
  });

  it('should not render x button if allowEmpty is false', async () => {
    await render('allow-empty="false"');

    const input = datepicker.shadowRoot.getElementById('date-input');
    const realInput = input.shadowRoot.querySelector('input');
    realInput.value = '02/02/2021';
    realInput.dispatchEvent(new Event('focus'));

    await page.waitForChanges();

    const clearButton = input.querySelector('.icon.clear');
    expect(clearButton).toBeFalsy();
  });

  it('should not clear date if allowEmpty is false', async () => {
    await render('allow-empty="false"');
    expect(datepicker.value).toEqual(new Date(1972, 2 - 1, 18));

    setInputValue('');
    expect(datepicker.value).toEqual(new Date(1972, 2 - 1, 18));
  });

  it('should parse formattedDate', async () => {
    await render('format="dd.MM.yyyy" formatted-date="13.9.1900"');
    expect(datepicker.value).toEqual(new Date(1900, 9 - 1, 13));
  });

  it('should render empty date if invalid formatted-date', async () => {
    await render('formatted-date=""');
    expect(JSON.stringify(datepicker.value)).toEqual('null');
  });

  it('should render today if invalid formatted-date and not allow-empty', async () => {
    await render('formatted-date="" allow-empty="false"');
    expect(datepicker.value).toEqual(new Date(1972, 2 - 1, 18));
  });

  it('should render small calendar icon and input', async () => {
    await render('size="sm"');
    const input = datepicker.shadowRoot.querySelector('zen-input');
    expect(input.getAttribute('size')).toEqual('sm');
  });

  it('should render normal calendar icon and input', async () => {
    await render();
    const input = datepicker.shadowRoot.querySelector('zen-input');
    expect(input.getAttribute('size')).toEqual('md');
  });

  it('should render large calendar icon and input', async () => {
    await render('size="lg"');
    const input = datepicker.shadowRoot.querySelector('zen-input');
    expect(input.getAttribute('size')).toEqual('lg');
  });

  it('should disable days before when disableBeforeDate prop is set', async () => {
    await render('disable-before-date="02/06/2021"');
    setInputValue('02/10/2021');
    await page.waitForChanges();
    const numbers = calendar.querySelectorAll('.day-num');
    const disabledDays = Array.from(numbers).filter(el => {
      return el.getAttribute('disabled') !== null && !el.classList.contains('empty');
    });
    expect(disabledDays.length).toEqual(5);
  });

  it('should disable days after when disableAfterDate prop is set', async () => {
    await render('disable-after-date="02/12/2021"');
    setInputValue('02/10/2021');
    await page.waitForChanges();
    const numbers = calendar.querySelectorAll('.day-num');
    const disabledDays = Array.from(numbers).filter(el => {
      return el.getAttribute('disabled') !== null && !el.classList.contains('empty');
    });
    expect(disabledDays.length).toEqual(16);
  });
});
