import { newE2EPage } from '@stencil/core/testing';

describe('zen-notification', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent('<zen-notification></zen-notification>');

    const element = await page.find('zen-notification');
    expect(element).toHaveClass('hydrated');
  });
});
