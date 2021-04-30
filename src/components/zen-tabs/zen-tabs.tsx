import { Component, Host, h, Prop, Element, Listen, Watch, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'zen-tabs',
  styleUrl: 'zen-tabs.scss',
  shadow: true,
})
export class ZenTabs {
  private tabs: HTMLZenTabElement[];
  private updating = false;

  @Element() host: HTMLZenTabsElement;

  /** Index of currently selected tab. */
  @Prop({ mutable: true, reflect: true }) value = 0;

  /** Tabs change event */
  @Event() zenChange: EventEmitter<void>;

  @Watch('value')
  selectedChanged(): void {
    if (!this.updating && !Number.isNaN(this.value)) {
      this.selectTab(this.tabs[this.value]);
    }
  }

  @Listen('zenSelect')
  onSelectedTab(event: CustomEvent): void {
    this.selectTab(event.target as HTMLZenTabElement);
  }

  selectTab(tab: HTMLZenTabElement, triggerEvent = true): void {
    this.updating = true;
    this.tabs.forEach((n, index) => {
      if (tab === n) {
        n.selected = true;
        this.value = index;
      } else {
        n.selected = false;
      }
    });

    if (triggerEvent) this.zenChange.emit();
    this.updating = false;
  }

  componentDidLoad(): void {
    this.tabs = Array.from(this.host.children).map(n => n as HTMLZenTabElement);
    this.selectTab(this.tabs[this.value], false);
  }

  render(): HTMLZenTabsElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
