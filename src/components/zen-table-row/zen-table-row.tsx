import { h, Component, Host, Prop, Element, Event, EventEmitter, Method, Watch } from '@stencil/core';
import { getDefaultSlotContent } from '../helpers/helpers';

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

  /** Visible if no depth or parent.expanded */
  @Prop({ reflect: true, mutable: true }) visible = true;

  /** Can be expanded (if has children) */
  @Prop({ reflect: true, mutable: true }) expandable = false;

  /** Show checkbox (read-only) */
  @Prop({ reflect: true }) readonly selectable: boolean = false;

  /** Is row selected */
  @Prop({ reflect: true }) readonly selected: boolean = false;

  /** Is row expanded */
  @Prop({ reflect: true }) readonly expanded: boolean = false;

  /** Checkbox indeterminate state (Won't update children)  */
  @Prop() readonly $indeterminate: boolean = false;

  /** Depth position of row (read-only) */
  @Prop() readonly depth: number = 0;

  /** Row represents header */
  @Prop() readonly header: boolean = false;

  /** Row selected */
  @Event() rowSelectChanged: EventEmitter<boolean>;

  @Watch('selectable')
  async selectableChanged(selectable: boolean): Promise<void> {
    this.setCellsProp('$selectable', selectable);
  }

  @Watch('expandable')
  async expandableChanged(expandable: boolean): Promise<void> {
    this.setCellsProp('$expandable', expandable);
  }

  @Watch('depth')
  async depthChanged(depth: number): Promise<void> {
    this.setCellsProp('$depth', depth);
  }

  @Watch('header')
  async headerChanged(header: boolean): Promise<void> {
    this.setCellsProp('$header', header);
  }

  @Watch('$indeterminate')
  async indeterminateChanged(indeterminate: boolean): Promise<void> {
    this.setCellsProp('$indeterminate', indeterminate);
  }

  @Watch('selected')
  async selectedChanged(selected: boolean): Promise<void> {
    this.setCellsProp('$selected', selected);

    // Set parents rows checkbox indeterminate state
    let parentRow = await this.parentRow();
    while (parentRow && parentRow.selectable && parentRow.expandable) {
      const hasAllSelected = await parentRow.hasAllRowsSelected();
      const hasRowsSelected = await parentRow.hasRowsSelected();

      if (!hasRowsSelected) {
        parentRow.selected = false;
      } else if (hasAllSelected) {
        parentRow.selected = true;
      }
      parentRow.$indeterminate = hasRowsSelected && !hasAllSelected;

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
    this.setCellsProp('$expanded', expanded);

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
    return this.rowChildren().every(row => row.selected && !row.$indeterminate);
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

  getRowCells(): HTMLZenTableCellElement[] {
    const cells = getDefaultSlotContent(this.host);
    return cells ? (Array.from(cells) as HTMLZenTableCellElement[]) : [];
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

  setCellsProp(propName: string, value: unknown): void {
    const cells = this.getRowCells();
    cells.forEach(cell => {
      cell[propName] = value;
    });
  }

  async componentDidLoad(): Promise<void> {
    const parentRow = await this.parentRow();

    this.visible = !parentRow || parentRow.expanded;
    this.expandable = this.hasChildren();

    this.selectableChanged(this.selectable);
    this.selectedChanged(this.selected);
    this.expandableChanged(this.expandable);
    this.expandedChanged(this.expanded);
    this.depthChanged(this.depth);
    this.headerChanged(this.header);
    this.indeterminateChanged(this.$indeterminate);
  }

  render(): HTMLTableRowElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
