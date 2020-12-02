import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-input-label',
  styleUrl: 'zen-input-label.scss',
})
export class ZenInputLabel {
  /** Text of the label */
  @Prop() text: string = null;
  @Prop() required = false;

  render() {
    return (
      <label>
        {this.text} {this.required ? <span class="required">*</span> : null}
      </label>
    );
  }
}
