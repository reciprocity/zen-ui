import { Component, Host, h, Prop, Element } from '@stencil/core';

export type OptionValue = string | number | undefined;

@Component({
  tag: 'zen-option',
  styleUrl: 'zen-option.scss',
  shadow: true,
})
export class ZenOption {
  @Element() hostElement: HTMLZenOptionElement;

  /** Render item as selected */
  @Prop({ reflect: true }) readonly selected: boolean = false;
  /** Render item as focused */
  @Prop({ reflect: true }) readonly focused: boolean = false;
  /** Value of option if used inside dropdown */
  @Prop({ reflect: true }) readonly value: OptionValue = '';
  /** False to enable custom item padding */
  @Prop() readonly defaultPadding: boolean = true;
  /** Disable selecting option in dropdown */
  @Prop() readonly disabled?: boolean = false;

  render(): HTMLElement {
    return (
      <Host disabled={this.disabled ? 'true' : null}>
        <div
          class={{
            background: true,
            paddingless: !this.defaultPadding,
            disabled: this.disabled,
          }}
        >
          <slot>
            <div class="content">{this.value}</div>
          </slot>
        </div>
      </Host>
    );
  }
}
