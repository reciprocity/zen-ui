import { h, Component, Host, Prop, Element, Event, EventEmitter, Watch } from '@stencil/core';
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
  childObserver: MutationObserver = null;
  disconnected = false;
  initializing = true;

  @Element() host: HTMLZenTableRowElement;

  /** True when parent row is expanded or if it's root row */
  @Prop({ reflect: true, attribute: 'visible' }) readonly $visible: boolean = true;

  /** True if it has any child row */
  @Prop({ reflect: true, attribute: 'expandable' }) readonly $expandable: boolean = false;

  /** Show checkbox */
  @Prop({ reflect: true }) readonly selectable: boolean = false;

  /** If checkbox is checked */
  @Prop({ reflect: true }) readonly selected: boolean = false;

  /** If row is currently expanded */
  @Prop({ reflect: true }) readonly expanded: boolean = false;

  /** Some but not all children selected */
  @Prop({ attribute: 'indeterminate' }) readonly $indeterminate: boolean = false;

  /** Define depth to make nested items */
  @Prop() readonly depth: number = 0;

  /** Row represents header */
  @Prop() readonly header: boolean = false;

  /** Row remains fixed at the top during scroll (mainly used for headers) */
  @Prop() readonly sticky: boolean = false;

  /** Row is placed right after header (auto calculated) */
  @Prop() readonly $afterHeader: boolean = false;

  /**
   * row.selected changed
   */
  @Event() zenSelect: EventEmitter<boolean>;
  /**
   * row.expanded changed
   */
  @Event() zenToggle: EventEmitter<boolean>;

  @Watch('selectable')
  selectableChanged(selectable: boolean): void {
    this.setCellsProp('$selectable', selectable);
  }

  @Watch('$expandable')
  expandableChanged(expandable: boolean): void {
    this.setCellsProp('$expandable', expandable);
  }

  @Watch('depth')
  depthChanged(depth: number): void {
    this.setCellsProp('$depth', depth);
  }

  @Watch('header')
  headerChanged(header: boolean): void {
    this.setCellsProp('$header', header);
  }

  @Watch('$afterHeader')
  afterHeaderChanged(afterHeader: boolean): void {
    this.setCellsProp('$afterHeader', afterHeader);
  }

  @Watch('sticky')
  stickyChanged(sticky: boolean): void {
    this.setCellsProp('$sticky', sticky);
  }

  @Watch('$indeterminate')
  indeterminateChanged(indeterminate: boolean): void {
    this.setCellsProp('$indeterminate', indeterminate);
    if (!this.initializing) this.zenSelect.emit();
  }

  @Watch('selected')
  selectedChanged(selected: boolean): void {
    this.setCellsProp('$selected', selected);
    if (!this.initializing) this.zenSelect.emit();

    const table = this.host.parentElement as HTMLZenTableElement;
    if (!table || table.$updating) return;

    // Select each descendent row:
    this.rowDescendants().forEach(n => (n.selected = selected));
  }

  @Watch('expanded')
  expandedChanged(expanded: boolean): void {
    this.setCellsProp('$expanded', expanded);
    if (!this.initializing) this.zenToggle.emit();
  }

  allTableRows(): HTMLZenTableRowElement[] {
    const rows = [];
    let next = this.host.nextElementSibling as HTMLZenTableRowElement;
    while (next) {
      rows.push(next);
      next = next.nextElementSibling as HTMLZenTableRowElement;
    }
    return rows;
  }

  getRowCells(): HTMLZenTableCellElement[] {
    const cells = getDefaultSlotContent(this.host);
    return cells ? (Array.from(cells) as HTMLZenTableCellElement[]) : [];
  }

  rowDescendants(): HTMLZenTableRowElement[] {
    if (this.header) {
      return this.allTableRows();
    }

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

  setCellsProp(propName: string, value: unknown): void {
    this.getRowCells().forEach(cell => (cell[propName] = value));
  }

  async componentDidLoad(): Promise<void> {
    this.selectableChanged(this.selectable);
    this.selectedChanged(this.selected);
    this.expandableChanged(this.$expandable);
    this.expandedChanged(this.expanded);
    this.depthChanged(this.depth);
    this.headerChanged(this.header);
    this.stickyChanged(this.sticky);
    this.indeterminateChanged(this.$indeterminate);
    this.initializing = false;
  }

  render(): HTMLTableRowElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
