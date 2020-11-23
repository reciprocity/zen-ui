import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-button',
  styleUrl: 'zen-button.scss',
  shadow: true,
})
export class ZenButton {
  @Prop() variant: string = "primary";
  @Prop() text: string = "Button";
  @Prop() isLoading?: boolean;
  @Prop() isDisabled?: boolean;

  render() {

    const classes = {
      btn: true,
    };
    
    classes[`btn-${this.variant}`] = true;

    if (this.isDisabled) {
      classes['disabled'] = true;
    }

    return (
      <Host>
        <button type="button" class={ classes }>{ this.text }</button>
      </Host>
    );
  }

}
