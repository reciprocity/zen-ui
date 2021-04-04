import { h, Component, Host } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { faChevronRight } from '@fortawesome/pro-light-svg-icons';

@Component({
  tag: 'zen-table-cell',
  styleUrl: 'zen-table-cell.scss',
  shadow: true,
})
export class ZenTableCell {
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
