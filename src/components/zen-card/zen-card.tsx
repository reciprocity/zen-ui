import { h, Component, Host, Prop } from '@stencil/core';

@Component({
  tag: 'zen-card',
  styleUrl: 'zen-card.scss',
  shadow: true,
})
export class ZenCard {
  /** Disables card. */
  @Prop({ reflect: true }) readonly disabled = false;

  render(): HTMLElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
