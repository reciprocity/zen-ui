import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-input-support-text',
  styleUrl: 'zen-input-support-text.scss',
  shadow: true,
})
export class ZenInputSupportText {
  /** Supporting text */
  @Prop() text: string = null;

  render() {
    return <span class="supporting-text">{this.text}</span>;
  }
}
