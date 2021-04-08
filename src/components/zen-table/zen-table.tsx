import { h, Component, Host, Element, Prop } from '@stencil/core';

@Component({
  tag: 'zen-table',
  styleUrl: 'zen-table.scss',
  shadow: true,
})
export class ZenTable {
  childObserver: MutationObserver = null;

  @Element() host: HTMLZenTableElement;

  /** Space separated css grid columns<br/>(eg. `auto 1fr 1fr 200px 1fr`) */
  @Prop() readonly columns = '';

  /** Private variable (table cleanup in progress) */
  @Prop() readonly $updating: boolean = false;

  async cleanupTableStructure(): Promise<void> {
    function parentRows(rows, index: number): HTMLZenTableRowElement[] {
      let curDepth = rows[index].depth;
      const parents = [];
      for (let i = index - 1; i >= 0; i--) {
        if (rows[i].depth >= curDepth) continue;
        curDepth = rows[i].depth;
        parents.push(rows[i]);
      }
      return parents;
    }

    function descendentRows(rows, index: number): HTMLZenTableRowElement[] {
      const children = [];
      const myDepth = rows[index].depth;
      for (let i = index + 1; i < rows.length; i++) {
        if (rows[i].depth <= myDepth) break;
        children.push(rows[i]);
      }
      return children;
    }

    function removeOrphans(rows) {
      // orphans: rows whose depth is more than 1 greater from prevSibling.depth
      // rows like this could never become visible.
      // Apprently their parent got deleted so we'd expect they'd get too.
      for (let i = rows.length - 1; i >= 0; i--) {
        if (rows[i - 1] && rows[i].depth - rows[i - 1].depth > 1) {
          rows[i].remove();
          delete rows[i];
        }
      }
    }

    function updateExapndableProps(rows) {
      for (let i = 0; i < rows.length; i++) {
        rows[i].expandable = rows[i + 1] && rows[i + 1].depth > rows[i].depth;
        if (!rows[i].expandable && rows[i].expanded) {
          rows[i].expanded = false;
        }
      }
    }

    function updateVisibleProps(rows) {
      for (let i = 0; i < rows.length; i++) {
        const parents = parentRows(rows, i);
        rows[i].visible = !parents.length || parents.every(n => n.expanded);
      }
    }

    function updateParentCheckboxes(rows) {
      for (let i = 0; i < rows.length; i++) {
        const descendents = descendentRows(rows, i);
        if (!descendents.length) continue;
        const allSelected = descendents.length && descendents.every(n => n.selected);
        const someSelected = descendents.some(n => n.selected);

        rows[i].$indeterminate = !allSelected && someSelected;
        rows[i].selected = allSelected;
      }
    }

    // -------------------------------------------------------------------------
    this.host.$updating = true;

    const rows = this.allRows();

    // NOTE: Order of below function calls is important!!!
    removeOrphans(rows);
    updateExapndableProps(rows);
    updateVisibleProps(rows);
    updateParentCheckboxes(rows);

    this.host.$updating = false;
  }

  allRows(): HTMLZenTableRowElement[] {
    function isNormalRow(element: HTMLZenTableRowElement) {
      return element.tagName.endsWith('-ROW') && !element.header;
    }
    return Array.from(this.host.children).filter(n =>
      isNormalRow(n as HTMLZenTableRowElement),
    ) as HTMLZenTableRowElement[];
  }

  startChildObserver(): void {
    this.childObserver = new MutationObserver(() => this.cleanupTableStructure());

    this.childObserver.observe(this.host, {
      childList: true,
      attributes: true,
      subtree: true,
    });
  }

  async componentDidLoad(): Promise<void> {
    if (!this.columns) {
      console.error('Zen-table error: Missing prop `columns`!', this.host);
    }

    this.startChildObserver();
  }

  disconnectedCallback(): void {
    this.childObserver.disconnect();
  }

  render(): HTMLTableElement {
    return (
      <Host style={{ gridTemplateColumns: this.columns }}>
        <slot></slot>
      </Host>
    );
  }
}
