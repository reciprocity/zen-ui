import { Component, Host, h, Prop, Element } from '@stencil/core';
import { SpacingShorthand, Spacing } from '../helpers/types';
import { applyPrefix } from '../helpers/helpers';
import { InputSize } from '../helpers/types';

export type OptionValue = string | number | undefined;

const sizes = {
  sm: {
    padding: 'sm lg',
  },
  md: {
    padding: 'md lg',
  },
  lg: {
    padding: 'lg',
  },
};

@Component({
  tag: 'zen-option',
  styleUrl: 'zen-option.scss',
  shadow: true,
})
export class ZenOption {
  @Element() host: HTMLZenOptionElement;

  /** Render item as selected */
  @Prop({ reflect: true }) readonly selected: boolean = false;
  /** Render item as focused */
  @Prop({ reflect: true }) readonly focused: boolean = false;
  /** Value of option when used inside a dropdown */
  @Prop({ reflect: true }) readonly value: OptionValue = '';
  /** Disable selecting option in dropdown */
  @Prop() readonly disabled?: boolean = false;
  /** Prevents default hover style on mouse hover */
  @Prop({ reflect: true }) readonly noHover?: boolean = false;
  /** Size variant */
  @Prop({ reflect: true }) readonly size: InputSize = 'md';

  /** <Description generated in helper file> */
  @Prop() readonly padding: SpacingShorthand = null;
  /** Skipped */
  @Prop() readonly paddingTop: Spacing = null;
  /** Skipped */
  @Prop() readonly paddingRight: Spacing = null;
  /** Skipped */
  @Prop() readonly paddingBottom: Spacing = null;
  /** Skipped */
  @Prop() readonly paddingLeft: Spacing = null;

  render(): HTMLElement {
    const ZenSpace = applyPrefix('zen-space', this.host);
    const ZenText = applyPrefix('zen-text', this.host);
    const realPadding = !this.padding || this.padding === 'null' ? sizes[this.size].padding : this.padding;
    return (
      <Host disabled={this.disabled ? 'true' : null}>
        <ZenSpace
          block
          padding={realPadding}
          padding-top={this.paddingTop}
          padding-right={this.paddingRight}
          padding-bottom={this.paddingBottom}
          padding-left={this.paddingLeft}
          class={{
            background: true,
            disabled: this.disabled,
          }}
        >
          <ZenText size={this.size} class="content" truncate>
            <slot>{this.value}</slot>
          </ZenText>
        </ZenSpace>
      </Host>
    );
  }
}
