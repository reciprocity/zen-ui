import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-input',
  styleUrl: 'zen-input.scss',
  shadow: true,
})
export class ZenInput {
  /** Placeholder of the input */
  @Prop() placeholder: string = null;

  /** Disables input */
  @Prop() disabled = false;

  /** Makes input required */
  @Prop() required = false;

  render(): HTMLElement {
    return (
      <Host>
        <input
          type="text"
          class="input-control"
          placeholder={this.placeholder}
          disabled={this.disabled}
          required={this.required}
        />
      </Host>
    );
  }
}
