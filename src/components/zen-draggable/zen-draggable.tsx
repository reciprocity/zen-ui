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
    const children = Array.from(this.host.parentElement.children);
    children.forEach(child => {
      new Sortable(child, {
        animation: 150,
      });
    });
  }
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
