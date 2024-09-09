import { createIntlNumberFormat, DigitsInfoString } from "./number-formatter";
import { FormatterFunction } from "./formatter-function";

/**
 * Format a number as percentage - expects a value between 0 and 1 unless base is provided.
 *
 * @param {string} locale
 * @param {DigitsInfo} [digitsInfo]
 * @param {string} [display=symbol] symbol, none
 * @param {number} [base=1]
 */
export function getPercentageFormatter(
  locale: string,
  digitsInfo: DigitsInfoString = '',
  display: string = 'symbol',
  base: number = 1,
): FormatterFunction {
  const _display = (['none', 'symbol'].indexOf(display) >= 0) ? display : 'symbol';
  const _base = base || 1;
  const _formatter = createIntlNumberFormat(
    locale,
    {
      style: display === 'symbol' ? 'percent' : 'decimal',
      useGrouping: true
    },
    digitsInfo
  );
  return (value: string | number) => {
    const scaled = (+value / _base);
    return _formatter.format(_display === 'symbol' ? scaled : (scaled * 100));
  }
}
