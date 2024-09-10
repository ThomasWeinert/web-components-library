export type EChartsConfiguration = {[key:string]: any};
export type EChartsInstance = {
  setOption: (options: EChartsConfiguration) => void
  [key:string]: any
};

export interface EChartsRectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type EChartsDataset = {
  seriesLayoutBy?: 'column' | 'row';
  source: (string | number)[][];
}

export interface EChartsTooltipItem {
  "seriesIndex": number,
  "seriesId": string,
  "seriesName": string,
  "name": string | number,
  "dataIndex": number,
  "data": (string | number)[],
  "value": (string | number)[],
  "color": "#72dada",
}

export interface EChartsTooltipPosition {
  top?: string | number | undefined;
  right?: string | number | undefined;
  bottom?: string | number | undefined;
  left?: string | number | undefined;
}

export type EChartsTooltipPositionCallback = (
  (
    point: Array<number | string>,
    params: object | object[],
    element: HTMLElement,
    rect: object,
    size: object,
  ) => EChartsTooltipPosition
);
