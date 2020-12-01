import { Component, h, Prop, Watch, State } from '@stencil/core';
import { waitNextFrame } from '../helpers/helpers';

@Component({
  tag: 'zen-animate',
  shadow: true,
})
export class ZenAnimate {
  div: HTMLElement = undefined;
  hideTimer = undefined;

  @State() doShow = false;

  @Prop() show = false;

  @Watch('show')
  async showChanged(show: boolean): Promise<void> {
    clearTimeout(this.hideTimer);
    if (show) {
      this.doShow = true; //  if false, set it with a delay
    }
  }

  async componentDidRender(): Promise<void> {
    const parent = this.div.querySelector('slot');
    const slot = parent && (parent.assignedNodes()[0] as HTMLElement);
    if (!slot) return;

    slot.setAttribute('animate', this.show ? 'in-start' : 'out-start');

    await waitNextFrame();

    slot.setAttribute('animate', this.show ? 'in-end' : 'out-end');

    if (!this.show) {
      // Remove element with delay, so transition finishes first:
      const transition = parseFloat(getComputedStyle(slot)['transitionDuration']) * 1000;
      this.hideTimer = setTimeout(() => {
        this.doShow = false;
      }, transition);
    }
  }

  render(): HTMLElement {
    return <div ref={el => (this.div = el)}>{this.doShow ? <slot /> : ''}</div>;
  }
}
