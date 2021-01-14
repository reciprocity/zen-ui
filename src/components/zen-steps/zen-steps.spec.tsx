import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ZenSteps, StepItem } from './zen-steps';

const createStepsComponent = async (page: SpecPage, steps: StepItem[]) => {
  const component = page.doc.createElement('zen-steps');
  (component as HTMLZenStepsElement).steps = steps;
  page.root.appendChild(component);
  await page.waitForChanges();
  return component;
};

const deafultSteps = () => [
  { label: 'Step one', completed: true },
  { label: 'Step two', completed: false },
];

const stepsCount = (page: SpecPage): number => page.root.shadowRoot.querySelectorAll('.step').length;

const activeStepLabel = (page: SpecPage): string => page.root.shadowRoot.querySelector('.step.active .label').innerHTML;

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
    await createStepsComponent(page, [{ label: 'Step one', completed: true }]);

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
    const component = await createStepsComponent(page, deafultSteps());

    expect(stepsCount(page)).toEqual(2);
    expect(activeStepLabel(page)).toEqualHtml('Step one');

    (component as HTMLZenStepsElement).activeIndex = 1;
    await page.waitForChanges();
    expect(activeStepLabel(page)).toEqualHtml('Step two');
  });
});
