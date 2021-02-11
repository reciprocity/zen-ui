import { Component, Host, h, Element } from '@stencil/core';
import tippy from 'tippy.js';
import { getDefaultSlotContent, getSlotElement } from '../helpers/helpers';

@Component({
  tag: 'zen-popover',
  styleUrl: 'zen-popover.scss',
  shadow: true,
})
export class ZenPopover {
  @Element() element: HTMLZenPopoverElement;

  componentDidLoad() {
    const target = getSlotElement(this.element, 'target');
    const slot = getDefaultSlotContent(this.element)[0];

    tippy(target, {
      content: slot,
      placement: 'bottom-end',
      hideOnClick: true,
      interactive: true,
      interactiveDebounce: 40000,
    });

    console.log(slot);
    console.log(target);
  }

  render(): HTMLElement {
    return (
      <Host>
        <slot name="target"></slot>
        <slot />
      </Host>
    );
  }
}
