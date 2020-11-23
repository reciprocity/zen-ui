import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-button',
  styleUrl: 'zen-button.scss',
  shadow: true,
})
export class ZenButton {
  @Prop() variant: string = "primary";
  @Prop() text: string = "Example text";
  @Prop() outline: boolean = false;
  @Prop() isLoading?: boolean;
  @Prop() isDisabled?: boolean;

  render() {

    const classes = {
      btn: true,
    };

    if (this.outline) {
      classes[`btn-outline-${this.variant}`] = true;
    } else {
      classes[`btn-${this.variant}`] = true;
    }

    return (
      <Host>
        <button type="button" class={ classes }>{ this.text }</button>
      </Host>
    );
  }

}
