import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-checkbox',
  styleUrl: 'zen-checkbox.scss',
  shadow: true,
})
export class ZenCheckbox {
  @Prop() checked = false;
  @Prop() disabled = false;

  render(): HTMLElement {
    return (
      <Host>
        <input type="checkbox" class="input-control" checked={this.checked} disabled={this.disabled} />
      </Host>
    );
  }
}
