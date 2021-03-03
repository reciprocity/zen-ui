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

  /** Show checkbox (read-only) */
  @Prop() readonly selectable = false;

  /** Is row selected */
  @Prop({ mutable: true }) selected = false;

  /** Visible if no depth or parent.expanded */
  @Prop({ mutable: true }) visible = true;

  /** Is row expanded */
  @Prop({ mutable: true }) expanded = false;

  /** Is cell full span (colspan=number of cells) */
  @Prop() readonly fullSpan = false;

  /** Depth position of row (read-only) */
  @Prop() readonly depth: number = 0;

  @Watch('expanded')
  async expandedChanged(expanded: boolean): Promise<void> {
    if (expanded) {
      this.children().forEach(n => (n.visible = true));
    } else {
      this.descendants().forEach(n => {
        n.visible = false;
        n.expanded = false;
      });
    }
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

  descendants(): HTMLZenTableRowElement[] {
    const descendants = [];
    let next = this.element.nextElementSibling as HTMLZenTableRowElement;

    // Get all rows that have depth greater then the parent
    while (next) {
      if (next.depth <= this.depth) break;
      if (next.depth > this.depth && !this.expanded) {
        descendants.push(next);
      }
      next = next.nextElementSibling as HTMLZenTableRowElement;
    }

    return descendants;
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

  toggleExpand(): void {
    this.expanded = !this.expanded;
  }

  showWidgets(): boolean {
    return this.selectable || !!this.children().length;
  }

  hasChildren(): boolean {
    return !!this.children().length;
  }

  componentDidLoad(): void {
    const parentRow = this.getParentRow();
    this.visible = !parentRow || parentRow.expanded;
  }

  onRowSelect(): void {
    this.selected = !this.selected;
  }

  render(): HTMLTableRowElement {
    const ZenCheckBox = applyPrefix('zen-checkbox', this.element);
    const ZenIcon = applyPrefix('zen-icon', this.element);
    const ZenTableCell = applyPrefix('zen-table-cell', this.element);
    const hostClass = {
      hidden: !this.visible,
      selectable: this.selectable,
      expandable: this.hasChildren(),
      selected: this.selected,
    };
    const widgetClass = {
      widgets: true,
      expanded: this.expanded,
    };
    const checkboxClass = {
      checkbox: true,
      hidden: !this.selectable,
    };
    const expandIconClass = {
      'expand-icon': true,
      hidden: !this.hasChildren(),
    };

    return (
      <Host class={hostClass}>
        {this.showWidgets() && (
          <ZenTableCell class={widgetClass}>
            <ZenCheckBox onChange={() => this.onRowSelect()} class={checkboxClass} />
            <ZenIcon
              class={expandIconClass}
              size="sm"
              padding="sm"
              icon={faChevronRight}
              onClick={() => this.toggleExpand()}
            />
          </ZenTableCell>
        )}

        <slot></slot>
      </Host>
    );
  }
}
