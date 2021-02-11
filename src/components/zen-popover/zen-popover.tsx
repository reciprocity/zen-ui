import { Component, Host, h, Element, Prop } from '@stencil/core';
import { createPopper, Placement } from '@popperjs/core';
import { getDefaultSlotContent, getSlotElement } from '../helpers/helpers';

@Component({
  tag: 'zen-popover',
  styleUrl: 'zen-popover.scss',
  shadow: true,
})
export class ZenPopover {
  @Element() element: HTMLZenPopoverElement;

  /** Placement */
  @Prop() readonly placement: Placement = 'auto';

  componentDidLoad() {
    const target = getSlotElement(this.element, 'target');
    const content = getDefaultSlotContent(this.element)[0] as HTMLElement;

    createPopper(target, content, {
      placement: this.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    });

    target.addEventListener('click', () => {
      this.show(content);
    });

    content.addEventListener('mouseleave', () => {
      this.hide(content);
    });
  }

  show(element: HTMLElement): void {
    element.style.display = 'block';
  }

  hide(element: HTMLElement): void {
    element.style.display = 'none';
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
