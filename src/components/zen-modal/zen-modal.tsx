import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-modal',
  styleUrl: 'zen-modal.scss',
  shadow: true,
})
export class ZenModal {
  render(): HTMLElement {
    return (
      <Host>
        <p>Modal</p>
      </Host>
    );
  }
}
