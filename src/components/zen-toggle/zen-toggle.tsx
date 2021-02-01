import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-toggle',
  styleUrl: 'zen-toggle.css',
  shadow: true,
})
export class ZenToggle {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
