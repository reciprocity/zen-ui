import { Component, Host, h, Prop, Element } from '@stencil/core';
import { slotPassed } from '../helpers/helpers';

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
        <div>{this.contentSlotPassed ? 'yes' : 'no'}</div>
        <div class="background">
          {this.contentSlotPassed ? <slot name="content"></slot> : <div class="content">{this.label}</div>}
        </div>
      </Host>
    );
  }
}
