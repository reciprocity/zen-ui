import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-skeleton-circle',
  styleUrl: 'zen-skeleton-circle.css',
  shadow: true,
})
export class ZenSkeletonCircle {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
