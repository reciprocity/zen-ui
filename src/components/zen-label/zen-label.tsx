import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'zen-label',
  styleUrl: 'zen-label.scss',
  shadow: true,
})
export class ZenLabel {
  /** Text of the label */
  @Prop() readonly label: string = 'Label';

  /** Shows a red asterisk after label */
  @Prop() readonly required = false;

  render(): HTMLElement {
    return (
      <Host>
        <label>
          {this.label}
          {this.required ? <span class="required">*</span> : null}
        </label>
      </Host>
    );
  }
}
