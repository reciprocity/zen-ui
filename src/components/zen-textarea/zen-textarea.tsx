import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-textarea',
  styleUrl: 'zen-textarea.scss',
  shadow: true,
})
export class ZenTextarea {
  @Prop() cols = 30;
  @Prop() rows = 5;
  @Prop() disabled = false;
  @Prop() required = false;
  @Prop() placeholder: string = null;

  render(): HTMLElement {
    return (
      <Host>
        <textarea
          class="input-control"
          cols={this.cols}
          rows={this.rows}
          placeholder={this.placeholder}
          disabled={this.disabled}
          required={this.required}
        ></textarea>
      </Host>
    );
  }
}
