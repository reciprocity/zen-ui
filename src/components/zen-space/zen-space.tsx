import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { Size, None, PaddingShorthand } from '../helpers/types';
import { parsePadding } from '../helpers/helpers';

type FlexAlign =
  | 'start'
  | 'end'
  | 'center'
  | 'baseline'
  | 'stretch'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

@Component({
  tag: 'zen-space',
  styleUrl: 'zen-space.scss',
  shadow: true,
})
export class ZenSpace {
  @State() paddingClasses = {};

  /** Is it row or column? */
  @Prop({ reflect: true }) readonly vertical: boolean = false;

  /** Width: 100% */
  @Prop({ reflect: true }) readonly stretch: boolean = false;

  /** Vertical align of items */
  @Prop({ reflect: true }) readonly verticalAlign: FlexAlign = 'center';

  /** Horizontal align of items */
  @Prop({ reflect: true }) readonly horizontalAlign: FlexAlign = 'start';

  /** Spacing between items */
  @Prop({ reflect: true }) readonly spacing: Size | None = 'none';

  /** Inner spacing of container */
  @Prop() readonly padding: PaddingShorthand = 'none';

  /** Break row/column if content doesn't fit */
  @Prop({ reflect: true }) readonly noWrap: boolean = false;

  @Watch('padding')
  spacePaddingChanged(padding: string): void {
    this.paddingClasses = parsePadding(padding);
  }

  componentDidLoad(): void {
    this.spacePaddingChanged(this.padding);
  }

  render(): HTMLElement {
    return (
      <Host class={this.paddingClasses}>
        <slot>
          <p>zen-space should not be empty</p>
        </slot>
      </Host>
    );
  }
}
