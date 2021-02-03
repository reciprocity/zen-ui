import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-radio',
  styleUrl: 'zen-radio.scss',
  shadow: true,
})
export class ZenRadio {
  render(): HTMLElement {
    return <Host>radio</Host>;
  }
}
