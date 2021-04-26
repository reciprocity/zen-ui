import { Component, Host, h, Prop } from '@stencil/core';
import { TextSize, TextVariant, TextState, Align } from '../helpers/types';

@Component({
  tag: 'zen-text',
  styleUrl: 'zen-text.scss',
  shadow: true,
})
export class ZenText {
  /** Font size */
  @Prop({ reflect: true }) readonly size: TextSize = 'md';

  /** Apply heading styles */
  @Prop({ reflect: true }) readonly variant: TextVariant = null;

  /** State text style */
  @Prop({ reflect: true }) readonly state: TextState = null;

  /** Render bold text */
  @Prop({ reflect: true }) readonly bold: boolean = false;

  /** Render italic text */
  @Prop({ reflect: true }) readonly italic: boolean = false;

  /** Convert casing to uppercase */
  @Prop({ reflect: true }) readonly uppercase: boolean = false;

  /** Convert casing to lowercase */
  @Prop({ reflect: true }) readonly lowercase: boolean = false;

  /** Layout as inlined */
  @Prop({ reflect: true }) readonly inline: boolean = false;

  /** Strikethrough */
  @Prop({ reflect: true }) readonly strikethrough: boolean = false;

  /** Underlined */
  @Prop({ reflect: true }) readonly underline: boolean = false;

  /** Align content to left, right, center (text-align) */
  @Prop({ reflect: true }) readonly align: Align = 'left';

  /** Truncate */
  @Prop({ reflect: true }) readonly truncate: boolean = false;

  /** Show text as gray. Useful for disabled things */
  @Prop({ reflect: true }) readonly pale: boolean = false;

  /** Disabled */
  @Prop({ reflect: true }) readonly disabled: boolean = false;

  /** Shows a red asterisk at the end */
  @Prop({ reflect: true }) readonly required: boolean = false;

  render(): HTMLElement {
    return (
      <Host>
        <slot />
        {this.required ? <span class="required">*</span> : null}
      </Host>
    );
  }
}
