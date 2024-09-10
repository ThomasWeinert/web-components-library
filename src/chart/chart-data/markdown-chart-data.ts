import { ChartDataOptions } from "./chart-data-options";
import { createChartDataFromArray } from "./array-chart-data";

export function createChartDataFromMarkdown(
  markdown: string, options: Partial<ChartDataOptions>
) {
  const data = [];
  const rows = markdown.match(/^\s*\|.+\|\s*$/mg);
  if (rows && rows.length > 1) {
    for (let i = 0, c = rows.length; i < c; i++) {
      if (rows[i].match(/^\s*\|[:-]+\|/)) {
        continue;
      }
      const dataRow = (rows[i].match(/\|[^|\n]+/g) || []).map(
        (value) => value.replace(/^\s*\|\s*|\s*\|\s*$/g, '').trim()
      );
      data.push(dataRow);
    }
  }
  return createChartDataFromArray(data, options);
}
