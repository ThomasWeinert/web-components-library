
import { createIntlNumberFormat, DigitsInfoString } from "./number-formatter";
import { FormatterFunction } from "./formatter-function";

/**
 *
 *
 * @param {string} locale
 * @param {string} currency Currency Code: EUR, USD, ...
 * @param {string} [display] symbol, code, name
 * @param {DigitsInfo} [digitsInfo]
 */
export function getCurrencyFormatter(
  locale: string,
  currency: string,
  digitsInfo: DigitsInfoString = '',
  display: string = 'symbol',
): FormatterFunction {
  const _withoutCurrency = display === 'none';
  const _currencyDisplay = (
    _withoutCurrency
      ? 'code'
      : (['symbol', 'code', 'name'].indexOf(display) >= 0 ? display : 'symbol')
  );
  const formatter = createIntlNumberFormat(
    locale,
    {
      style: 'currency',
      currency,
      currencyDisplay: _currencyDisplay as any,
      useGrouping: true
    },
    digitsInfo
  );
  return (value: string | number) => {
    const output = formatter.format(+value);
    if (_withoutCurrency) {
      return output.replace(currency, '').trim();
    }
    return output;
  }
}
