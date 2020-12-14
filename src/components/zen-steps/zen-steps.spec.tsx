import { newSpecPage } from '@stencil/core/testing';
import { ZenSteps } from './zen-steps';

describe('zen-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ZenSteps],
      html: `<zen-steps></zen-steps>`,
    });
    expect(page.root.shadowRoot).toEqualHtml(`
      <div class="progressbar">
        <div class="progress" style="transform: scaleX(0);"></div>
      </div>
      <ul class="steps"></ul>`);
  });

  it('Renders steps', async () => {
    const page = await newSpecPage({
      components: [ZenSteps],
      html: `<div></div>`,
    });
    const component = page.doc.createElement('zen-steps');

    (component as HTMLZenStepsElement).steps = [{ label: 'Step one', completed: true }];
    page.root.appendChild(component);
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelector('ul.steps')).toEqualHtml(`
      <ul class="steps">
        <li class="active step">
          <div class="roundle">
            <div>1</div>
          </div>
          <div class="label">Step one</div>
        </li>
      </ul>`);
  });

  it('Sets active step', async () => {
    const page = await newSpecPage({
      components: [ZenSteps],
      html: `<div></div>`,
    });
    const component = page.doc.createElement('zen-steps');

    (component as HTMLZenStepsElement).steps = [{ label: 'Step one' }, { label: 'Step two' }];
    page.root.appendChild(component);
    await page.waitForChanges();

    expect(page.root.shadowRoot.querySelectorAll('.step').length).toEqual(2);
    expect(page.root.shadowRoot.querySelector('.step.active .label').innerHTML).toEqualHtml('Step one');

    (component as HTMLZenStepsElement).activeIndex = 1;
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.step.active .label').innerHTML).toEqualHtml('Step two');
  });
});
