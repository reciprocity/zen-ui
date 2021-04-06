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

  /** Can be expanded (if has children) */
  @Prop({ reflect: true }) readonly expandable = false;

  /** Show checkbox (read-only) */
  @Prop({ reflect: true }) readonly selectable: boolean = false;

  /** Is row selected */
  @Prop({ reflect: true }) readonly selected = false;

  /** Is row expanded */
  @Prop({ reflect: true }) readonly expanded = false;

  /** Checkbox indeterminate state (Won't update children)  */
  @Prop() readonly $indeterminate: boolean = false;

  render(): HTMLTableCellElement {
    const ZenCheckBox = applyPrefix('zen-checkbox', this.host);
    const ZenIcon = applyPrefix('zen-icon', this.host);
    return (
      <Host>
        {this.showWidgets() && (
          <div class="widgets">
            {this.selectable && (
              <ZenCheckBox
                indeterminate={this.$indeterminate}
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
