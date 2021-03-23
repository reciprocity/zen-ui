import { Component, Host, h, Element, Prop } from '@stencil/core';
import { faGripVertical } from '@fortawesome/pro-solid-svg-icons';
import { applyPrefix } from '../helpers/helpers';
import { PaddingShorthand } from '../helpers/types';

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

  /** Container padding */
  @Prop() readonly padding: PaddingShorthand = 'none';

  render(): HTMLElement {
    const ZenIcon = applyPrefix('zen-icon', this.host);
    const ZenSpace = applyPrefix('zen-space', this.host);
    return (
      <Host>
        <ZenSpace padding={this.padding}>
          <ZenIcon icon={faGripVertical} padding="md" size="sm" class="handle" />
          <slot></slot>
        </ZenSpace>
      </Host>
    );
  }
}
