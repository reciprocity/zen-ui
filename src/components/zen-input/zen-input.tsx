import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-input',
  styleUrl: 'zen-input.scss',
  shadow: true,
})
export class ZenInput {
  /** Label above the input */
  @Prop() label: string = null;
  /** Placeholder of the input */
  @Prop() placeholder: string = null;
  /** Supporting text below the input */
  @Prop() supportingText: string = null;
  /** Disables input */
  @Prop() disabled: boolean = false;
  /** Makes input required */
  @Prop() required: boolean = false;

  render() {
    return (
      <Host>
        <div class="input-group">
          {
          this.label ?
            <label>
              { this.label } { this.required ? <span class="required">*</span>  : '' }
              <input type="text" class="input-control with-icon" placeholder={ this.placeholder } disabled={ this.disabled } required={ this.required } />
            </label>
          :
            <input type="text" class="input-control" placeholder={ this.placeholder } disabled={ this.disabled } required={ this.required } />
          }
          { this.supportingText ? <span class="supporting-text">{ this.supportingText }</span> : null }
        </div>
      </Host>
    );
  }

}
