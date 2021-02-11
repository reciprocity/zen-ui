import { newE2EPage } from '@stencil/core/testing';

describe('zen-tooltip', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<zen-tooltip></zen-tooltip>');

    const element = await page.find('zen-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});
