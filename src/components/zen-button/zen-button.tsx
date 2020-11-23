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
        <button type="button" class="btn btn-primary">Example</button>
      </Host>
    );
  }

}
