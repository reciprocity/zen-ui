import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ZenProgressTracker, StepItem } from './zen-progress-tracker';
import { simulateClick } from '../helpers/jest';

const createComponent = async (page: SpecPage, steps: StepItem[]) => {
  const component = page.doc.createElement('zen-progress-tracker');
  (component as HTMLZenProgressTrackerElement).steps = steps;
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

describe('zen-progress-tracker', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenProgressTracker],
      html: `<zen-progress-tracker></zen-progress-tracker>`,
    });
    expect(page.root.shadowRoot).toEqualHtml(`
      <div class="progressbar">
        <div class="progress" style="transform: scaleX(0);"></div>
      </div>
      <ul class="steps"></ul>`);
  });

  it('should render steps', async () => {
    const page = await newSpecPage({
      components: [ZenProgressTracker],
      html: `<div></div>`,
    });
    await createComponent(page, [{ label: 'Step one', completed: true }]);

    expect(page.root.shadowRoot.querySelector('ul.steps')).toEqualHtml(`
      <ul class="steps">
        <li class="active step">
          <div class="roundle">
            <div>1</div>
          </div>
          <div class="label" style="width: 8rem;">Step one</div>
        </li>
      </ul>`);
  });

  it('should set active step', async () => {
    const page = await newSpecPage({
      components: [ZenProgressTracker],
      html: `<div></div>`,
    });
    const component = await createComponent(page, deafultSteps());

    expect(stepsCount(page)).toEqual(2);
    expect(activeStepLabel(page)).toEqualHtml('Step one');

    (component as HTMLZenProgressTrackerElement).activeIndex = 1;
    await page.waitForChanges();
    expect(activeStepLabel(page)).toEqualHtml('Step two');
  });

  it('should select step on click', async () => {
    const page = await newSpecPage({
      components: [ZenProgressTracker],
      html: `<div></div>`,
    });
    const component = await createComponent(page, deafultSteps());
    (component as HTMLZenProgressTrackerElement).activeIndex = 1;
    await page.waitForChanges();
    expect(activeStepLabel(page)).toEqualHtml('Step two');

    const firstStep = page.root.shadowRoot.querySelector('.step:not(.active)');
    simulateClick(firstStep);
    await page.waitForChanges();
    expect(activeStepLabel(page)).toEqualHtml('Step one');
  });
});
