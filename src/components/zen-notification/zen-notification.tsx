import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-notification',
  styleUrl: 'zen-notification.scss',
  shadow: true,
})
export class ZenNotification {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
