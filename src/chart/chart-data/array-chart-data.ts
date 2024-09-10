import { ChartDataOptions, ChartDataOrientation } from "./chart-data-options";
import { ChartData, ChartDataDimension, ChartDataRecord } from "./chart-data";


export function createChartDataFromArray(
  data: (string|number)[][], options: Partial<ChartDataOptions>
) {
  let dimensions: ChartDataDimension[] = [];
  let records: ChartDataRecord[] = [];
  if (options.sourceLayout === ChartDataOrientation.Rows) {
    dimensions = data.map(
      (row, index) => new ChartDataDimension(
        `${row[0] || index}`,
        {
          formatter: index > 0 ? options.formatters?.value : options.formatters?.label
        }
      )
    );
    records = data.reduce(
      (carry, row, rowIndex) => {
        const dimension = `${row[0] || rowIndex}`;
        row.slice(1).forEach(
          (value, index) => {
            if (!carry[index]) {
              carry[index] = {};
            }
            carry[index][dimension] = value;
          }
        );
        return carry;
      },
      [] as Record<string, string|number>[]
    ).map(
      (values) => new ChartDataRecord(values)
    );
  } else {
    dimensions = (data[0] || []).map(
      (name, index) => new ChartDataDimension(
        `${name || index}`,
        {
          formatter: index > 0 ? options.formatters?.value : options.formatters?.label
        }
      )
    );
    records = data.slice(1).map(
      (row) => {
        return new ChartDataRecord(
          row.reduce(
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
  }
  return new ChartData(
    dimensions,
    records,
    options
  );
}
