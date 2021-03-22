import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-skeleton',
  styleUrl: 'zen-skeleton.scss',
  shadow: true,
})
export class ZenSkeleton {
  /** Width in any CSS width unit */
  @Prop() readonly width: string = '100%';

  /** Height in any CSS height unit */
  @Prop() readonly height: string = '100%';

  /** Makes the skeleton rounded */
  @Prop({ reflect: true }) readonly isRounded: boolean = false;

  render(): HTMLElement {
    return (
      <Host style={{ width: this.width, height: this.height }}>
        <span>&nbsp;</span>
      </Host>
    );
  }
}
