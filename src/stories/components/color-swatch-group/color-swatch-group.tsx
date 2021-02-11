import { Component, Host, h, Prop, Watch, Element } from '@stencil/core';
import { applyPrefix } from 'src/components/helpers/helpers';

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
  @Element() hostElement: HTMLColorSwatchGroupElement;

  private _colors: ColorSwatchItem[];

  /** Array of colors */
  @Prop() readonly colors: StringifiedJson = '[]';

  @Watch('colors')
  colorsToArray(colors: ColorSwatchItem[] | string): ColorSwatchItem[] {
    return typeof colors === 'string' ? (this._colors = JSON.parse(colors)) : (this._colors = colors);
  }

  componentWillLoad(): void {
    this.colorsToArray(this.colors);
  }

  render(): HTMLElement {
    const ColorSwatch = applyPrefix('color-swatch', this.hostElement);
    return (
      <Host class="color-swatch-group">
        {this._colors.map(color => (
          <ColorSwatch
            key={color.varName}
            var-name={color.varName}
            color={color.hex}
            is-bright-color={color.isBrightColor}
          ></ColorSwatch>
        ))}
      </Host>
    );
  }
}
