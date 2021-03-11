import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-skeleton',
  styleUrl: 'zen-skeleton.scss',
  shadow: true,
})
export class ZenSkeleton {
  /** Width in rem */
  @Prop() readonly width: string = '10';

  /** Height in rem */
  @Prop() readonly height: string = '1';

  render(): HTMLElement {
    return (
      <Host style={{ width: this.width, height: this.height }}>
        <span>&nbsp;</span>
      </Host>
    );
  }
}
