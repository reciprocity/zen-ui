import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-badge',
  styleUrl: 'zen-badge.scss',
  shadow: true,
})
export class ZenBadge {
  /** Badge value (null to not display it) */
  @Prop() readonly value: string | null = null;

  render(): HTMLZenBadgeElement {
    return (
      <Host class={{ hidden: this.value == null }}>
        <slot>{this.value}</slot>
      </Host>
    );
  }
}
