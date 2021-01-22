import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-text',
  styleUrl: 'zen-text.scss',
  shadow: true,
})
export class ZenText {
  render(): HTMLElement {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
