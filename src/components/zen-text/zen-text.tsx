import { Component, Host, h, Prop } from '@stencil/core';
import { TextSize, Align } from '../helpers/types';

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

  /** Render bold text */
  @Prop({ reflect: true }) readonly bold = false;

  /** Render italic text */
  @Prop({ reflect: true }) readonly italic = false;

  /** Convert casing to uppercase */
  @Prop({ reflect: true }) readonly uppercase = false;

  /** Convert casing to lowercase */
  @Prop({ reflect: true }) readonly lowercase = false;

  /** Layout as inlined */
  @Prop({ reflect: true }) readonly inline = false;

  /** Strikethrough */
  @Prop({ reflect: true }) readonly strikethrough = false;

  /** Underlined */
  @Prop({ reflect: true }) readonly underline = false;

  /** Underlined */
  @Prop({ reflect: true }) readonly align: Align = 'left';

  /** truncate */
  @Prop({ reflect: true }) readonly truncate = false;

  /** pale */
  @Prop({ reflect: true }) readonly pale = false;

  render(): HTMLElement {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
