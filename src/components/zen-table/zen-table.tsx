import { h, Component, Host, Element, Listen } from '@stencil/core';

@Component({
  tag: 'zen-table',
  styleUrl: 'zen-table.scss',
  shadow: true,
})
export class ZenTable {
  @Element() host: HTMLZenTableElement;

  @Listen('rowSelected')
  handleRowSelected(ev: CustomEvent): void {
    const target = ev.target as HTMLZenTableRowElement;
    const selected = ev.detail;

    this.rowDescendants(target).forEach((n: HTMLZenTableRowElement) => {
      n.selected = selected;
    });
  }

  @Listen('rowExpanded')
  handleRowExpanded(ev: CustomEvent): void {
    const target = ev.target as HTMLZenTableRowElement;
    const expanded = ev.detail;

    if (expanded) {
      this.children(target).forEach(n => {
        n.visible = true;
        n.classList.add('expanded-bg');
      });
    } else {
      this.rowDescendants(target).forEach(n => {
        n.visible = false;
        n.expanded = false;
        n.classList.remove('expanded-bg');
      });
    }
  }

  @Listen('headerSelected')
  handleHeaderSelected(ev: CustomEvent): void {
    const target = ev.target as HTMLZenTableHeaderElement;
    const selected = ev.detail;

    let next = target.nextElementSibling as HTMLZenTableRowElement;
    while (next) {
      next.selected = selected;
      next = next.nextElementSibling as HTMLZenTableRowElement;
    }
  }

  children(target: HTMLZenTableRowElement): HTMLZenTableRowElement[] {
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

  render(): HTMLTableElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
