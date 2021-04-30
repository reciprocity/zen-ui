import { Component, Host, h, Prop, State, Watch, Element, Event, EventEmitter } from '@stencil/core';
import { faCheck } from '@fortawesome/pro-light-svg-icons';
import { StepsFilter } from './types';
import cloneDeep from 'lodash/cloneDeep';
import { applyPrefix } from '../helpers/helpers';

export interface StepItem {
  label: string;
  completed: boolean;
}

type StepState = 'waiting' | 'completed' | 'active';

export interface StepEvent {
  index: number;
  step: StepItem;
}

@Component({
  tag: 'zen-progress-tracker',
  styleUrl: 'zen-progress-tracker.scss',
  shadow: true,
})
export class ZenProgressTracker {
  @Element() host: HTMLZenProgressTrackerElement;

  @State() internalActiveIndex: number;
  /** Ordered array of possible steps */
  @Prop({ reflect: true }) readonly steps: Array<StepItem> = [];
  /** Index of currently active step */
  @Prop({ reflect: true, mutable: true }) activeIndex = 0;
  /** User can click step to go to step */
  @Prop({ reflect: true }) readonly clickable: StepsFilter = 'completed';
  /** Max label width */
  @Prop({ reflect: true }) readonly labelWidth: string = '8rem';
  /** Progress tracker change event */
  @Event() zenChange: EventEmitter<void>;

  @Watch('activeIndex')
  activeIndexChanged(activeIndex: number): void {
    this.internalActiveIndex = activeIndex;
  }

  /** User clicked a step */
  selectStep(index: number): void {
    this.activeIndex = index;
    this.zenChange.emit();
  }

  stepClicked(index: number): void {
    if (this.clickable === 'none') return;
    const stepState = this.getItemState(index);
    if (this.clickable === 'completed' && stepState !== 'completed') return;
    this.selectStep(index);
  }

  getItemState(index: number): StepState {
    if (index === this.internalActiveIndex) return 'active';
    if (index < this.internalActiveIndex || this.steps[index].completed) return 'completed';
    return 'waiting';
  }

  progressWidth(): number {
    // Last completed is either ativeIndex or last step with completed.true:
    const lastCompletedIndex =
      this.steps.length - 1 - (cloneDeep(this.steps) as StepItem[]).reverse().findIndex(s => s.completed);
    const completedExists = this.steps.filter(s => s.completed).length;
    const lastStep = completedExists
      ? Math.max(this.internalActiveIndex, lastCompletedIndex)
      : this.internalActiveIndex;

    return Math.max(0, Math.min(1, lastStep / (this.steps.length - 1)));
  }

  connectedCallback(): void {
    this.activeIndexChanged(this.activeIndex);
  }

  render(): HTMLElement {
    const ZenIcon = applyPrefix('zen-icon', this.host);
    return (
      <Host class="zen-steps">
        <div class="progressbar">
          <div class="progress" style={{ transform: `scaleX(${this.progressWidth()})` }}></div>
        </div>
        <ul class={{ steps: true }}>
          {this.steps.map((step, index) => (
            <li
              class={`step ${this.getItemState(index)}`}
              onClick={() => {
                this.stepClicked(index);
              }}
            >
              <div class="roundle">
                {this.getItemState(index) === 'active' && <div>{index + 1}</div>}
                {this.getItemState(index) === 'completed' && <ZenIcon icon={faCheck}></ZenIcon>}
              </div>
              <div class="label" style={{ width: this.labelWidth }}>
                {step.label}
              </div>
            </li>
          ))}
        </ul>
      </Host>
    );
  }
}
