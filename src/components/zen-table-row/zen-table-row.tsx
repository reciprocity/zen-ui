import { h, Component, Host, Prop, Element, Event, EventEmitter, Method, Watch } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';

/**
 * @slot [default] - Content for table cells
 */
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
  @Prop({ reflect: true }) readonly indeterminate: boolean = false;

  /** Depth position of row (read-only) */
  @Prop() readonly depth: number = 0;

  /** Row selected */
  @Event() rowSelectChanged: EventEmitter<boolean>;

  @Watch('selected')
  async selectedChanged(selected: boolean): Promise<void> {
    // Set parents rows checkbox indeterminate state
    let parentRow = await this.parentRow();
    while (parentRow && parentRow.selectable && parentRow.expandable) {
      const hasAllSelected = await parentRow.hasAllRowsSelected();
      const hasRowsSelected = await parentRow.hasRowsSelected();

      if (!hasRowsSelected) {
        parentRow.selected = false;
      }
      if (hasAllSelected) {
        parentRow.selected = true;
      }
      parentRow.indeterminate = hasRowsSelected && !hasAllSelected;

      parentRow = await parentRow.parentRow();
    }

    // Set rows children selected state
    if (this.selectable && this.expandable) {
      this.rowChildren().forEach(n => (n.selected = selected));
    }

    // Emit event that header checkbox state can be applied
    this.rowSelectChanged.emit(this.selected);
  }

  @Watch('expanded')
  async expandedChanged(expanded: boolean): Promise<void> {
    // Set rows children/descendents expanded state
    if (this.expandable && expanded) {
      // On expanding set only direct children to visible
      this.rowChildren().forEach(n => {
        n.visible = true;
      });
    } else {
      this.rowDescendants().forEach(n => {
        // On closing set all descendants to not visible
        n.visible = false;
        n.expanded = false;
      });
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
    return this.rowChildren().every(row => row.selected && !row.indeterminate);
  }

  /** Returns elements parent row (depth -1) **/
  @Method()
  async parentRow(): Promise<HTMLZenTableRowElement> {
    // Find first prev sibling with depth 1 smaller than ours
    let prev = this.host.previousElementSibling as HTMLZenTableRowElement;

    while (prev) {
      if (prev.depth === this.depth - 1) return prev;
      prev = prev.previousElementSibling as HTMLZenTableRowElement;
    }
    return null;
  }

  rowChildren(): HTMLZenTableRowElement[] {
    // Find first depth level siblings of row
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
    // Find all descendents of row
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
  }

  onSelect(): void {
    this.selected = !this.selected;
  }

  async componentDidLoad(): Promise<void> {
    const parentRow = await this.parentRow();

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
