import { newSpecPage } from '@stencil/core/testing';
import { ZenButton } from '../zen-button';

describe('zen-button variants rendering', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button></zen-button>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it.each(['primary', 'secondary', 'tertiary', 'positive', 'destructive'])('renders %s button', async variant => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button variant="${variant}"></zen-button>`,
    });
    expect(page.root.classList.contains(`btn-${variant}`)).toBe(true);
  });

  it('renders with loading state', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button loading></zen-button>`,
    });
    expect(page.root.shadowRoot.querySelector('zen-spinner')).toBeTruthy();
  });

  it('renders with disabled state', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button disabled></zen-button>`,
    });
    expect(page.root.classList.contains('disabled')).toBe(true);
  });

  it('renders with leadingIcon slot fulfilled', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button>Button<zen-spinner slot="leadingIcon"></zen-spinner></zen-button>`,
    });
    expect(page.root.querySelector('[slot="leadingIcon"]')).toBeTruthy();
  });

  it('renders with trailingIcon slot fulfilled', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button>Button<zen-spinner slot="trailingIcon"></zen-spinner></zen-button>`,
    });
    expect(page.root.querySelector('[slot="trailingIcon"]')).toBeTruthy();
  });

  it('renders with leadingIcon and trailingIcon slot fulfilled', async () => {
    const page = await newSpecPage({
      components: [ZenButton],
      html: `<zen-button>Button<zen-spinner slot="leadingIcon"></zen-spinner><zen-spinner slot="trailingIcon"></zen-spinner></zen-button>`,
    });
    expect(page.root.querySelector('[slot="leadingIcon"]')).toBeTruthy();
    expect(page.root.querySelector('[slot="trailingIcon"]')).toBeTruthy();
  });

  it('triggers click event on onKeyDown Enter key', async () => {
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
