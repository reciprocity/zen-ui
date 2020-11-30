import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-spinner',
  styleUrl: 'zen-spinner.scss',
  shadow: true,
})
export class ZenSpinner {

  /** Color of the spinner. Accepts any CSS Legal Color Value. */
  @Prop() color: string = null;

  render() {

    return (
      <Host>
        <span class="spinner" style={{ color: this.color }}></span>
      </Host>
    );
  }
}
