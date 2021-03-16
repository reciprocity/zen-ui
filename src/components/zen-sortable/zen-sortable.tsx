import { Component, Host, h, Element } from '@stencil/core';
import Sortable from 'sortablejs';

@Component({
  tag: 'zen-sortable',
  styleUrl: 'zen-sortable.scss',
  shadow: true,
})
export class ZenSortable {
  @Element() host: HTMLZenSortableElement;

  componentDidLoad(): void {
    Sortable.create(this.host, { animation: 150 });
  }
  render(): HTMLElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
