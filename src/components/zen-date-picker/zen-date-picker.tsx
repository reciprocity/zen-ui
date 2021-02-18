import { Component, Host, h, Prop, Watch, State } from '@stencil/core';
import { getDayNumbers, today, getMonthName } from './date-helpers';
import getYear from 'date-fns/getYear';
import addMonths from 'date-fns/addMonths';
import addYears from 'date-fns/addYears';
import subMonths from 'date-fns/subMonths';
import subYears from 'date-fns/subYears';
import format from 'date-fns/format';
import setDate from 'date-fns/setDate';
import {
  faCalendarAlt,
  faChevronDoubleLeft,
  faChevronLeft,
  faChevronRight,
  faChevronDoubleRight,
} from '@fortawesome/pro-regular-svg-icons';

enum Navigate {
  prevMonth,
  prevYear,
  nextMonth,
  nextYear,
}

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
  @Prop({ mutable: true }) formattedDate = '';

  /** Placeholder */
  @Prop() readonly placeholder = 'Select date';

  /** Date format */
  @Prop() readonly format = 'MM/dd/yyyy';

  /** Selected date */
  @Prop({ mutable: true }) value: Date = today();

  @Watch('value')
  async dateChanged(value: Date): Promise<void> {
    this.formattedDate = format(value, this.format);
    this.calendarMonth = value;
  }

  @Watch('calendarMonth')
  async monthViewedInCalendarChanged(calendarMonth: Date): Promise<void> {
    this.dayNums = getDayNumbers(calendarMonth);
    this.calendarMonthName = getMonthName(calendarMonth);
    this.calendarYear = getYear(calendarMonth);
  }

  connectedCallback(): void {
    this.dateChanged(this.value);
  }

  navigate(type: Navigate): void {
    switch (type) {
      case Navigate.prevMonth:
        this.calendarMonth = subMonths(this.calendarMonth, 1);
        break;
      case Navigate.nextMonth:
        this.calendarMonth = addMonths(this.calendarMonth, 1);
        break;
      case Navigate.prevYear:
        this.calendarMonth = subYears(this.calendarMonth, 1);
        break;
      case Navigate.nextYear:
        this.calendarMonth = addYears(this.calendarMonth, 1);
        break;
    }
  }

  selectDay(day: number): void {
    if (!day) return;
    this.value = setDate(this.calendarMonth, day);
  }

  isSelected(day: number): boolean {
    if (!day) return false;

    const itemDate = setDate(this.calendarMonth, day);
    const itemDateFormatted = format(itemDate, this.format);
    return itemDateFormatted === this.formattedDate;
  }

  render(): HTMLElement {
    return (
      <Host>
        <sb-zen-input placeholder={this.placeholder} value={this.formattedDate}>
          <sb-zen-space padding="md none md md" slot="leadingSlot">
            <sb-zen-icon icon={faCalendarAlt}></sb-zen-icon>
          </sb-zen-space>
        </sb-zen-input>
        <div class="calendar">
          <sb-zen-space
            class="navigation"
            padding="sm lg"
            slot="leadingSlot"
            horizontal-align="center"
            vertical-align="stretch"
          >
            <sb-zen-icon
              icon={faChevronDoubleLeft}
              size="sm"
              onClick={() => this.navigate(Navigate.prevYear)}
            ></sb-zen-icon>
            <sb-zen-icon
              icon={faChevronLeft}
              size="sm"
              class="fill"
              onClick={() => this.navigate(Navigate.prevMonth)}
            ></sb-zen-icon>
            <sb-zen-text align="center" class="date" uppercase bold>
              {this.calendarMonthName} {this.calendarYear}
            </sb-zen-text>
            <sb-zen-icon
              icon={faChevronRight}
              size="sm"
              class="fill"
              onClick={() => this.navigate(Navigate.nextMonth)}
            ></sb-zen-icon>
            <sb-zen-icon
              icon={faChevronDoubleRight}
              size="sm"
              onClick={() => this.navigate(Navigate.nextYear)}
            ></sb-zen-icon>
          </sb-zen-space>
          <div class="days">
            <sb-zen-space padding="lg" horizontal-align="space-around">
              {this.daysShort.map(dayName => (
                <sb-zen-text class="day-name">{dayName}</sb-zen-text>
              ))}
            </sb-zen-space>
          </div>
          <sb-zen-space padding="xs lg lg" spacing="none">
            {this.dayNums.map(num => (
              <sb-zen-text
                class={{
                  'day-num': true,
                  empty: !num,
                  selected: this.isSelected(num),
                }}
                align="center"
                onClick={() => {
                  this.selectDay(num);
                }}
              >
                {num || ''}
              </sb-zen-text>
            ))}
          </sb-zen-space>
        </div>
      </Host>
    );
  }
}
