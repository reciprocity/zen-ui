import { newSpecPage } from '@stencil/core/testing';
import { ZenSpinner } from '../zen-spinner';

describe('zen-spinner', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenSpinner],
      html: `<zen-spinner></zen-spinner>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenSpinner],
      html: `<zen-spinner></zen-spinner>`,
    });
    expect(page.root.shadowRoot.querySelector('span').classList.contains('spinner')).toBe(true);
  });
});
