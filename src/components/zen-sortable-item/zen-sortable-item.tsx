import { Component, Host, h, Element } from '@stencil/core';
import { faGripVertical } from '@fortawesome/pro-solid-svg-icons';
import { applyPrefix } from '../helpers/helpers';

/**
 * @slot defaultSlot - Slot for custom content
 */
@Component({
  tag: 'zen-sortable-item',
  styleUrl: 'zen-sortable-item.scss',
  shadow: true,
})
export class ZenSortableItem {
  @Element() host: HTMLZenSortableItemElement;
  render(): HTMLElement {
    const ZenIcon = applyPrefix('zen-icon', this.host);
    return (
      <Host>
        <ZenIcon icon={faGripVertical} padding="md" size="sm" class="handle" />
        <slot></slot>
      </Host>
    );
  }
}
