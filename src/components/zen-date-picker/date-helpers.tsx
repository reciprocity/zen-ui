import getDaysInMonth from 'date-fns/getDaysInMonth';
import getDay from 'date-fns/getDay';
import getMonth from 'date-fns/getMonth';
import setDate from 'date-fns/setDate';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function today(): Date {
  return new Date();
}

export function getDayNumbers(date: Date): number[] {
  const result = [];

  const firstOfMonth = setDate(date, 1);
  const weekDay = getDay(firstOfMonth);
  for (let i = 0; i < weekDay; i++) {
    result.push(0);
  }

  const daysInMonth = getDaysInMonth(date);
  for (let i = 1; i <= daysInMonth; i++) {
    result.push(i);
  }
  return result;
}

export function getMonthName(date: Date): string {
  return monthNames[getMonth(date)];
}
