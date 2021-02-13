import { Component, Host, h, Element, Prop } from '@stencil/core';
import { createPopper, Placement, Offsets } from '@popperjs/core';
import { getDefaultSlotContent, getSlotElement } from '../helpers/helpers';

@Component({
  tag: 'zen-popover',
  styleUrl: 'zen-popover.scss',
  shadow: true,
})
export class ZenPopover {
  @Element() element: HTMLZenPopoverElement;

  /** Placement */
  @Prop() readonly placement: Placement = 'bottom-end';

  /** Placement */
  @Prop() readonly offset: Offsets = { x: 0, y: 8 };

  componentDidLoad() {
    const target = getSlotElement(this.element, 'target');
    const content = getDefaultSlotContent(this.element)[0] as HTMLElement;

    const popper = createPopper(target, content, {
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

    window.addEventListener('click', event => {
      const targetNode = event.target as Node;

      if (content.contains(targetNode)) {
        return;
      } else if (targetNode === target) {
        this.show(popper, content);
      } else {
        this.hide(content);
      }
    });

    this.hide(content);
  }

  show(popper, element: HTMLElement): void {
    element.style.display = 'block';
    popper.forceUpdate();
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
