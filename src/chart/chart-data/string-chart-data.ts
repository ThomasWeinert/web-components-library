import { ChartDataOptions } from "./chart-data-options";
import { createChartDataFromJson } from "./json-chart-data";
import { createChartDataFromMarkdown } from "./markdown-chart-data";


export function createChartDataFromString(
  content: string, options: Partial<ChartDataOptions>
) {
  const data = content.trim();
  if (data.trim() === '') {
    console.warn(new Error(`Empty data source for chart.`));
  }
  if (['{', '['].includes(data[0])) {
    return createChartDataFromJson(data, options);
  }
  return createChartDataFromMarkdown(data, options);
}
