import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'zen-input-label',
  styleUrl: 'zen-input-label.scss',
  shadow: true,
})
export class ZenInputLabel {
  /** Text of the label */
  @Prop() readonly text: string = null;

  /** Shows a red asterisk after label */
  @Prop() readonly required = false;

  render(): HTMLElement {
    return (
      <Host>
        <label>
          {this.text}
          {this.required ? <span class="required">*</span> : null}
        </label>
      </Host>
    );
  }
}
