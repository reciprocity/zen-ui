import { Component, Host, h, Prop, Element } from '@stencil/core';

/**
 * @slot content - Replace content of item. Padding stays. To remove it set `defaultPadding="false"`
 */

@Component({
  tag: 'zen-option',
  styleUrl: 'zen-option.scss',
  shadow: true,
})
export class ZenOption {
  @Element() hostElement: HTMLZenOptionElement;

  /** Text inside the item */
  @Prop() readonly label: string = 'Item';
  /** Render item as selected */
  @Prop({ reflect: true }) readonly selected: boolean = false;
  /** Render item as focused */
  @Prop({ reflect: true }) readonly focused: boolean = false;
  /** False to enable custom item padding */
  @Prop() readonly defaultPadding: boolean = true;

  render(): HTMLElement {
    return (
      <Host>
        <div class={{ background: true, paddingless: !this.defaultPadding }}>
          <slot name="content">
            <div class="content">{this.label}</div>
          </slot>
        </div>
      </Host>
    );
  }
}
