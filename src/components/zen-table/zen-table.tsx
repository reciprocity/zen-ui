import { h, Component, Host, Element, Listen } from '@stencil/core';

@Component({
  tag: 'zen-table',
  styleUrl: 'zen-table.scss',
  shadow: true,
})
export class ZenTable {
  @Element() host: HTMLZenTableElement;

  @Listen('rowExpandChange')
  handleRowExpanded(ev: CustomEvent): void {
    const target = ev.target as HTMLZenTableRowElement;
    const expanded = ev.detail;

    if (expanded) {
      this.rowChildren(target).forEach(n => (n.visible = true));
    } else {
      this.rowDescendants(target).forEach(n => {
        n.visible = false;
        n.expanded = false;
      });
    }
  }

  @Listen('headerSelectedChange')
  handleHeaderSelected(ev: CustomEvent): void {
    const target = ev.target as HTMLZenTableHeaderElement;
    const selected = ev.detail;

    this.allRows(target).forEach(n => {
      n.selected = selected;
    });
  }

  rowChildren(target: HTMLZenTableRowElement): HTMLZenTableRowElement[] {
    const children = [];
    let next = target.nextElementSibling as HTMLZenTableRowElement;

    // Get all rows that have depth greater then the parent
    while (next) {
      if (next.depth <= target.depth) break;
      if (next.depth === target.depth + 1) {
        children.push(next as HTMLZenTableRowElement);
      }
      next = next.nextElementSibling as HTMLZenTableRowElement;
    }

    return children;
  }

  rowDescendants(target: HTMLZenTableRowElement): HTMLZenTableRowElement[] {
    const descendants = [];
    let next = target.nextElementSibling as HTMLZenTableRowElement;

    while (next) {
      if (next.depth <= target.depth) break;
      if (next.depth > target.depth) {
        descendants.push(next as HTMLZenTableRowElement);
      }
      next = next.nextElementSibling as HTMLZenTableRowElement;
    }

    return descendants;
  }

  allRows(target: HTMLZenTableHeaderElement): HTMLZenTableRowElement[] {
    const allRows = [];
    let next = target.nextElementSibling as HTMLZenTableRowElement;
    while (next) {
      allRows.push(next);
      next = next.nextElementSibling as HTMLZenTableRowElement;
    }
    return allRows;
  }

  render(): HTMLTableElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
