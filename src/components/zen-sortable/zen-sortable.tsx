import { Component, Host, h, Element, Prop } from '@stencil/core';
import Sortable from 'sortablejs';
import { applyPrefix, getDefaultSlotContent } from '../helpers/helpers';
import { PaddingShorthand } from '../helpers/types';

/**
 * @slot defaultSlot - Slot for ex. zen-sortable-item with possibility to set padding and spacing
 * @event onChange | Called on any selection change and returns a list of ids.
 */
@Component({
  tag: 'zen-sortable',
  styleUrl: 'zen-sortable.scss',
  shadow: true,
})
export class ZenSortable {
  @Element() host: HTMLZenSortableElement;

  /** Container padding */
  @Prop() readonly padding: PaddingShorthand = 'none';

  /** Container item spacing */
  @Prop() readonly spacing: PaddingShorthand = 'none';

  getKeys(): string[] {
    return Array.from(getDefaultSlotContent(this.host)).map((item: HTMLZenSortableItemElement) =>
      item.getAttribute('key'),
    );
  }

  componentDidLoad(): void {
    Sortable.create(this.host, {
      animation: 150,
      handle: '.handle',
      onUpdate: evt => {
        evt.stopPropagation();
        this.host.dispatchEvent(new CustomEvent('change', { detail: this.getKeys() }));
      },
    });
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
