import { Component, Host, h, Event, EventEmitter, Element, State, Method } from '@stencil/core';

@Component({
  tag: 'zen-tab',
  styleUrl: 'zen-tab.scss',
  shadow: true,
})
export class ZenTab {
  @Element() host: HTMLZenTabElement;

  /** Is tab selected */
  @State() selected = false;

  /** Tab selected event */
  @Event() tabSelect: EventEmitter<void>;

  /** Deselect tab */
  @Method()
  async deselect(): Promise<void> {
    this.selected = false;
  }

  /** Select tab */
  @Method()
  async select(): Promise<void> {
    this.selected = true;
  }

  onClick(): void {
    this.selected = !this.selected;
    this.tabSelect.emit();
  }

  render(): HTMLZenTabElement {
    return (
      <Host class={{ selected: this.selected }} onClick={() => this.onClick()}>
        <slot></slot>
      </Host>
    );
  }
}
