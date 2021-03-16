import { h, Component, Host, Prop, Element, Event, EventEmitter } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';

@Component({
  tag: 'zen-table-row',
  styleUrl: 'zen-table-row.scss',
  shadow: true,
})
export class ZenTableRow {
  @Element() host: HTMLZenTableRowElement;

  /** Can be expanded */
  @Prop({ mutable: true }) expandable = false;

  /** Show checkbox (read-only) */
  @Prop() readonly selectable = false;

  /** Visible if no depth or parent.expanded */
  @Prop({ mutable: true }) visible = true;

  /** Is row selected */
  @Prop() readonly selected: boolean = false;

  /** Is row expanded */
  @Prop() readonly expanded: boolean = false;

  /** Is cell full span (colspan=number of cells) */
  @Prop() readonly fullSpan = false;

  /** Depth position of row (read-only) */
  @Prop() readonly depth: number = 0;

  /** Row selected */
  @Event() rowSelected: EventEmitter<boolean>;

  /** Row expanded */
  @Event() rowExpanded: EventEmitter<boolean>;

  children(): HTMLZenTableRowElement[] {
    const children = [];
    let next = this.host.nextElementSibling as HTMLZenTableRowElement;

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
    let prev = this.host.previousElementSibling as HTMLZenTableRowElement;

    while (prev) {
      if (prev.depth === this.depth - 1) return prev;
      prev = prev.previousElementSibling as HTMLZenTableRowElement;
    }
    return null;
  }

  showWidgets(): boolean {
    return this.selectable || this.expandable;
  }

  hasChildren(): boolean {
    return !!this.children().length;
  }

  onExpand(): void {
    this.rowExpanded.emit(!this.expanded);
  }

  onSelect(): void {
    this.rowSelected.emit(!this.selected);
  }

  componentDidLoad(): void {
    const parentRow = this.getParentRow();
    this.visible = !parentRow || parentRow.expanded;
    this.expandable = this.hasChildren();
  }

  render(): HTMLTableRowElement {
    const ZenCheckBox = applyPrefix('zen-checkbox', this.host);
    const ZenIcon = applyPrefix('zen-icon', this.host);
    const hostClass = {
      hidden: !this.visible,
      selectable: this.selectable,
      expandable: this.expandable,
      selected: this.selected,
      expanded: this.expanded,
    };
    return (
      <Host class={hostClass}>
        {this.showWidgets() && (
          <div class="widgets">
            {this.selectable && (
              <ZenCheckBox class="checkbox" checked={this.selected} onClick={() => this.onSelect()} />
            )}
            {this.expandable && (
              <ZenIcon
                class="expand-icon"
                size="sm"
                padding="lg"
                icon={faChevronRight}
                onClick={() => this.onExpand()}
              />
            )}
          </div>
        )}
        <slot></slot>
      </Host>
    );
  }
}
