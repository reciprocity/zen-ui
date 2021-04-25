import { Component, Host, h, Prop, Event, EventEmitter, Watch, Element } from '@stencil/core';
import { applyPrefix, getSlotElement } from '../helpers/helpers';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';

@Component({
  tag: 'zen-sidebar-nav-item',
  styleUrl: 'zen-sidebar-nav-item.scss',
  shadow: true,
})
export class ZenSidebarNavItem {
  @Element() host: HTMLZenSidebarNavItemElement;

  /** Render item as selected */
  @Prop({ reflect: true }) readonly selected: boolean = false;

  /** Item was selected */
  @Event() zenSelect: EventEmitter<void>;

  @Watch('selected')
  selectedChanged(selected: boolean): void {
    if (!selected) return;
    this.zenSelect.emit();
  }

  getItems(): HTMLZenSidebarNavSubitemElement[] {
    const wrapper = getSlotElement(this.host, 'subitems');
    if (!wrapper) return;

    return Array.from(wrapper.children).filter(el =>
      el.tagName.endsWith('ZEN-SIDEBAR-NAV-SUBITEM'),
    ) as HTMLZenSidebarNavSubitemElement[];
  }

  itemSelected(event: CustomEvent): void {
    const newlySelected = event.target;
    const others = this.getItems().filter(item => item.selected && item !== newlySelected);
    others.forEach(item => {
      item.selected = false;
    });
  }

  render(): HTMLElement {
    const ZenIcon = applyPrefix('zen-icon', this.host);

    return (
      <Host onSubitemSelect={e => this.itemSelected(e)}>
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
