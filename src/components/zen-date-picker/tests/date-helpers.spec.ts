import fnsFormat from 'date-fns/format';
import { helpers } from '../date-helpers';
import { getDayNumbers, parseDate, getMonthName } from '../date-helpers';

describe('helpers', () => {
  it('getDayNumbers should works', () => {
    const days = getDayNumbers(new Date(2021, 5 - 1, 12));
    expect(days.length).toBe(37);
    expect(days.slice(0, 6).every(n => n === 0)).toBeTruthy();
    expect(days[6]).toBe(1);
    expect(days[days.length - 1]).toBe(31);
  });
  it('monthNames should return correct names', () => {
    expect(getMonthName(new Date(2020, 1 - 1, 15))).toBe('January');
    expect(getMonthName(new Date(2020, 5 - 1, 1))).toBe('May');
    expect(getMonthName(new Date(2020, 12 - 1, 31))).toBe('December');
  });
});

describe('parseDate', () => {
  const format = date => fnsFormat(date, 'MM/dd/yyyy');
  const dateFormat = 'MM/dd/yyyy';
  beforeEach(() => {
    jest
      .spyOn(helpers, 'today')
      .mockClear()
      .mockImplementation(() => new Date(1972, 2, 18));
  });

  it('should parse a valid date', () => {
    expect(format(parseDate('01/12/2021', dateFormat))).toBe('01/12/2021');
  });
  it('should add missing year', () => {
    expect(format(parseDate('1/1/', dateFormat))).toBe('01/01/1972');
    expect(format(parseDate('1/1', dateFormat))).toBe('01/01/1972');
  });
  it('should fix shorthand year', () => {
    expect(format(parseDate('1/1/01', dateFormat))).toBe('01/01/2001');
  });
  it('should replace invalid separators', () => {
    expect(format(parseDate('1c1.2021', dateFormat))).toBe('01/01/2021');
  });
  it('should replace non-alpha-num char groups with a valid separator', () => {
    expect(format(parseDate('1. 1.//-2021', dateFormat))).toBe('01/01/2021');
  });
  it('should trim date', () => {
    expect(format(parseDate('   01/12/2021  ', dateFormat))).toBe('01/12/2021');
  });
  it('should parse totally messed up date', () => {
    expect(format(parseDate('   1.p++.12+.  ', dateFormat))).toBe('01/12/1972');
  });
});
