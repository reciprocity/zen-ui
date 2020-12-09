import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-form-group',
  styleUrl: 'zen-form-group.scss',
  shadow: true,
})
export class ZenFormGroup {
  render(): HTMLElement {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
