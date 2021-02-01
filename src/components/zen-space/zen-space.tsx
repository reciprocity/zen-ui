import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-space',
  styleUrl: 'zen-space.scss',
  shadow: true,
})
export class ZenSpace {
  render(): HTMLElement {
    return <Host>space</Host>;
  }
}
