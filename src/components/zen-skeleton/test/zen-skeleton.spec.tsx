import { newSpecPage } from '@stencil/core/testing';
import { ZenSkeleton } from '../zen-skeleton';

describe('zen-skeleton', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenSkeleton],
      html: `<zen-skeleton></zen-skeleton>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should render a squared skeleton', async () => {
    const page = await newSpecPage({
      components: [ZenSkeleton],
      html: `<zen-skeleton width="100px" height="100px"></zen-skeleton>`,
    });
    expect(page.root.style.width).toBe('100px');
    expect(page.root.style.height).toBe('100px');
  });

  it('should render a skeleton circle', async () => {
    const page = await newSpecPage({
      components: [ZenSkeleton],
      html: `<zen-skeleton width="100px" height="100px" is-rounded></zen-skeleton>`,
    });
    expect(page.root.getAttribute('is-rounded')).toBe('');
  });
});
