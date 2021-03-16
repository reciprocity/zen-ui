import { Component, Host, h, Element, Prop, Listen } from '@stencil/core';
import Sortable from 'sortablejs';
import { applyPrefix } from '../helpers/helpers';
import { faGripVertical } from '@fortawesome/pro-solid-svg-icons';
import { PaddingShorthand, SortableData } from '../helpers/types';

@Component({
  tag: 'zen-sortable',
  styleUrl: 'zen-sortable.scss',
  shadow: true,
})
export class ZenSortable {
  @Element() host: HTMLZenSortableElement;

  /** Array of sortable items */
  @Prop() readonly data: SortableData[] = [];

  /** Container padding */
  @Prop() readonly padding: PaddingShorthand = 'md';

  /** Container item spacing */
  @Prop() readonly spacing: PaddingShorthand = 'md';

  @Listen('onUpdate')
  update(evt: any): void {
    console.log('Item position changed', evt);
  }

  componentDidLoad(): void {
    const host = this.host;
    Sortable.create(this.host.shadowRoot.firstElementChild, {
      animation: 150,
      ghostClass: 'ghost',
      handle: '.handle',
      onUpdate: function (evt) {
        host.dispatchEvent(new window.Event('onUpdate', evt));
      },
    });
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
