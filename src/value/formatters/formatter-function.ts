/**
 * interface for value formatters
 *
 * @category Formatters
 */
export type FormatterFunction = (value: string | number) => string;

export const PassThroughFormatter = (value: string|number) => `${value}`;
