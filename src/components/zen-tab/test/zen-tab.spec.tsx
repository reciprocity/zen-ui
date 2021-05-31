import { newSpecPage } from '@stencil/core/testing';
import { ZenTab } from '../zen-tab';
import { simulateMouse } from '../../helpers/jest';

describe('zen-tab', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenTab],
      html: `<zen-tab></zen-tab>`,
    });

    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should be disabled', async () => {
    const page = await newSpecPage({
      components: [ZenTab],
      html: `<zen-tab disabled>Tab 1</zen-tab>`,
    });

    expect(page.root.hasAttribute('disabled')).toBe(true);
  });

  it('should trigger on click event', async () => {
    const page = await newSpecPage({
      components: [ZenTab],
      html: `<zen-tab>Tab 1</zen-tab>`,
    });

    const clickSpy = jest.fn();
    page.root.addEventListener('click', clickSpy);
    simulateMouse('click', page.root);
    await page.waitForChanges();

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });
});
