import { webComponent } from "../lifecycle/web-component";
import { AttributeChanged } from "../lifecycle/attribute-changed";
import { ChartData } from "./chart-data/chart-data";
import { EChartComponent } from "./echarts/echart.component";

import styles from './chart.styles.scss';
import { createChartDataFromArray } from "./chart-data/array-chart-data";
import { createChartDataFromString } from "./chart-data/string-chart-data";
import { ChartDataOrientation } from "./chart-data/chart-data-options";
import { Connected } from "../lifecycle/connected";

@webComponent('wct-chart')
export class ChartComponent extends HTMLElement implements AttributeChanged, Connected {

  public static observedAttributes = [
    'type', 'source-layout'
  ];

  private readonly _elements: {
    chart: EChartComponent;
  };

  private _seriesType: string = 'line';
  private _sourceLayout: ChartDataOrientation = ChartDataOrientation.Columns;

  public constructor() {
    super();
    const style = document.createElement('style');
    style.textContent = styles;

    const chart = document.createElement('wct-echart') as EChartComponent;
    chart.classList.add('chart');

    this._elements = {chart}

    const shadowRoot = this.attachShadow({mode: 'closed'});
    shadowRoot.append(style, chart);
  }

  private _source?: ChartData | any[][] | string;
  private _chartData?: ChartData;

  public connectedCallback(): void {
    if (!this._source) {
      const source = (this.textContent || '').trim();
      if (source) {
        this._source = source;
        this.updateSource();
        this.update();
      }
    }
  }

  public get source(): ChartData | undefined {
    return this._chartData;
  }

  public set source(value: ChartData | any[][] | string) {
    this._source = value;
    this.updateSource();
    this.update();
  }

  public attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    switch (name) {
      case 'type':
        if (newValue) {
          this._seriesType = (['line', 'bar'].includes(newValue) ? newValue : 'line');
          this.update();
        }
        break;
      case 'source-layout':
        this._sourceLayout = (
          ChartDataOrientation.Rows === newValue
            ? ChartDataOrientation.Rows
            : ChartDataOrientation.Columns
        );
        this.updateSource();
        this.update();
    }
  }

  private updateSource(): void {
    if (this._source instanceof Array) {
      this._chartData = createChartDataFromArray(this._source, {sourceLayout: this._sourceLayout});
    } else if (typeof this._source === 'string') {
      this._chartData = createChartDataFromString(this._source, {sourceLayout: this._sourceLayout});
    } else {
      this._chartData = this._source as ChartData;
    }
  }

  private update() {
    if (!this._chartData) {
      return;
    }
    this._elements.chart.options = {
      grid: {
        top: 10,
        right: 0,
        bottom: 30,
        left: 40,
      },
      yAxis: {
        type: 'value'
      },
      xAxis: {
        type: 'category'
      },
      series: this._chartData.dimensions.slice(1).map(
        (dimension, index) => ({
          type: this._seriesType,
          seriesLayoutBy: 'column',
          yAxisIndex: 0,
        })
      ),
      dataset: this._chartData.dataset
    }
  }
}
