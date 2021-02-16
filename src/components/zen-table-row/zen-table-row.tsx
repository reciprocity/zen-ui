import { h, Component, Host, State, Prop, Watch, Element } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';

@Component({
  tag: 'zen-table-row',
  styleUrl: 'zen-table-row.scss',
  shadow: true,
})
export class ZenTableRow {
  private indentPadding = 2;
  private children = [];

  @Element() element: HTMLZenTableRowElement;

  @State() padding = '0';

  /** Is row visible */
  @Prop({ mutable: true }) visible = true;

  /** Is this row a child */
  @Prop() readonly child = false;

  /** Depth position of row */
  @Prop() readonly depth: number = 0;

  getRowChildren(): HTMLZenTableRowElement[] {
    const children = [];
    let next = this.element.nextElementSibling;
    console.log('next', next);
    // Return
    if (!next) return children;
    console.log('next after', next);

    // Get all rows that have depth greater then the parent
    while (next) {
      const depth = parseInt(next.getAttribute('depth'), 10);
      console.log('next', next);
      console.log('depth', depth);
      if (!depth) break;
      console.log('this.depth', this.depth);
      if (depth !== this.depth + 1) {
        if (this.depth < depth || depth == this.depth) break;
        continue;
      }

      children.push(next as HTMLZenTableRowElement);
      next = next.nextElementSibling;
      if (!next) return children;
    }

    return children;
  }

  onClick(): void {
    const children = this.children;
    console.log('ONCLICK');
    console.log('children', children);

    // Show all children rows
    if (children && !children[0]) return;
    const currentlyExpanded = children[0].visible;
    for (const child of children) {
      child.visible = !currentlyExpanded;
    }
  }

  @Watch('depth')
  depthChanged(depth: number): void {
    console.log('DEPTH CHANGED', depth);
    this.padding = (depth * this.indentPadding).toString() + 'rem';
  }

  componentDidLoad(): void {
    if (this.child) this.visible = false;
    this.depthChanged(this.depth);
    this.children = this.getRowChildren();
  }

  render(): HTMLTableRowElement {
    const ZenCheckBox = applyPrefix('zen-checkbox', this.element);
    const ZenIcon = applyPrefix('zen-icon', this.element);
    //const ZenTableCell = applyPrefix('zen-table-cell', this.element);
    return (
      <Host class={{ hidden: !this.visible }}>
        <div class="container" style={{ 'padding-left': this.padding }}>
          <ZenCheckBox class="checkbox" />
          <ZenIcon
            class={{ 'expand-icon': true, 'not-visible': this.children.length == 0 }}
            size="sm"
            padding="sm"
            icon={faChevronRight}
            onClick={() => this.onClick()}
          />
        </div>
        <slot></slot>
      </Host>
    );
  }
}
