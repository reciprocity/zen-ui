import { h, Component, Host, Prop, Element } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';

@Component({
  tag: 'zen-table-cell',
  styleUrl: 'zen-table-cell.scss',
  shadow: true,
})
export class ZenTableCell {
  @Element() host: HTMLZenTableCellElement;

  /** Spans through whole table */
  @Prop({ reflect: true }) readonly fullSpan: boolean = false;

  /** Can be expanded */
  @Prop({ reflect: true, attribute: 'expandable', mutable: true }) $expandable = false;

  /** Show checkbox */
  @Prop({ reflect: true, attribute: 'selectable', mutable: true }) $selectable = false;

  /** Is row selected */
  @Prop({ reflect: true, attribute: 'selected', mutable: true }) $selected = false;

  /** Is row expanded */
  @Prop({ reflect: true, attribute: 'expanded', mutable: true }) $expanded = false;

  /** Is row expanded */
  @Prop({ reflect: true, attribute: 'depth', mutable: true }) $depth = 0;

  /** Cell is inside header  */
  @Prop({ reflect: true, attribute: 'header', mutable: true }) $header = false;

  /** Checkbox indeterminate state  */
  @Prop({ attribute: 'indeterminate', mutable: true }) $indeterminate = false;

  /** Never shrink this cell to less than content width */
  @Prop({ reflect: true }) readonly noShrink: boolean = false;

  /** Cell remains fixed at the top during scroll */
  @Prop({ reflect: true, attribute: 'sticky', mutable: true }) $sticky = false;

  /** Cell custom background color */
  @Prop() readonly backgroundColor: string = '';

  /** Row is placed right after header (auto calculated) */
  @Prop({ reflect: true, attribute: 'after-header' }) readonly $afterHeader: boolean = false;

  isFirstCell(): boolean {
    return !this.host.previousElementSibling;
  }

  showWidgets(): boolean {
    const isFirstCell = this.isFirstCell();
    return isFirstCell && (this.$selectable || this.$expandable);
  }

  parentRow(): HTMLZenTableRowElement {
    return this.host.parentElement as HTMLZenTableRowElement;
  }

  onExpandArrowClick(): void {
    this.parentRow().expanded = !this.parentRow().expanded;
  }

  onCheckboxChange(event: Event): void {
    this.parentRow().selected = (event.target as HTMLZenCheckboxElement).checked;
  }

  onCheckboxClick(event: CustomEvent): void {
    const payload = {
      detail: { checked: (event.target as HTMLZenCheckboxElement).checked },
      bubbles: true,
      composed: true,
    };
    this.host.dispatchEvent(new CustomEvent('cellcheckboxclick', payload));
  }

  loadParentRowProps(): void {
    const parentRow = this.parentRow();
    if (!parentRow) return;

    this.$selectable = parentRow.selectable;
    this.$selected = parentRow.selected;
    this.$expandable = parentRow.$expandable;
    this.$expanded = parentRow.expanded;
    this.$depth = parentRow.depth;
    this.$header = parentRow.header;
    this.$sticky = parentRow.sticky;
    this.$indeterminate = parentRow.$indeterminate;
  }

  componentWillLoad(): void {
    // All parent props need to be set here,
    //   to prevent initial flickering (checkbox shown with delay)!
    // bigfix: https://reciprocitylabs.atlassian.net/browse/PLAT-2264
    this.loadParentRowProps();
  }

  render(): HTMLTableCellElement {
    const ZenCheckBox = applyPrefix('zen-checkbox', this.host);
    const ZenIcon = applyPrefix('zen-icon', this.host);
    return (
      <Host style={{ backgroundColor: this.backgroundColor }}>
        {this.showWidgets() && (
          <div class="widgets">
            <ZenCheckBox
              indeterminate={this.$indeterminate}
              class={{ checkbox: true, invisible: !this.$selectable }}
              checked={this.$selected}
              onZenChange={event => this.onCheckboxChange(event)}
              onZenClick={event => this.onCheckboxClick(event)}
            />
            <ZenIcon
              class={{ 'expand-icon': true, invisible: !this.$expandable }}
              size="sm"
              padding="lg"
              icon={faChevronRight}
              onClick={() => this.onExpandArrowClick()}
            />
          </div>
        )}
        <slot />
      </Host>
    );
  }
}
