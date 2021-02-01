import { Component, Host, h, Prop } from '@stencil/core';
import { Size, None } from '../helpers/types';

@Component({
  tag: 'zen-space',
  styleUrl: 'zen-space.scss',
  shadow: true,
})
export class ZenSpace {
  /** Is it row or column? */
  @Prop({ reflect: true }) readonly vertical: boolean = false;

  /** Spacing between items */
  @Prop({ reflect: true }) readonly spacing: Size | None = 'sm';
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
