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

  /** Visible if no !depth or parent.expanded (read-only) */
  @Prop({ mutable: true }) visible = true;

  /** Is row expanded */
  @Prop({ mutable: true }) expanded = false;

  /** Depth position of row */
  @Prop() readonly depth: number = 0;

  @Watch('expanded')
  async visibleChanged(expanded?: boolean): Promise<void> {
    this.children().forEach(child => (child.visible = expanded));
  }

  children(): HTMLZenTableRowElement[] {
    const children = [];
    let next = this.element.nextElementSibling as HTMLZenTableRowElement;

    // Get all rows that have depth greater then the parent
    while (next) {
      if (next.depth <= this.depth) break;
      if (next.depth === this.depth + 1) {
        children.push(next as HTMLZenTableRowElement);
      }
      next = next.nextElementSibling as HTMLZenTableRowElement;
    }

    return children;
  }

  getParentRow(): HTMLZenTableRowElement {
    // find first prev sibling with depth 1 smaller than ours:
    let prev = this.element.previousElementSibling as HTMLZenTableRowElement;

    while (prev) {
      if (prev.depth === this.depth - 1) return prev;
      prev = prev.previousElementSibling as HTMLZenTableRowElement;
    }
    return null;
  }

  onClick(): void {
    this.expanded = !this.expanded;
  }

  componentDidLoad(): void {
    const parentRow = this.getParentRow();
    this.visible = !parentRow || parentRow.expanded;
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
