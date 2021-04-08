import { Component, Host, h, Prop, Element, Listen, Watch } from '@stencil/core';

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

  @Watch('value')
  async selectedChanged(): Promise<void> {
    const tab = this.tabs[this.value];
    this.selectTab(tab);
  }

  @Listen('tabSelect')
  onSelectedTab(event: CustomEvent): void {
    const tab = this.tabs.find(tab => tab.getAttribute('name') === event.detail);
    this.selectTab(tab);
  }

  selectTab(tab: HTMLZenTabElement): void {
    this.tabs.forEach(tab => {
      tab.deselect();
    });

    tab.select();
  }

  componentDidLoad(): void {
    this.tabs = Array.from(this.host.children).map(n => n as HTMLZenTabElement);
    const tab = this.tabs[this.value];
    this.selectTab(tab);
  }

  render(): HTMLZenTabsElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
