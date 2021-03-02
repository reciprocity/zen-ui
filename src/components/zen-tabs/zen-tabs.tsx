import { Component, Host, h, Prop, Element } from '@stencil/core';

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
  @Element() host: HTMLZenTabsElement;

  /** Index of currently selected tab. */
  @Prop() readonly tabs: TabItem[] = [];

  /** Index of currently selected tab. */
  @Prop({ mutable: true }) value: TabValue = -1;

  tabClicked(event: Event): void {
    this.value = (event.target as HTMLElement).getAttribute('data-value');
    this.host.dispatchEvent(new Event('change'));
  }

  isTabActive = (tab: TabItem): boolean => tab.value == this.value;

  render(): HTMLElement {
    return (
      <Host>
        {this.tabs.map((tab: TabItem) => (
          <div
            class={{ tab: true, active: this.isTabActive(tab) }}
            data-value={tab.value}
            onClick={e => this.tabClicked(e)}
          >
            {tab.label}
          </div>
        ))}
      </Host>
    );
  }
}
