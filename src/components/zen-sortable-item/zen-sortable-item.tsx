import { Component, Host, h, Element } from '@stencil/core';
import { faGripVertical } from '@fortawesome/pro-solid-svg-icons';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-sortable-item',
  styleUrl: 'zen-sortable-item.scss',
  shadow: true,
})
export class ZenSortableItem {
  @Element() host: HTMLZenSortableItemElement;
  render(): HTMLElement {
    const ZenSpace = applyPrefix('zen-space', this.host);
    const ZenIcon = applyPrefix('zen-icon', this.host);
    return (
      <Host>
        <ZenSpace class="item" horizontal-align="start" vertical-align="center">
          <ZenIcon icon={faGripVertical} size="sm" class="handle" />
          <slot></slot>
        </ZenSpace>
      </Host>
    );
  }
}
