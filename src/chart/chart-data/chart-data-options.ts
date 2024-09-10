import { FormatterFunction } from "../../value/formatters/formatter-function";


export enum ChartDataOrientation {
  Columns = 'column', // series are columns
  Rows = 'row', // series are rows
}

export interface ChartDataOptions {
  sourceLayout: ChartDataOrientation;
  formatters: {
    label?: FormatterFunction;
    value?: FormatterFunction;
    axis?: FormatterFunction;
  }
}
