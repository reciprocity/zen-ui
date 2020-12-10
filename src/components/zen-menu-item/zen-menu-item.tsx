import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-menu-item',
  styleUrl: 'zen-menu-item.scss',
  shadow: true,
})
export class ZenMenuItem {
  /** Text inside the item */
  @Prop() readonly label: string = 'Item';
  /** Render item as selected */
  @Prop() readonly selected: boolean = false;
  /** Render item as focused */
  @Prop() readonly focused: boolean = false;
  /** False to enable custom item padding */
  @Prop() readonly defaultPadding: boolean = true;

  render(): HTMLElement {
    return (
      <Host>
        <div class={{ background: true, selected: this.selected, focused: this.focused }}>
          <div class="content">{this.label}</div>
        </div>
      </Host>
    );
  }
}
