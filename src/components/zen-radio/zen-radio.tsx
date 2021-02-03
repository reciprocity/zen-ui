import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-radio',
  styleUrl: 'zen-radio.scss',
  shadow: true,
})
export class ZenRadio {
  /** Shows a red asterisk after label. */
  @Prop() readonly required = false;

  render(): HTMLElement {
    return (
      <Host>
        <input type="radio" class="input-control" id="radio" />
        <label htmlFor="radio">
          <slot />
        </label>
        {this.required ? <span class="required">*</span> : null}
      </Host>
    );
  }
}
