import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-date-picker',
  styleUrl: 'zen-date-picker.scss',
  shadow: true,
})
export class ZenDatePicker {
  render(): HTMLElement {
    return <Host>Date picker</Host>;
  }
}
