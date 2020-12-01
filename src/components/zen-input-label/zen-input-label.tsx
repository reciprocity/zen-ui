import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-input-label',
  styleUrl: 'zen-input-label.scss',
})
export class ZenInputLabel {

  /** Text of the label */
  @Prop() text: string = null;

  render() {
    return (
        <label> { this.text } </label>
    );
  }

}
