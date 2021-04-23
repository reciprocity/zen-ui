import { Component, Host, h, Element, Prop } from '@stencil/core';
import Sortable from 'sortablejs';
import { applyPrefix } from '../helpers/helpers';
import { SpacingShorthand, Size, None } from '../helpers/types';

/**
 * @slot defaultSlot - Slot for ex. zen-sortable-item with possibility to set padding and spacing
 */
@Component({
  tag: 'zen-sortable',
  styleUrl: 'zen-sortable.scss',
  shadow: true,
})
export class ZenSortable {
  @Element() host: HTMLZenSortableElement;

  /** Container padding */
  @Prop() readonly padding: SpacingShorthand = 'none';

  /** Container item spacing */
  @Prop() readonly spacing: Size | None = 'none';

  hasItemDataId(): boolean {
    return Array.from(this.host.children).every(item => item.hasAttribute('data-id'));
  }

  componentDidLoad(): void {
    if (this.hasItemDataId()) {
      Sortable.create(this.host, {
        animation: 150,
        handle: '.handle',
        onEnd: function (evt) {
          evt.stopPropagation();
          evt.target.dispatchEvent(new CustomEvent('zenChange', { detail: this.toArray() }));
        },
      });
    } else {
      console.error("The property 'data-id' was not set for one of the slotted items!");
    }
  }
  render(): HTMLElement {
    const ZenSpace = applyPrefix('zen-space', this.host);
    return (
      <Host>
        <ZenSpace vertical padding={this.padding} spacing={this.spacing}>
          <slot></slot>
        </ZenSpace>
      </Host>
    );
  }
}
