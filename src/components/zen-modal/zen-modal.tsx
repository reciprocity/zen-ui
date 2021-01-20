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
        <div class="dimmer"></div>
        <div class="window">
          <div class="content">
            <slot>Content</slot>
          </div>
          <div class="buttons">
            <zen-button>Close</zen-button>
          </div>
        </div>
      </Host>
    );
  }
}
