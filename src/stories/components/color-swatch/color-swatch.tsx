import { Component, Host, h, Prop } from '@stencil/core';

export interface OptionItem {
  label: string;
}

@Component({
  tag: 'color-swatch',
  styleUrl: 'color-swatch.scss',
  shadow: false,
})
export class ColorSwatch {
  /** Hex color value */
  @Prop() readonly color: string = '#ffffff';
  /** Scss variable name */
  @Prop() readonly varName: string = '$color-white';
  /** True if color is considered bright */
  @Prop() readonly isBrightColor: boolean = false;

  render(): HTMLElement {
    return (
      <Host class="color-swatch">
        <div class="swatch" style={{ backgroundColor: this.color }}>
          <span class={{ 'hex-label': true, white: !this.isBrightColor }}>{this.color.toUpperCase()}</span>
        </div>
        <div class="swatch-name">{this.varName}</div>
      </Host>
    );
  }
}
