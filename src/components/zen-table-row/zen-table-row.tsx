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
  @Prop({ mutable: true }) selected = false;

  /** Is row expanded */
  @Prop({ mutable: true }) expanded = false;

  /** Depth position of row (read-only) */
  @Prop() readonly depth: number = 0;

  /** Row selected */
  @Event() rowSelectChanged: EventEmitter<boolean>;

  /** Row expanded */
  @Event() rowExpandChange: EventEmitter<boolean>;

  children(): HTMLZenTableRowElement[] {
    const children = [];
    let next = this.host.nextElementSibling as HTMLZenTableRowElement;

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
    this.expanded = !this.expanded;
    this.rowExpandChange.emit(this.expanded);
  }

  onSelect(): void {
    this.selected = !this.selected;
    this.rowSelectChanged.emit(this.selected);
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
