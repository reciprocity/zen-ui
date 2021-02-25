import { h, Component, Host, Prop, Element, Watch } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';

@Component({
  tag: 'zen-table-row',
  styleUrl: 'zen-table-row.scss',
  shadow: true,
})
export class ZenTableRow {
  @Element() element: HTMLZenTableRowElement;

  /* Visible if no parent or parent.opened (read-only) */
  @Prop({ mutable: true }) visible = true;

  /** Is row opened */
  @Prop({ mutable: true }) opened = false;

  /** Is this row a child */
  @Prop() readonly child = false;

  /** Depth position of row */
  @Prop() readonly depth: number = 0;

  @Watch('opened')
  async visibleChanged(opened?: boolean): Promise<void> {
    this.children().forEach(child => (child.visible = opened));
  }

  children(): HTMLZenTableRowElement[] {
    const children = [];
    let next = this.element.nextElementSibling;

    // Get all rows that have depth greater then the parent
    while (next) {
      const depth = parseInt(next.getAttribute('depth'), 10);
      if (depth <= this.depth) break;
      if (depth === this.depth + 1) {
        children.push(next as HTMLZenTableRowElement);
      }
      next = next.nextElementSibling;
    }

    return children;
  }

  onClick(): void {
    this.opened = !this.opened;
  }

  componentDidLoad(): void {
    if (this.child) this.visible = false;
  }

  render(): HTMLTableRowElement {
    const ZenCheckBox = applyPrefix('zen-checkbox', this.element);
    const ZenIcon = applyPrefix('zen-icon', this.element);
    return (
      <Host class={{ hidden: !this.visible, expandable: !!this.children().length }}>
        <div class="widgets">
          <ZenCheckBox class="checkbox" />
          <ZenIcon
            class={{ 'expand-icon': true, hidden: !this.children().length }}
            size="sm"
            padding="sm"
            icon={faChevronRight}
            onClick={() => this.onClick()}
          />
        </div>
        <slot></slot>
      </Host>
    );
  }
}
