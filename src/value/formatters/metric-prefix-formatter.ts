import { createIntlNumberFormat } from "./number-formatter";
import { FormatterFunction } from "./formatter-function";


const MetricPrefixes: {[key: string]: [string, number]} =  {
  peta: ['P', 1000000000000000],
  tera: ['T', 1000000000000],
  giga: ['G', 1000000000],
  mega: ['M', 1000000],
  kilo: ['k', 1000],
  milli: ['m', 0.001],
  micro: ['μ', 0.000001],
  nano: ['n', 0.000000001],
};

export function getMetricPrefixFormatter(
  locale: string,
  digitsInfo = '1.0-2',
  prefix: string = 'auto'
): FormatterFunction {
  const _prefix = prefix || '';
  const _formatter = createIntlNumberFormat(
    locale,
    {
      style: 'decimal',
      useGrouping: true
    },
    digitsInfo
  );
  return (value: string | number) => {
    if (_prefix in MetricPrefixes) {
      const factor: number = MetricPrefixes[_prefix][1];
      const output = (+value / factor);
      return (
        Math.abs(output) < 0.01
          ? '0'
          : _formatter.format(output) + MetricPrefixes[_prefix][0]
      );
    }
    const output = Object.values(MetricPrefixes).reduce(
      (carry, [unit, factor]) => {
        if (!carry) {
          const rounded = +value / factor;
          if (rounded >= 1 && rounded < 1000) {
            return _formatter.format(rounded) + unit
          }
        }
        return carry;
      },
      undefined as (undefined | string)
    );
    return output || (+value).toFixed();
  }
}
