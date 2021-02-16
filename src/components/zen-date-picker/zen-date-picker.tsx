import { Component, Host, h, Prop } from '@stencil/core';
import { faCalendarAlt } from '@fortawesome/pro-regular-svg-icons';

@Component({
  tag: 'zen-date-picker',
  styleUrl: 'zen-date-picker.scss',
  shadow: true,
})
export class ZenDatePicker {
  /** Selected date */
  @Prop() readonly formattedDate = '';

  /** Placeholder */
  @Prop() readonly placeholder = 'Select date';

  render(): HTMLElement {
    return (
      <Host>
        <zen-input placeholder={this.placeholder}>
          <zen-space padding="md none md md" slot="leadingSlot">
            <zen-icon icon={faCalendarAlt}></zen-icon>
          </zen-space>
          {this.formattedDate}
        </zen-input>
      </Host>
    );
  }
}
