import { newSpecPage } from '@stencil/core/testing';
import { ZenToggle } from '../zen-toggle';

describe('zen-toggle', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenToggle],
      html: `<zen-toggle></zen-toggle>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should toggle on enter and spacebar keys', async () => {
    const page = await newSpecPage({
      components: [ZenToggle],
      html: `<zen-toggle></zen-toggle>`,
    });

    const keyDownSpy = jest.fn();
    const changeSpy = jest.fn();

    page.root.addEventListener('keydown', keyDownSpy);
    page.root.addEventListener('zenChange', changeSpy);

    page.root.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));
    await page.waitForChanges();
    expect(page.rootInstance.checked).toBe(true);

    page.root.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    await page.waitForChanges();
    expect(page.rootInstance.checked).toBe(false);

    expect(keyDownSpy).toHaveBeenCalled();
    expect(changeSpy).toHaveBeenCalled();
  });

  it('should toggle on click', async () => {
    const page = await newSpecPage({
      components: [ZenToggle],
      html: `<zen-toggle></zen-toggle>`,
    });

    const clickSpy = jest.fn();
    const changeSpy = jest.fn();

    page.root.addEventListener('click', clickSpy);
    page.root.addEventListener('zenChange', changeSpy);

    page.root.dispatchEvent(new MouseEvent('click'));
    await page.waitForChanges();
    expect(page.rootInstance.checked).toBe(true);

    page.root.dispatchEvent(new MouseEvent('click'));
    await page.waitForChanges();
    expect(page.rootInstance.checked).toBe(false);

    expect(clickSpy).toHaveBeenCalled();
    expect(changeSpy).toHaveBeenCalled();
  });

  it('should deny toggle on disabled', async () => {
    const page = await newSpecPage({
      components: [ZenToggle],
      html: `<zen-toggle disabled></zen-toggle>`,
    });

    const clickSpy = jest.fn();
    const keyDownSpy = jest.fn();
    const changeSpy = jest.fn();

    page.root.addEventListener('click', clickSpy);
    page.root.addEventListener('keydown', keyDownSpy);
    page.root.addEventListener('change', changeSpy);

    page.root.dispatchEvent(new MouseEvent('click'));
    await page.waitForChanges();
    expect(page.rootInstance.checked).toBe(false);

    page.root.dispatchEvent(new KeyboardEvent('keydown', { code: 'Enter' }));
    await page.waitForChanges();
    expect(page.rootInstance.checked).toBe(false);

    page.root.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    await page.waitForChanges();
    expect(page.rootInstance.checked).toBe(false);
  });

  it('should deny toggle when not allowed key is triggered', async () => {
    const page = await newSpecPage({
      components: [ZenToggle],
      html: `<zen-toggle></zen-toggle>`,
    });

    const keyDownSpy = jest.fn();
    page.root.addEventListener('keydown', keyDownSpy);

    page.root.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA' }));
    await page.waitForChanges();
    expect(page.rootInstance.checked).toBe(false);
  });

  it('should deny focus on disabled', async () => {
    const page = await newSpecPage({
      components: [ZenToggle],
      html: `<zen-toggle disabled></zen-toggle>`,
    });

    expect(page.root.shadowRoot.querySelector('span.switch').getAttribute('tabindex')).toBe('-1');
  });
});
