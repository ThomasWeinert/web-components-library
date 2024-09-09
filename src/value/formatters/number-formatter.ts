import { FormatterFunction } from "./formatter-function";

/**
 * The string defines the amount of digits.
 *
 * `{minimumIntegerDigits}[.{minimumFractionDigits}[-{maximumFractionDigits}]]`
 *
 * Example 3.14159265359:
 *   * `1` => `3`
 *   * `1.2` => `3.14`
 *   * `1.2-4` => `3.1416`
 *
 * @category Charts
 */
export type DigitsInfoString = string;

export interface DigitsInfoOptions {
  minimumIntegerDigits: number,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
}

export type DigitsInfo = DigitsInfoString | DigitsInfoOptions;

const NumberUnits = [
  'acre',
  'bit',
  'byte',
  'celsius',
  'centimeter',
  'day',
  'degree',
  'fahrenheit',
  'fluid-ounce',
  'foot',
  'gallon',
  'gigabit',
  'gigabyte',
  'gram',
  'hectare',
  'hour',
  'inch',
  'kilobit',
  'kilobyte',
  'kilogram',
  'kilometer',
  'liter',
  'megabit',
  'megabyte',
  'meter',
  'mile',
  'mile-scandinavian',
  'milliliter',
  'millimeter',
  'millisecond',
  'minute',
  'month',
  'ounce',
  'percent',
  'petabyte',
  'pound',
  'second',
  'stone',
  'terabit',
  'terabyte',
  'week',
  'yard',
  'year',
]

function isValidUnit(unit: string) {
  const units = (unit.indexOf('-per-') > 0) ? unit.split('-per-') : [unit];
  return units.reduce(
    (carry, current) => {
      return carry && NumberUnits.indexOf(current) >= 0
    },
    true
  );
}

export function getNumberFormatter(
  locale: string, digitsInfo: DigitsInfoString = '', unit: string = ''
): FormatterFunction {
  const _isValidUnit = isValidUnit(unit);
  const _suffix = _isValidUnit ? '' : (unit.trim() === '' ? '' : '\u00A0' + unit);
  const _formatter = createIntlNumberFormat(
    locale,
    {
      style: _isValidUnit ? 'unit' : 'decimal',
      useGrouping: true,
      unit: _isValidUnit ? unit : undefined,
      unitDisplay: 'short'
    },
    digitsInfo
  );
  return (value: string | number) => {
    return _formatter.format(+value) + _suffix;
  }
}

export function createIntlNumberFormat(
  locale: string,
  options: Intl.NumberFormatOptions,
  digitsInfo: DigitsInfo | DigitsInfoString,
) {
  let info, minimumIntegerDigits = 1, minimumFractionDigits = 0, maximumFractionDigits = 0;
  if (typeof digitsInfo === 'string' && (info = (digitsInfo || '1.0').match(/(\d+)\.(\d+)(?:-(\d+))?/))) {
    minimumIntegerDigits = parseInt(info[1]) || 1;
    minimumFractionDigits = parseInt(info[2]) || 0;
    maximumFractionDigits = parseInt(info[3]) || minimumFractionDigits;
    if (maximumFractionDigits < minimumFractionDigits) {
      maximumFractionDigits = minimumFractionDigits;
    }
  }
  return new Intl.NumberFormat(
    locale,
    {
      ...options,
      minimumIntegerDigits: minimumIntegerDigits,
      minimumFractionDigits: minimumFractionDigits,
      maximumFractionDigits: maximumFractionDigits
    }
  );
}
