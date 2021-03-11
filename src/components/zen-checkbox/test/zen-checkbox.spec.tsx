import { newSpecPage } from '@stencil/core/testing';
import { ZenCheckbox } from '../zen-checkbox';

describe('zen-checkbox', () => {
  it('should render with shadow dom', async () => {
    const page = await newSpecPage({
      components: [ZenCheckbox],
      html: `<zen-checkbox></zen-checkbox>`,
    });
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should render with disabled, required, and checked props in', async () => {
    const page = await newSpecPage({
      components: [ZenCheckbox],
      html: `<zen-checkbox checked disabled required></zen-checkbox>`,
    });
    expect(page.root.getAttribute('disabled')).toBe('');
    expect(page.root.getAttribute('required')).toBe('');
    expect(page.root.getAttribute('checked')).toBe('');
  });

  it('should render with label', async () => {
    const page = await newSpecPage({
      components: [ZenCheckbox],
      html: `<zen-checkbox label="This is an example label"></zen-checkbox>`,
    });
    expect(page.root.shadowRoot.querySelector('label')).toBeTruthy();
    expect(page.root.shadowRoot.querySelector('label').innerText).toBe('This is an example label ');
  });

  it('should check on click', async () => {
    const page = await newSpecPage({
      components: [ZenCheckbox],
      html: `<zen-checkbox></zen-checkbox>`,
      supportsShadowDom: true,
    });
    page.root.click();
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('input').getAttribute('checked')).toBe('');
  });

  it('should uncheck on click', async () => {
    const page = await newSpecPage({
      components: [ZenCheckbox],
      html: `<zen-checkbox checked></zen-checkbox>`,
    });
    page.root.click();
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('input').getAttribute('checked')).toBeFalsy();
  });

  it('should not get toggled when disabled', async () => {
    const page = await newSpecPage({
      components: [ZenCheckbox],
      html: `<zen-checkbox></zen-checkbox>`,
      supportsShadowDom: true,
    });
    page.root.click();
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('input').getAttribute('checked')).toBeFalsy();
  });

  it('should toggle to checked when click on indeterminate', async () => {
    const page = await newSpecPage({
      components: [ZenCheckbox],
      html: `<zen-checkbox indeterminate></zen-checkbox>`,
      supportsShadowDom: true,
    });
    page.root.click();
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('input').getAttribute('checked')).toBe('');
  });
});
