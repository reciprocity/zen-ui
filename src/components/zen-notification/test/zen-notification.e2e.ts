import { newE2EPage, E2EPage } from '@stencil/core/testing';

describe('zen-notification', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<zen-notification></zen-notification>');

    const element = await page.find('zen-notification');
    expect(element).toHaveClass('hydrated');
  });

  it('default render', async () => {
    const page: E2EPage = await newE2EPage();
    await page.setContent('<zen-notification variant="error"></zen-notification>');

    // To start comparing the visual result, you first must run page.compareScreenshot; This will capture a screenshot, and save the file to "/screenshot/images". You'll be able to check that into your repo to provide those results to your team. You can only have one of these commands per test:
    const results = await page.compareScreenshot();

    // Finally, we can test against the previous screenshots.
    // Test against hard pixels
    expect(results).toMatchScreenshot({ allowableMismatchedPixels: 100 });
    // Test against the percentage of changes. if 'allowableMismatchedRatio' is above 20% changed
    expect(results).toMatchScreenshot({ allowableMismatchedRatio: 0.2 });
  });
});
