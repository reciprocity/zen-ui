import { Component, Host, h, Prop, Element } from '@stencil/core';
import { slotPassed } from '../helpers/helpers';

/**
 * @slot content - Replace content of item. Padding stays. To remove it set `defaultPadding="false"`
 */

@Component({
  tag: 'zen-menu-item',
  styleUrl: 'zen-menu-item.scss',
  shadow: true,
})
export class ZenMenuItem {
  contentSlotPassed = false;

  @Element() hostElement: HTMLZenMenuItemElement;

  /** Text inside the item */
  @Prop() readonly label: string = 'Item';
  /** Render item as selected */
  @Prop({ reflect: true }) readonly selected: boolean = false;
  /** Render item as focused */
  @Prop({ reflect: true }) readonly focused: boolean = false;
  /** False to enable custom item padding */
  @Prop() readonly defaultPadding: boolean = true;

  componentWillLoad(): void {
    this.contentSlotPassed = slotPassed(this.hostElement, 'content');
  }

  render(): HTMLElement {
    return (
      <Host>
        <div class={{ background: true, paddingless: !this.defaultPadding }}>
          {this.contentSlotPassed ? <slot name="content"></slot> : <div class="content">{this.label}</div>}
        </div>
      </Host>
    );
  }
}
