import { newSpecPage } from '@stencil/core/testing';
import { ZenButton } from '../zen-button';

describe('zen-button', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button></zen-button>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it.each(['blue-filled', 'blue-ghost', 'grey-ghost', 'grey-text', 'green-ghost', 'red-filled', 'red-ghost'])(
    'should render button (variant: %s) with loading and disabled props',
    async variant => {
      const page = await newSpecPage({
        components: [ZenButton],
        html: `<zen-button variant="${variant}" loading disabled></zen-button>`,
      });
      expect(page.root.classList.contains(`${variant}`)).toBe(true);
      expect(page.root.classList.contains('disabled')).toBe(true);
      expect(page.root.shadowRoot.querySelector('zen-spinner')).toBeTruthy();
    },
  );

  it('should trigger click event on onKeyDown Enter key', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button></zen-button>`,
    });

    const keyupSpy = jest.fn();
    const clickSpy = jest.fn();

    page.root.addEventListener('keyup', keyupSpy);
    page.root.addEventListener('click', clickSpy);
    page.root.dispatchEvent(new KeyboardEvent('keyup', { code: 'Enter' }));

    await page.waitForChanges();

    expect(keyupSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
  });
});
