import { Component, Host, h, Element } from '@stencil/core';
import Sortable from 'sortablejs';

@Component({
  tag: 'zen-draggable',
  styleUrl: 'zen-draggable.scss',
  shadow: true,
})
export class ZenDraggable {
  @Element() host: HTMLZenDraggableElement;

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
