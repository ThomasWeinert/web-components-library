import { FormatterFunction, PassThroughFormatter } from "./formatter-function";
import { getCurrencyFormatter } from "./currency-formatter";
import { getPercentageFormatter } from "./percentage-formatter";
import { getNumberFormatter } from "./number-formatter";
import { getMetricPrefixFormatter } from "./metric-prefix-formatter";



  export function createFormatter(
    identifier: string, locale: string = 'en', options: any[] = []
  ): FormatterFunction {
    switch (identifier) {
      case 'none':
        return () => '';
      case 'currency':
        return getCurrencyFormatter(locale, options[0], options[1], options[2]);
      case 'percent':
      case 'percentage':
        return getPercentageFormatter(locale, options[0], options[1], +options[2]);
      case 'number':
        return getNumberFormatter(locale, options[0], options[1]);
      case 'metric-prefix':
        return getMetricPrefixFormatter(locale, options[0], options[1]);
      default:
        return PassThroughFormatter;
    }
  }

  /**
   * Create a formatter function from the provided type string.
   */
  export function createFormatterFromString(
    identifierAndOptions: string, locale: string = 'en'
  ): FormatterFunction {
    const options = (identifierAndOptions || '').split(':');
    const identifier = options.shift() || '';
    return createFormatter(identifier, locale, options);
  }
