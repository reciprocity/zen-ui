import { newE2EPage } from '@stencil/core/testing';

describe('zen-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<zen-toast></zen-toast>');

    const element = await page.find('zen-toast');
    expect(element).toHaveClass('hydrated');
  });
});
