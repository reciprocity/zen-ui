import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-button',
  styleUrl: 'zen-button.scss',
  shadow: true,
})
export class ZenButton {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
