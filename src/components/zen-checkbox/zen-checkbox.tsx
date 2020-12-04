import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-checkbox',
  styleUrl: 'zen-checkbox.scss',
  shadow: true,
})
export class ZenCheckbox {
  /**
   * Set checked state.
   */
  @Prop() readonly checked = false;

  /**
   * Disables checkbox.
   */
  @Prop() readonly disabled = false;

  render(): HTMLElement {
    return (
      <Host>
        <input type="checkbox" class="input-control" disabled={this.disabled} checked={this.checked} />
      </Host>
    );
  }
}
