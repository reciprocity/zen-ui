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

  /** Apply heading styles */
  @Prop({ reflect: true }) readonly heading = false;

  render(): HTMLElement {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
