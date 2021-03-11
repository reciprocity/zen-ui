import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-skeleton-text',
  styleUrl: 'zen-skeleton-text.css',
  shadow: true,
})
export class ZenSkeletonText {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
