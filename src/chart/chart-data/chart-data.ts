import {EChartsDataset} from "../echarts/echarts-types";
import { FormatterFunction } from "../../value/formatters/formatter-function";
import { ChartDataOptions, ChartDataOrientation } from "./chart-data-options";

export interface ChartDataDimensionOptions {
  formatter?: FormatterFunction;
  min?: number;
  max?: number;
}

const DefaultChartDimensionOptions = {
  formatter: undefined,
  min: undefined,
  max: undefined,
}

export class ChartDataDimension {

  public readonly options: ChartDataDimensionOptions;

  public get formatter(): FormatterFunction | undefined {
    return this.options.formatter;
  }

  public get min(): number | undefined {
    return this.options.min;
  }

  public get max(): number | undefined {
    return this.options.max;
  }

  public constructor(
    public readonly name: string,
    options: Partial<ChartDataDimensionOptions>
  ) {
    this.options = {
      ...DefaultChartDimensionOptions,
      ...options
    }
  };

}

export class ChartDataRecord {

  public constructor(
    public readonly values: Record<string, string|number>,
    public readonly children: ChartDataRecord[] = [],
  ) {

  }
}

export class ChartData {

  public readonly options: ChartDataOptions;

  public constructor(
    public readonly dimensions: ChartDataDimension[],
    public readonly records: ChartDataRecord[],
    options: Partial<ChartDataOptions>,
  ) {
    this.options = {
      sourceLayout: ChartDataOrientation.Columns,
      formatters: {},
      ...options
    }
  }

  public getDimensionByName(name: string): ChartDataDimension | undefined {
    return this.dimensions.find((dimension) => dimension.name === name);
  }

  public getSeries(nameOrIndex: string | number) {
    const dimension = (
      typeof nameOrIndex === 'string' ? this.getDimensionByName(nameOrIndex) : this.dimensions[nameOrIndex]
    );
    if (!dimension) {
      return { formatter: undefined, values: []}
    }
    return {
      formatter: dimension.options.formatter,
      values: this.records.map((record) => record.values[dimension.name])
    }
  }

  public getLimits(
    dimensions?: number|string|(number|string)[]
  ): { min?: number, max?: number } {
    if (dimensions === undefined) {
      return this.getLimits(this.dimensions.slice(1).map((dimension) => dimension.name ))
    }
    const properties = (
      dimensions instanceof Array ? dimensions : [dimensions]
    ).map(
      (nameOrIndex) => (
        typeof nameOrIndex === 'string' ? nameOrIndex : this.dimensions[nameOrIndex]?.name
      ) || ''
    );
    return this.records.reduce(
      (carry, record) => properties.reduce(
        (innerCarry, property) => {
          const value = +(record.values[property] || 0);
          innerCarry.min = innerCarry.min !== undefined ? Math.min(innerCarry.min, value) : value;
          innerCarry.max = innerCarry.max !== undefined ? Math.max(innerCarry.max, value) : value;
          return innerCarry;
        },
        carry
      ),
      {
        min: undefined,
        max: undefined,
      } as {
        min?: number
        max?: number
      }
    );
  }

  public get dataset(): EChartsDataset {
    return {
      seriesLayoutBy: 'column',
      source: [
        this.dimensions.map((dimension) => dimension.name),
        ...this.records.map(
          (record) => this.dimensions.map(
            (dimension) => record.values[dimension.name]
          )
        )
      ]
    };
  }
}
