import { Component, Host, h, Prop } from '@stencil/core';
import { TextSize } from '../helpers/types';

@Component({
  tag: 'zen-text',
  styleUrl: 'zen-text.scss',
  shadow: true,
})
export class ZenText {
  /** Font size */
  @Prop({ reflect: true }) readonly size: TextSize = 'md';

  render(): HTMLElement {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
