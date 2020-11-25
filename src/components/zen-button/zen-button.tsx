import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-button',
  styleUrl: 'zen-button.scss',
  shadow: true,
})
export class ZenButton {
  @Prop() variant: string = "primary";
  @Prop() label: string = "Button";
  @Prop() loading?: boolean;
  @Prop() disabled?: boolean;

  render() {

    const classes = {
      btn: true,
      [`btn-${this.variant}`]: true,
      disabled: this.disabled,
    };

    return (
      <Host>
        <button type="button" class={ classes } disabled={this.disabled}>{ this.label }</button>
      </Host>
    );
  }

}
