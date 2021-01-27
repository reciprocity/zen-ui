import { Component, h, Prop, Watch, State, Element } from '@stencil/core';
import { waitNextFrame, getDefaultSlotContent } from '../helpers/helpers';

@Component({
  tag: 'zen-animate',
  shadow: true,
})
export class ZenAnimate {
  hideTimer = undefined;

  @Element() hostElement: HTMLZenAnimateElement;

  @State() doShow = false;

  /** Prop that will show the slot */
  @Prop() readonly show: boolean = false;

  @Watch('show')
  async showChanged(show: boolean): Promise<void> {
    clearTimeout(this.hideTimer);
    if (show) {
      this.doShow = true; //  if false, set it with a delay
    }
  }

  async componentDidRender(): Promise<void> {
    let slot = getDefaultSlotContent(this.hostElement);

    if (!slot.length && this.show) {
      this.doShow = true;
      await waitNextFrame();
      slot = getDefaultSlotContent(this.hostElement);
    }

    if (!slot.length) return;

    slot.forEach(element => {
      element.setAttribute('animate', this.show ? 'in-start' : 'out-start');
    });

    await waitNextFrame();

    slot.forEach(element => {
      element.setAttribute('animate', this.show ? 'in-end' : 'out-end');
    });

    if (!this.show) {
      // Remove element with delay, so transition finishes first:
      const transition = parseFloat(getComputedStyle(slot[0])['transitionDuration']) * 1000;

      this.hideTimer = setTimeout(() => {
        this.doShow = false;
      }, transition);
    }
  }

  render(): HTMLElement {
    return <div>{this.doShow ? <slot /> : ''}</div>;
  }
}
