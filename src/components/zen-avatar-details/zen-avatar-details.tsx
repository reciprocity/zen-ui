import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-avatar-details',
  styleUrl: 'zen-avatar-details.scss',
  shadow: true,
})
export class ZenAvatarDetails {
  render(): HTMLElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
