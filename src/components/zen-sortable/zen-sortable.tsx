import { Component, Host, h, Element, Prop } from '@stencil/core';
import Sortable from 'sortablejs';
import { applyPrefix } from '../helpers/helpers';
import { faGripVertical } from '@fortawesome/pro-solid-svg-icons';
import { PaddingShorthand } from '../helpers/types';

@Component({
  tag: 'zen-sortable',
  styleUrl: 'zen-sortable.scss',
  shadow: true,
})
export class ZenSortable {
  @Element() host: HTMLZenSortableElement;

  /** Array of sortable items */
  @Prop() readonly data: Sortable[] = [];

  /** Container padding */
  @Prop() readonly padding: PaddingShorthand = 'md';

  /** Container item spacing */
  @Prop() readonly spacing: PaddingShorthand = 'md';

  componentDidLoad(): void {
    Sortable.create(this.host.shadowRoot.firstElementChild, { animation: 150, handle: '.handle' });
  }
  render(): HTMLElement {
    const ZenSpace = applyPrefix('zen-space', this.host);
    const ZenToggle = applyPrefix('zen-toggle', this.host);
    const ZenIcon = applyPrefix('zen-icon', this.host);
    const ZenText = applyPrefix('zen-text', this.host);
    return (
      <Host>
        <ZenSpace vertical spacing={this.spacing} padding={this.padding}>
          {this.data.map(item => (
            <ZenSpace class="item" padding="md" horizontal-align="space-between" vertical-align="top">
              <ZenSpace spacing="md">
                <ZenIcon icon={faGripVertical} size="sm" class="handle"></ZenIcon>
                <ZenText>{item.name}</ZenText>
              </ZenSpace>
              <ZenToggle checked={item.selected}></ZenToggle>
            </ZenSpace>
          ))}
        </ZenSpace>
      </Host>
    );
  }
}
