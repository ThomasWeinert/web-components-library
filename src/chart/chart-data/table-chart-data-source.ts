import { ChartData, ChartDataDimension, ChartDataDimensionOptions, ChartDataRecord } from "./chart-data";
import { createFormatterFromString } from "../../value/formatters/formatter-factory";
import { ChartDataOptions, ChartDataOrientation } from "./chart-data-options";


function getDimensionOptionsFromCell(cell: HTMLElement): Partial<ChartDataDimensionOptions> {
  return Object.entries({
    formatter: cell.dataset.format ? createFormatterFromString(cell.dataset.format) : undefined,
    min: cell.dataset.min !== undefined  ? +cell.dataset.min : undefined,
    max: cell.dataset.max !== undefined ? +cell.dataset.max : undefined,
  }).reduce(
    (carry, [name, value]) => {
      if (value !== undefined) {
        carry[name as keyof ChartDataDimensionOptions] = value as any;
      }
      return carry;
    },
    {} as Partial<ChartDataDimensionOptions>
  )
}

export function createChartDataFromTable(
  table: HTMLTableElement, options: Partial<ChartDataOptions>
) {
  const tableRows = Array.from(table.querySelectorAll<HTMLElement>('tr'));

  if (options.sourceLayout === ChartDataOrientation.Rows) {
    const {dimensions, values} = tableRows.reduce(
      (carry, tableRow: HTMLElement, index) => {
        const rowOptions = getDimensionOptionsFromCell(tableRow);
        const cells = Array.from(tableRow.querySelectorAll<HTMLElement>('th,td'));
        if (cells.length < 1) {
          return carry;
        }
        const name = cells[0].textContent || `${index}`;
        carry.dimensions.push(
          new ChartDataDimension(
            name,
            {
              formatter: (index > 0 ? options.formatters?.value : options.formatters?.label),
              ...rowOptions,
              ...getDimensionOptionsFromCell(cells[0]),
            }
          )
        )
        const valueCells = cells.slice(1);
        if (carry.values.length < valueCells.length) {
          carry.values = Array.from(Array(valueCells.length)).map(
            (_, index) => carry.values[index] || {}
          );
        }
        valueCells.forEach(
          (cell, index) => {
            carry.values[index][name] = cell.textContent || '';
          }
        );
        return carry;
      },
      {
        dimensions: [],
        values: []
      } as {
        dimensions: ChartDataDimension[],
        values: Record<string, string>[]
      }
    );
    console.log(dimensions);
    return new ChartData(
      dimensions,
      values.map((properties) => new ChartDataRecord(properties)),
      options
    );
  } else {
    const dimensions = Array.from(tableRows[0]?.querySelectorAll<HTMLElement>('th,td') || []).map(
      (cell, index) => {
        return new ChartDataDimension(
          `${cell.textContent || index}`,
          {
            formatter: (index > 0 ? options.formatters?.value : options.formatters?.label),
            ...getDimensionOptionsFromCell(cell)
          }
        )
      }
    );
    const records = tableRows.slice(1).map(
      (tableRow) => {
        const values = Array.from(tableRow.querySelectorAll<HTMLElement>('th,td') || []).map(
          (cell) => cell.textContent || ''
        );
        return new ChartDataRecord(
          values.reduce(
            (carry, value, index) => {
              const dimension = dimensions[index];
              if (dimension) {
                carry[dimension.name] = value;
              }
              return carry;
            },
            {} as Record<string, string|number>
          )
        )
      }
    );
    return new ChartData(
      dimensions,
      records,
      options
    );
  }
}
