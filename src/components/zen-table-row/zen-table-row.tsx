import { h, Component, Host, Prop, Element, Event, EventEmitter, Method, Watch } from '@stencil/core';
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

  /** Checkbox indeterminate state  */
  @Prop({ mutable: true, reflect: true }) indeterminate = false;

  /** Depth position of row (read-only) */
  @Prop() readonly depth: number = 0;

  /** Row selected */
  @Event() rowSelectChanged: EventEmitter<boolean>;

  /** Row expanded */
  @Event() rowExpandChange: EventEmitter<boolean>;

  @Watch('selected')
  async selectedChanged(): Promise<void> {
    let parenRow = await this.parentRow();

    // Get all expandable parent rows
    while (parenRow && parenRow.expandable) {
      // Set checkbox indeterminate state on parent rows
      const hasAllSelected = await parenRow.hasAllRowsSelected();
      const hasRowsSelected = await parenRow.hasRowsSelected();

      parenRow.indeterminate = hasRowsSelected && !hasAllSelected;
      parenRow.selected = hasAllSelected;

      parenRow = await parenRow.parentRow();
    }
  }

  /** Returns true if descendent rows have a row selected **/
  @Method()
  async hasRowsSelected(): Promise<boolean> {
    return this.rowDescendants().some(row => row.selected);
  }

  /** Returns true if all children rows are selected **/
  @Method()
  async hasAllRowsSelected(): Promise<boolean> {
    return this.rowChildren().every(row => row.selected);
  }

  /** Returns elements parent row (depth -1) **/
  @Method()
  async parentRow(): Promise<HTMLZenTableRowElement> {
    // find first prev sibling with depth 1 smaller than ours:
    let prev = this.host.previousElementSibling as HTMLZenTableRowElement;

    while (prev) {
      if (prev.depth === this.depth - 1) return prev;
      prev = prev.previousElementSibling as HTMLZenTableRowElement;
    }
    return null;
  }

  rowChildren(): HTMLZenTableRowElement[] {
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

  rowDescendants(): HTMLZenTableRowElement[] {
    const descendants = [];
    let next = this.host.nextElementSibling as HTMLZenTableRowElement;

    while (next) {
      if (next.depth <= this.depth) break;
      if (next.depth > this.depth) {
        descendants.push(next as HTMLZenTableRowElement);
      }
      next = next.nextElementSibling as HTMLZenTableRowElement;
    }

    return descendants;
  }

  hasChildren(): boolean {
    return !!this.rowChildren().length;
  }

  showWidgets(): boolean {
    return this.selectable || this.expandable;
  }

  onExpand(): void {
    this.expanded = !this.expanded;
    this.rowExpandChange.emit(this.expanded);
  }

  onSelect(): void {
    this.selected = !this.selected;
    this.rowSelectChanged.emit(this.selected);
  }

  async componentDidLoad(): Promise<void> {
    const parentRow = await this.parentRow();
    const hasRowsSelected = await this.hasRowsSelected();

    this.visible = !parentRow || parentRow.expanded;
    this.expandable = this.hasChildren();
    this.indeterminate = hasRowsSelected;
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
              <ZenCheckBox
                indeterminate={this.indeterminate}
                class="checkbox"
                checked={this.selected}
                onClick={() => this.onSelect()}
              />
            )}
            {this.expandable && (
              <ZenIcon
                class="expand-icon"
                size="sm"
                p="lg"
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
