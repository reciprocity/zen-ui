import { Component, Host, h, Prop } from '@stencil/core';
import { Size, None } from '../helpers/types';

type FlexAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

@Component({
  tag: 'zen-space',
  styleUrl: 'zen-space.scss',
  shadow: true,
})
export class ZenSpace {
  /** Is it row or column? */
  @Prop({ reflect: true }) readonly vertical: boolean = false;

  /** Horizontal align of items */
  @Prop({ reflect: true }) readonly verticalAlign: FlexAlign = 'center';

  /** Vertical align of items */
  @Prop({ reflect: true }) readonly horizontalAlign: FlexAlign = 'start';

  /** Spacing between items */
  @Prop({ reflect: true }) readonly spacing: Size | None = 'sm';

  /** Inner spacing of container */
  @Prop({ reflect: true }) readonly padding: Size | None | string = 'sm';

  /** Break row/column if content doesn't fit */
  @Prop({ reflect: true }) readonly noWrap: boolean = false;

  render(): HTMLElement {
    return (
      <Host>
        <slot>
          <p>zen-space should not be empty</p>
        </slot>
      </Host>
    );
  }
}
