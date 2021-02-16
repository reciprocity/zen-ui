import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { Size, None } from '../helpers/types';

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
  @Prop({ reflect: true }) readonly spacing: Size | None = 'sm';

  /** Inner spacing of container */
  @Prop() readonly padding: Size | None | string = 'sm';

  /** Break row/column if content doesn't fit */
  @Prop({ reflect: true }) readonly noWrap: boolean = false;

  @Watch('padding')
  async paddingChanged(padding: string): Promise<void> {
    // Support padding shorthands (eg. padding: 12px 1rem 5rem;)
    const values = padding.split(' ');
    switch (values.length) {
      case 1:
        this.paddingClasses = {
          [`padding-${values[0]}`]: true,
        };
        break;

      case 2:
        this.paddingClasses = {
          [`padding-y-${values[0]}`]: true,
          [`padding-x-${values[1]}`]: true,
        };
        break;

      case 3:
        this.paddingClasses = {
          [`padding-top-${values[0]}`]: true,
          [`padding-x-${values[1]}`]: true,
          [`padding-bottom-${values[2]}`]: true,
        };
        break;

      default:
        this.paddingClasses = {
          [`padding-top-${values[0]}`]: true,
          [`padding-right-${values[1]}`]: true,
          [`padding-bottom-${values[2]}`]: true,
          [`padding-left-${values[3]}`]: true,
        };
        break;
    }
  }

  componentDidLoad(): void {
    this.paddingChanged(this.padding);
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
