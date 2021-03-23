import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-skeleton',
  styleUrl: 'zen-skeleton.scss',
  shadow: true,
})
export class ZenSkeleton {
  /** Makes the skeleton rounded */
  @Prop({ reflect: true }) readonly rounded: boolean = false;

  render(): HTMLElement {
    return (
      <Host>
        <span>&nbsp;</span>
      </Host>
    );
  }
}
