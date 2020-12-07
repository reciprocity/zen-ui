import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-textarea',
  styleUrl: 'zen-textarea.scss',
  shadow: true,
})
export class ZenTextarea {
  /**
   * Columns of the textarea.
   */
  @Prop() readonly cols = 30;

  /**
   * Rows of the textarea.
   */
  @Prop() readonly rows = 5;

  /**
   * Makes textarea disabled.
   */
  @Prop() readonly disabled = false;

  /**
   * Makes textarea required.
   */
  @Prop() readonly required = false;

  /**
   * Placeholder of the textarea.
   */
  @Prop() readonly placeholder: string = null;

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
