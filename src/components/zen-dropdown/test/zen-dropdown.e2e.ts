import { newE2EPage } from '@stencil/core/testing';

describe('zen-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<zen-dropdown></zen-dropdown>');

    const element = await page.find('zen-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
