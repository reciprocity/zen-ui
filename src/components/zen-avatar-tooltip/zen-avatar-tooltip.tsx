import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-avatar-tooltip',
  styleUrl: 'zen-avatar-tooltip.scss',
  shadow: true,
})
export class ZenAvatarTooltip {
  /** Users  */
  @Prop() readonly user: Record<string, any> = [];

  render() {
    return (
      <Host>
        <div class="row">
          <avatar-icon size="md" user-name="KA" />
          <div class="column">
            <span class="tooltip-title">Kim Anderson</span>
            <p class="tooltip-code">kim.anderson@reciprocitylabs.com</p>
            <p class="tooltip-role">administrator</p>
          </div>
        </div>
      </Host>
    );
  }
}
