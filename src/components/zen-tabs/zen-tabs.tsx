import { Component, Host, h, Prop } from '@stencil/core';

export interface TabItem {
  label: string;
  value: string;
}

export type TabValue = string | number;

@Component({
  tag: 'zen-tabs',
  styleUrl: 'zen-tabs.scss',
  shadow: true,
})
export class ZenTabs {
  /** Index of currently selected tab. */
  @Prop() readonly tabs: TabItem[] = [];

  /** Index of currently selected tab. */
  @Prop({ mutable: true }) value: TabValue = -1;

  tabClicked(event: Event): void {
    console.log('clicked', event.target);
    this.value = '';
  }

  render(): HTMLElement {
    return (
      <Host>
        {this.tabs.map((tab: TabItem) => (
          <div class="tab" data-value={tab.value} onClick={e => this.tabClicked(e)}>
            {tab.label}
          </div>
        ))}
      </Host>
    );
  }
}
