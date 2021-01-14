import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-spinner',
  styleUrl: 'zen-spinner.scss',
  shadow: true,
})
export class ZenSpinner {
  render(): HTMLElement {
    return (
      <Host>
        <span class="spinner"></span>
      </Host>
    );
  }
}
