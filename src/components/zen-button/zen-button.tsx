import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-button',
  styleUrl: 'zen-button.scss',
  shadow: true,
})
export class ZenButton {
  /** Color variant of the button */
  @Prop() variant: string = "primary";
  /** Label of the button */
  @Prop() label: string = "Button";
  /** If present, will show a spinner */
  @Prop() loading?: boolean = false;
  /** If present, button will be disabled */
  @Prop() disabled?: boolean = false;

  render() {

    const classes = {
      btn: true,
      [`btn-${this.variant}`]: true,
    };

    return (
      <Host>
        <button type="button" class={ classes } disabled={ this.disabled }>
          <span
            class={{
              'animate-visibility': true,
              invisible: this.loading
            }}
          >
            {this.label}
          </span>
          <zen-spinner
            class={{
              'animate-visibility': true,
              invisible: !this.loading
            }}
          />
        </button>
      </Host>
    );
  }
}
