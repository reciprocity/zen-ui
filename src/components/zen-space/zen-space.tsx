import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-space',
  styleUrl: 'zen-space.scss',
  shadow: true,
})
export class ZenSpace {
  /** Is it row or column? */
  @Prop({ reflect: true }) readonly vertical: boolean = false;
  render(): HTMLElement {
    return (
      <Host>
        <slot>
          <p>zen-space should not be empty</p>
        </slot>
      </Host>
    );
  }
}
