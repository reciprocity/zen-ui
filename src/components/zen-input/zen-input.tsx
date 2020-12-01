import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-input',
  styleUrl: 'zen-input.scss',
})
export class ZenInput {

  /** Placeholder of the input */
  @Prop() placeholder: string = null;

  /** Disables input */
  @Prop() disabled: boolean = false;

  /** Makes input required */
  @Prop() required: boolean = false;

  render() {
    return (
      <Host>
        <input type="text" class="input-control" placeholder={ this.placeholder } disabled={ this.disabled } required={ this.required } />
      </Host>
    );
  }

}
