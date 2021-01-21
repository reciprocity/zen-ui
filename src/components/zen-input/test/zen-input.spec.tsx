import { newSpecPage } from '@stencil/core/testing';
import { ZenInput } from '../zen-input';

describe('zen-input', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input></zen-input>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('renders with placeholder', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input placeholder="Test placeholder"></zen-input>`,
    });
    expect(page.root);
  });

  it('renders with value', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input value="Test value"></zen-input>`,
    });
    expect(page.root.shadowRoot.querySelector('input').getAttribute('value')).toBe('Test value');
  });

  it('renders as invalid', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input invalid></zen-input>`,
    });
    expect(page.root.classList.contains('invalid')).toBe(true);
  });

  it('renders as disabled', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input disabled></zen-input>`,
    });
    expect(page.root.classList.contains('disabled')).toBe(true);
    expect(page.root.shadowRoot.querySelector('input').getAttribute('disabled')).toBe('');
  });

  it('renders fulfilling leadingSlot', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input><component-example slot="leadingSlot" /></zen-input>`,
    });
    expect(page.root.querySelector('[slot="leadingSlot"]')).toBeTruthy();
  });

  it('renders fulfilling trailingSlot', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input><component-example slot="trailingSlot" /></zen-input>`,
    });
    expect(page.root.querySelector('[slot="trailingSlot"]')).toBeTruthy();
  });

  it('renders fulfilling leadingSlot and trailingSlot', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input><component-example slot="leadingSlot" /><component-example slot="trailingSlot" /></zen-input>`,
    });
    expect(page.root.querySelector('[slot="leadingSlot"]')).toBeTruthy();
    expect(page.root.querySelector('[slot="trailingSlot"]')).toBeTruthy();
  });

  it('applies focus in onFocus', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input></zen-input>`,
    });

    const inputElement = page.root.shadowRoot.querySelector('input');
    inputElement.dispatchEvent(new Event('focus'));

    await page.waitForChanges();

    expect(page.root.classList.contains('has-focus')).toBe(true);
  });

  it('removes focus in onBlur', async () => {
    const page = await newSpecPage({
      components: [ZenInput],
      html: `<zen-input></zen-input>`,
    });

    const inputElement = page.root.shadowRoot.querySelector('input');
    inputElement.dispatchEvent(new Event('blur'));

    await page.waitForChanges();

    expect(page.root.classList.contains('has-focus')).toBe(false);
  });

  it('changes value prop in onInput', async () => {
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

  it('changes value prop in onChange', async () => {
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

  it('changes focus in onKeyDown Enter key', async () => {
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
});
