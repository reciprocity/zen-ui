import { newSpecPage } from '@stencil/core/testing';

let getNextFieldResult = null;
import * as helpers from '../../helpers/helpers';
helpers.getNextField = jest.fn(() => getNextFieldResult);

import { ZenInput } from '../zen-input';
import { ZenIcon } from '../../zen-icon/zen-icon';

describe('zen-input', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input></zen-input>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should render with placeholder', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input placeholder="Test placeholder"></zen-input>`,
    });
    expect(page.root);
  });

  it('should render with value', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input value="Test value"></zen-input>`,
    });
    expect(page.root.shadowRoot.querySelector('input').getAttribute('value')).toBe('Test value');
  });

  it('should render as invalid', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input invalid></zen-input>`,
    });
    expect(page.root.classList.contains('invalid')).toBe(true);
  });

  it('should render as disabled', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input disabled></zen-input>`,
    });
    expect(page.root.classList.contains('disabled')).toBe(true);
    expect(page.root.shadowRoot.querySelector('input').getAttribute('disabled')).toBe('');
  });

  it('should render fulfilling leadingSlot', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input><component-example slot="leadingSlot" /></zen-input>`,
    });
    expect(page.root.querySelector('[slot="leadingSlot"]')).toBeTruthy();
  });

  it('should render fulfilling trailingSlot', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input><component-example slot="trailingSlot" /></zen-input>`,
    });
    expect(page.root.querySelector('[slot="trailingSlot"]')).toBeTruthy();
  });

  it('should render fulfilling leadingSlot and trailingSlot', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input><component-example slot="leadingSlot" /><component-example slot="trailingSlot" /></zen-input>`,
    });
    expect(page.root.querySelector('[slot="leadingSlot"]')).toBeTruthy();
    expect(page.root.querySelector('[slot="trailingSlot"]')).toBeTruthy();
  });

  it('should apply focus in onFocus', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input></zen-input>`,
    });

    const inputElement = page.root.shadowRoot.querySelector('input');
    inputElement.dispatchEvent(new Event('focus'));

    await page.waitForChanges();

    expect(page.root.classList.contains('has-focus')).toBe(true);
  });

  it('should remove focus in onBlur', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input></zen-input>`,
    });

    const inputElement = page.root.shadowRoot.querySelector('input');
    inputElement.dispatchEvent(new Event('blur'));

    await page.waitForChanges();

    expect(page.root.classList.contains('has-focus')).toBe(false);
  });

  it('should change value prop in onInput', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input></zen-input>`,
    });

    const inputElement = page.root.shadowRoot.querySelector('input');
    inputElement.value = 'My input content';
    inputElement.dispatchEvent(new Event('input'));

    await page.waitForChanges();

    expect(page.rootInstance.value).toBe('My input content');
  });

  it('should change value prop in onChange', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input></zen-input>`,
    });

    const inputElement = page.root.shadowRoot.querySelector('input');
    inputElement.value = 'My changed content';
    inputElement.dispatchEvent(new Event('change'));

    await page.waitForChanges();

    expect(page.rootInstance.value).toBe('My changed content');
  });

  it('should change focus in onKeyDown Enter key', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input></zen-input>`,
    });

    const inputElement = page.root.shadowRoot.querySelector('input');
    const inputSpy = jest.fn();
    inputElement.addEventListener('keydown', inputSpy);

    inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    await page.waitForChanges();

    expect(inputSpy).toHaveBeenCalled();
  });

  it('should focus when focusInput called', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input></zen-input>`,
    });

    const inputElement = page.root.shadowRoot.querySelector('input');
    inputElement.focus = jest.fn();
    page.root.focusInput();
    await page.waitForChanges();
    expect(inputElement.focus).toHaveBeenCalled();
  });

  it('enter-to-tab should focus next input', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `
        <zen-input enter-to-tab></zen-input>
        <p>some text</p>
        <input id="next-input"/>
      `,
    });
    const input = page.doc.querySelector('zen-input');
    const nextInput = page.doc.querySelector('#next-input');
    getNextFieldResult = nextInput;
    nextInput.focus = jest.fn();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await page.waitForChanges();
    expect(nextInput.focus).toHaveBeenCalled();
  });

  it('should show clear button', async () => {
    const page = await newSpecPage({
      components: [ZenInput, ZenIcon],
      html: `<zen-input></zen-input>`,
    });

    const inputElement = page.root.shadowRoot.querySelector('input');

    let clearButton = page.root.shadowRoot.querySelector('.icon.clear');
    expect(clearButton).toBeFalsy();

    inputElement.dispatchEvent(new Event('focus'));
    await page.waitForChanges();
    clearButton = page.root.shadowRoot.querySelector('.icon.clear');
    expect(clearButton).toBeFalsy();

    inputElement.value = 'something';
    page.root.value = 'something';
    await page.waitForChanges();

    clearButton = page.root.shadowRoot.querySelector('.icon.clear');
    expect(clearButton).toBeTruthy();
  });

  it('should not show clear button if clearButton false', async () => {
    const page = await newSpecPage({
      components: [ZenInput, ZenIcon],
      html: `<zen-input clear-button="false"></zen-input>`,
    });

    const inputElement = page.root.shadowRoot.querySelector('input');

    inputElement.dispatchEvent(new Event('focus'));
    page.root.value = 'something';
    await page.waitForChanges();
    const clearButton = page.root.shadowRoot.querySelector('.icon.clear');
    expect(clearButton).toBeFalsy();
  });

  it('should show small clear icon', async () => {
    const page = await newSpecPage({
      components: [ZenInput, ZenIcon],
      html: `<zen-input size="sm" value="x"></zen-input>`,
    });
    const inputElement = page.root.shadowRoot.querySelector('input');
    inputElement.dispatchEvent(new Event('focus'));
    await page.waitForChanges();
    const icon = page.root.shadowRoot.querySelector('.icon.clear');
    expect(icon.getAttribute('size')).toEqual('sm');
  });
});
