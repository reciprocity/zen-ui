import { Component, Host, h, Prop } from '@stencil/core';

export interface OptionItem {
  label: string
}

@Component({
  tag: 'color-swatch',
  styleUrl: 'color-swatch.scss',
  shadow: false,
})

export class ColorSwatch {

  @Prop() color: string = '#ffffff';
  @Prop() varName: string = '$color-white';
  /** True if color is considered bright */
  @Prop() isBrightColor: boolean = false;

  render() {
    return (
      <Host class="color-swatch">
        <div class="swatch" style={{'backgroundColor': this.color}}>
          <span class={{'hex-label': true, 'white': !this.isBrightColor}}>
            {this.color.toUpperCase()}
          </span>
        </div>
        <div class="swatch-name">{ this.varName }</div>
      </Host>
    );
  }

}
