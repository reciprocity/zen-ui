import { Component, Host, h, Prop, Event, EventEmitter, Watch, Element, State } from '@stencil/core';
import { applyPrefix, getSlotElement } from '../helpers/helpers';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';

@Component({
  tag: 'zen-sidebar-nav-item',
  styleUrl: 'zen-sidebar-nav-item.scss',
  shadow: true,
})
export class ZenSidebarNavItem {
  childObserver: MutationObserver = null;

  @Element() host: HTMLZenSidebarNavItemElement;

  @State() hasSubitems = false;

  /** Render item as selected */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /** Item was selected */
  @Event() zenSelect: EventEmitter<void>;

  @Watch('selected')
  selectedChanged(selected: boolean): void {
    if (!selected) {
      this.deselectAllChildren();
      return;
    }
    const subitems = this.getItems();
    if (subitems.length && !subitems.some(n => n.selected)) {
      subitems[0].selected = true;
    }
    this.zenSelect.emit();
  }

  deselectAllChildren(): void {
    this.getItems().forEach(subitem => (subitem.selected = false));
  }

  getItems(): HTMLZenSidebarNavSubitemElement[] {
    const wrapper = getSlotElement(this.host, 'subitems');
    if (!wrapper) return [];

    return Array.from(wrapper.children).filter(el =>
      el.tagName.endsWith('ZEN-SIDEBAR-NAV-SUBITEM'),
    ) as HTMLZenSidebarNavSubitemElement[];
  }

  validateSubitems(): void {
    this.hasSubitems = this.getItems().length > 0;
  }

  subitemSelected(event: CustomEvent): void {
    const newlySelected = event.target;
    const others = this.getItems().filter(item => item.selected && item !== newlySelected);
    others.forEach(item => {
      item.selected = false;
    });
    this.selected = true;
  }

  startChildObserver(): void {
    this.childObserver = new MutationObserver(() => {
      this.validateSubitems();
    });

    this.childObserver.observe(this.host, {
      childList: true,
      attributes: true,
      subtree: true,
    });
  }

  componentDidLoad(): void {
    this.startChildObserver();
    this.validateSubitems();
  }

  disconnectedCallback(): void {
    if (this.childObserver) this.childObserver.disconnect();
  }

  render(): HTMLElement {
    const ZenIcon = applyPrefix('zen-icon', this.host);

    return (
      <Host onSubitemSelect={e => this.subitemSelected(e)} class={{ 'has-subitems': this.hasSubitems }}>
        <div class="item">
          <slot></slot>
          <ZenIcon class="arrow" size="sm" icon={faChevronDown}></ZenIcon>
        </div>
        <div class="subitems">
          <slot name="subitems"></slot>
        </div>
      </Host>
    );
  }
}
