import { Component, Host, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'zen-icon',
  styleUrl: 'zen-icon.scss',
  shadow: true,
})
export class ZenIcon {
  @Element() hostElement: HTMLZenIconElement;

  /** Size of the icon. */
  @Prop() readonly size: string = '';

  render(): HTMLElement {
    return (
      <Host class={{ lg: this.size === 'lg' }}>
        <slot></slot>
      </Host>
    );
  }
}
