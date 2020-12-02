import { Component, Host, h, Prop, Watch } from '@stencil/core';

export interface ColorSwatchItem {
  hex: string;
  varName: string;
  isBrightColor: boolean;
}

export type StringifiedJson = string;

@Component({
  tag: 'color-swatch-group',
  styleUrl: 'color-swatch-group.scss',
  shadow: false,
})
export class ColorSwatchGroup {
  private _colors: ColorSwatchItem[];
  @Prop() colors: StringifiedJson = '[]';

  @Watch('colors')
  colorsToArray(colors: ColorSwatchItem[] | string): ColorSwatchItem[] {
    return typeof colors === 'string' ? (this._colors = JSON.parse(colors)) : (this._colors = colors);
  }

  componentWillLoad(): void {
    this.colorsToArray(this.colors);
  }

  render(): HTMLElement {
    return (
      <Host class="color-swatch-group">
        {this._colors.map(color => (
          <color-swatch
            key={color.varName}
            var-name={color.varName}
            color={color.hex}
            is-bright-color={color.isBrightColor}
          ></color-swatch>
        ))}
      </Host>
    );
  }
}
