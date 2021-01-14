import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'zen-input-support-text',
  styleUrl: 'zen-input-support-text.scss',
  shadow: true,
})
export class ZenInputSupportText {
  /** Supporting text */
  @Prop() readonly text: string = '';

  render(): HTMLElement {
    return (
      <Host>
        <span class="supporting-text">{this.text}</span>
      </Host>
    );
  }
}
