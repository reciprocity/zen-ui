import { newSpecPage } from '@stencil/core/testing';

import { ZenCard } from '../zen-card';

describe('zen-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenCard],
      html: `<zen-card>Content</zen-card>`,
    });

    expect(page.root.innerHTML).toEqual('Content');
  });

  it('applied `disabled` class if `disabled` prop is set', async () => {
    const page = await newSpecPage({
      components: [ZenCard],
      html: `<zen-card disabled></zen-card>`,
    });

    expect(page.root.classList.contains(`disabled`)).toBe(true);
  });
});
