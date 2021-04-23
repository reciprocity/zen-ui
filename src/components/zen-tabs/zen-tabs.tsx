import { Component, Host, h, Prop, Element, Listen, Watch, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'zen-tabs',
  styleUrl: 'zen-tabs.scss',
  shadow: true,
})
export class ZenTabs {
  private tabs: HTMLZenTabElement[];

  @Element() host: HTMLZenTabsElement;

  /** Index of currently selected tab. */
  @Prop() readonly value: number = 0;

  /** Tabs change event */
  @Event() zenChange: EventEmitter<void>;

  @Watch('value')
  async selectedChanged(): Promise<void> {
    this.selectTab(this.tabs[this.value]);
  }

  @Listen('tabSelect')
  onSelectedTab(event: CustomEvent): void {
    this.selectTab(event.target as HTMLZenTabElement);
  }

  selectTab(tab: HTMLZenTabElement): void {
    this.tabs.forEach(n => {
      n.selected = false;
    });

    if (tab) tab.selected = true;
    this.zenChange.emit();
  }

  componentDidLoad(): void {
    this.tabs = Array.from(this.host.children).map(n => n as HTMLZenTabElement);
    this.selectTab(this.tabs[this.value]);
  }

  render(): HTMLZenTabsElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
