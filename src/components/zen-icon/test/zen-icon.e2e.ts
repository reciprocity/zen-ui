import { newE2EPage } from '@stencil/core/testing';

describe('zen-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<zen-icon></zen-icon>');

    const element = await page.find('zen-icon');
    expect(element).toHaveClass('hydrated');
  });
});
