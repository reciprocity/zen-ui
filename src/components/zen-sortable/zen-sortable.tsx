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
    const ids = [];
    Array.from(getDefaultSlotContent(this.host)).forEach(item => {
      const sortableItem = item as HTMLZenSortableItemElement;
      ids.push(sortableItem.getAttribute('key'));
    });
    return ids;
  }

  componentDidLoad(): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    Sortable.create(this.host, {
      animation: 150,
      handle: '.handle',
      onUpdate: function () {
        const onChange = new CustomEvent('onChange', { detail: self.getKeys() });
        self.host.dispatchEvent(onChange);
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
