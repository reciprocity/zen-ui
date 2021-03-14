import { h, Component, Host, Element, Listen } from '@stencil/core';

@Component({
  tag: 'zen-table',
  styleUrl: 'zen-table.scss',
  shadow: true,
})
export class ZenTable {
  @Element() host: HTMLZenTableElement;

  expandedChanged(target: HTMLZenTableRowElement, expanded: boolean): void {
    target.expanded = expanded;

    this.descendants(target).forEach(n => {
      n.visible = expanded;
      n.expanded = expanded;
    });
  }

  selectedChanged(target: HTMLZenTableRowElement, selected: boolean): void {
    target.selected = selected;

    this.descendants(target).forEach((n: HTMLZenTableRowElement) => {
      n.selected = selected;
    });
  }

  headerSelectedChanged(target: HTMLZenTableHeaderElement, selected: boolean): void {
    target.selected = selected;

    let next = target.nextElementSibling as HTMLZenTableRowElement;
    while (next) {
      next.selected = selected;
      next = next.nextElementSibling as HTMLZenTableRowElement;
    }
  }

  descendants(target: HTMLZenTableRowElement): HTMLZenTableRowElement[] {
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

  @Listen('rowSelected')
  handleRowSelected(ev: MouseEvent): void {
    this.selectedChanged(ev.target as HTMLZenTableRowElement, Boolean(ev.detail));
  }

  @Listen('rowExpanded')
  handleRowExpanded(ev: MouseEvent): void {
    this.expandedChanged(ev.target as HTMLZenTableRowElement, Boolean(ev.detail));
  }

  @Listen('headerSelected')
  handleHeaderSelected(ev: MouseEvent): void {
    this.headerSelectedChanged(ev.target as HTMLZenTableHeaderElement, Boolean(ev.detail));
  }

  render(): HTMLTableElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
