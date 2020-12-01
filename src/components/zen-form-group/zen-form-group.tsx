import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-form-group',
  styleUrl: 'zen-form-group.scss',
})
export class ZenFormGroup {

  render() {
    return (
      <Host>
        <div class="input-group">
          <slot />
        </div>
      </Host>
    );
  }

}
