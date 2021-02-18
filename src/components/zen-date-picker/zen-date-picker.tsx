import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { getDayNumbers, today, getMonthName } from './date-helpers';
import getYear from 'date-fns/getYear';
import {
  faCalendarAlt,
  faChevronDoubleLeft,
  faChevronLeft,
  faChevronRight,
  faChevronDoubleRight,
} from '@fortawesome/pro-regular-svg-icons';

@Component({
  tag: 'zen-date-picker',
  styleUrl: 'zen-date-picker.scss',
  shadow: true,
})
export class ZenDatePicker {
  daysShort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  dayNums = [];

  @State() calendarMonthName = '';
  @State() calendarYear = 1970;
  @State() calendarMonth = today();

  /** Selected date */
  @Prop() readonly formattedDate = '';

  /** Placeholder */
  @Prop() readonly placeholder = 'Select date';

  @Watch('calendarMonth')
  async monthViewedInCalendarChanged(calendarMonth: Date): Promise<void> {
    this.dayNums = getDayNumbers(calendarMonth);
    this.calendarMonthName = getMonthName(calendarMonth);
    this.calendarYear = getYear(calendarMonth);
  }

  connectedCallback(): void {
    this.monthViewedInCalendarChanged(this.calendarMonth);
  }

  render(): HTMLElement {
    return (
      <Host>
        <zen-input placeholder={this.placeholder}>
          <zen-space padding="md none md md" slot="leadingSlot">
            <zen-icon icon={faCalendarAlt}></zen-icon>
          </zen-space>
          {this.formattedDate}
        </zen-input>
        <div class="calendar">
          <zen-space
            class="navigation"
            padding="sm lg"
            slot="leadingSlot"
            horizontal-align="center"
            vertical-align="stretch"
          >
            <zen-icon icon={faChevronDoubleLeft} size="sm"></zen-icon>
            <zen-icon icon={faChevronLeft} size="sm" class="fill"></zen-icon>
            <zen-text align="center" class="date" uppercase bold>
              {this.calendarMonthName} {this.calendarYear}
            </zen-text>
            <zen-icon icon={faChevronRight} size="sm" class="fill"></zen-icon>
            <zen-icon icon={faChevronDoubleRight} size="sm"></zen-icon>
          </zen-space>
          <div class="days">
            <zen-space padding="lg" horizontal-align="space-around">
              {this.daysShort.map(dayName => (
                <zen-text class="day-name">{dayName}</zen-text>
              ))}
            </zen-space>
          </div>
          <zen-space padding="xs lg lg" spacing="none">
            {this.dayNums.map(num => (
              <zen-text class={{ 'day-num': true, empty: !num }} align="center">
                {num || ''}
              </zen-text>
            ))}
          </zen-space>
        </div>
      </Host>
    );
  }
}
