import { Component, Host, h, Prop } from '@stencil/core';

export interface StepItem {
  label: string
}

@Component({
  tag: 'zen-steps',
  styleUrl: 'zen-steps.scss',
  shadow: true,
})

export class ZenSteps {
  /** Ordered array of possible steps */
  @Prop({ reflect: true }) steps: Array<StepItem> = [];

  render() {
    return (
      <Host class="zen-steps">
        <ul class={{ steps: true }}>
          { this.steps.map((step, index) =>
            <li
              class={ `step` }
            >
              <div class="roundle">
                <div>{index + 1}</div>
              </div>
              <div class="label">{ step.label }</div>
            </li>
          )}
        </ul>
      </Host>
    );
  }
}
