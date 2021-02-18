import getDaysInMonth from 'date-fns/getDaysInMonth';
import getDay from 'date-fns/getDay';
import getMonth from 'date-fns/getMonth';
import setDate from 'date-fns/setDate';
import parse from 'date-fns/parse';
import isValid from 'date-fns/isValid';
import getYear from 'date-fns/getYear';

const defaultSeparator = '/';

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

export function parseDate(str: string, format: string): Date {
  function fixYearShorthand(str: string): string {
    // convert '1.1.19' into '1.1.2019'
    const lastNum = (str.match(/([0-9]+)$/g) || [])[0];
    if (!lastNum || lastNum.length !== 2) return str;

    return str.substr(0, str.length - lastNum.length) + '20' + lastNum;
  }

  function fixMissingYear(str: string): string {
    // convert '1.1.' into '1.1.2021'
    const currentYear = getYear(today());
    const nums = str.match(/\b([0-9]+)\b/g);
    if (!nums || nums.length !== 2) return str;
    return str + ' ' + currentYear;
  }

  function prettifyAndParse(str: string, format: string): Date {
    // turn eg. '1-2. 2020' into '1/2/2020'
    // replace any non-alpha-num char group with a separator:
    const nonAlphaNumChars = format.match(/[^0-9a-zA-Z]/g);
    const separator = nonAlphaNumChars ? nonAlphaNumChars[0] : defaultSeparator;
    str = str.trim().replace(/([^0-9]+)/g, separator);

    return parse(str, format, today());
  }

  str = fixYearShorthand(str.trim());
  str = fixMissingYear(str);

  let result = parse(str, format, today());

  if (!isValid(result)) {
    result = prettifyAndParse(str, format);
  }

  return result;
}
