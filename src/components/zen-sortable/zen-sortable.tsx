import { Component, Host, h, Element, Prop, Listen } from '@stencil/core';
import Sortable from 'sortablejs';
import { applyPrefix } from '../helpers/helpers';
import { PaddingShorthand } from '../helpers/types';

/**
 * @slot defaultSlot - Slot for ex. zen-sortable-item with possibility to set padding and spacing
 * @event update | Called on any selection change
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

  @Listen('onUpdate')
  update(evt: any): void {
    console.log('Item position changed', evt);
  }

  componentDidLoad(): void {
    const host = this.host;
    Sortable.create(this.host, {
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
    return (
      <Host>
        <ZenSpace vertical padding={this.padding} spacing={this.spacing}>
          <slot></slot>
        </ZenSpace>
      </Host>
    );
  }
}
