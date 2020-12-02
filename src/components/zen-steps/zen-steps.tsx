import { Component, Host, h, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { faCheck } from '@fortawesome/pro-light-svg-icons';
import { renderIcon, styles } from '../helpers/fa-icons';

export interface StepItem {
  label: string;
}

enum StepState {
  Waiting = 'waiting',
  Completed = 'completed',
  Active = 'active',
}

export interface StepEvent {
  index: number;
  step: StepItem;
}

@Component({
  tag: 'zen-steps',
  styleUrl: 'zen-steps.scss',
  shadow: true,
})
export class ZenSteps {
  @State() internalActiveIndex: number;
  /** Ordered array of possible steps */
  @Prop({ reflect: true }) readonly steps: Array<StepItem> = [];
  /** Index of currently active step */
  @Prop({ reflect: true }) readonly activeIndex = 0;
  /** User can click step to go to step */
  @Prop({ reflect: true }) readonly selectable = true;

  @Watch('activeIndex')
  activeIndexChanged(activeIndex: number): void {
    this.internalActiveIndex = activeIndex;
  }

  /** User clicked a step */
  @Event() selected: EventEmitter<StepEvent>;

  selectStep(index: number, step: StepItem): void {
    this.internalActiveIndex = index;
    this.selected.emit({ index, step });
  }

  getItemState(index: number): StepState {
    if (index < this.internalActiveIndex) return StepState.Completed;
    if (index === this.internalActiveIndex) return StepState.Active;
    return StepState.Waiting;
  }

  progressWidth(): number {
    return Math.max(0, Math.min(1, this.internalActiveIndex / (this.steps.length - 1)));
  }

  connectedCallback(): void {
    this.activeIndexChanged(this.activeIndex);
  }

  render(): HTMLElement {
    return (
      <Host class="zen-steps">
        <style>{styles}</style>
        <div class="progressbar">
          <div class="progress" style={{ transform: `scaleX(${this.progressWidth()})` }}></div>
        </div>
        <ul class={{ steps: true }}>
          {this.steps.map((step, index) => (
            <li
              class={`step ${this.getItemState(index)}`}
              onClick={() => {
                if (this.selectable) this.selectStep(index, step);
              }}
            >
              <div class="roundle">
                {this.getItemState(index) === StepState.Active && <div>{index + 1}</div>}
                {this.getItemState(index) === StepState.Completed && renderIcon(faCheck)}
              </div>
              <div class="label">{step.label}</div>
            </li>
          ))}
        </ul>
      </Host>
    );
  }
}
