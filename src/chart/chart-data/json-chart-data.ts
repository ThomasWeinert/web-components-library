import { ChartDataOptions } from "./chart-data-options";
import { createChartDataFromArray } from "./array-chart-data";
import { ChartData } from "./chart-data";


export function createChartDataFromJson(
  json: string, options: Partial<ChartDataOptions>
) {
  if (json.trim() === '') {
    console.warn(new Error(`Empty data source for chart.`));
  }
  try {
    const source = JSON.parse(json);
    if (source instanceof Array) {
      return createChartDataFromArray(source, options);
    }
  } catch (error) {
    console.warn(new Error(`Failed to parse JSON data string: ${error} - "${json.substring(0, 20)}"`));
  }
  return new ChartData([], [], options);
}
