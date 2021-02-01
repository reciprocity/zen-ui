import { h, Component, Host, Prop } from '@stencil/core';

@Component({
  tag: 'zen-card',
  styleUrl: 'zen-card.scss',
  shadow: true,
})
export class ZenCard {
  /** Disables card. */
  @Prop() readonly disabled = false;

  render(): HTMLElement {
    return (
      <Host class={{ disabled: this.disabled }}>
        <slot></slot>
      </Host>
    );
  }
}
