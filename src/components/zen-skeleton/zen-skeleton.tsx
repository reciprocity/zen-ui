import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-skeleton',
  styleUrl: 'zen-skeleton.css',
  shadow: true,
})
export class ZenSkeleton {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
