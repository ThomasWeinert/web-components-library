import { WebComponent } from "../../lifecycle/web-component";
import { delay } from "../../lifecycle/delay";
import { EChartsInstance } from "./echarts-types";

import styles from './echart.styles.scss';

declare global {
  interface Window {
    echarts: any;
  }
}

@WebComponent('wct-echart')
export class EChartComponent extends HTMLElement {

  private _options: Record<string, any> = {};

  private readonly _elements: {
    chart: HTMLDivElement;
  };
  private _echartsInstance?: EChartsInstance;

  public constructor() {
    super();
    const style = document.createElement('style');
    style.textContent = styles;

    const chart = document.createElement('div');
    chart.classList.add('chart');

    this._elements = {chart}

    const shadowRoot = this.attachShadow({mode: 'closed'});
    shadowRoot.append(style, chart);
  }

  private readonly _resizeObserver = new ResizeObserver(
    () => {
      if (this.isValid() && this._echartsInstance) {
        this._echartsInstance.resize();
      }
    }
  );

  public isValid(): boolean {
    return !!(this._echartsInstance && !this._echartsInstance.isDisposed());
  }

  public set options(value: Record<string, any>) {
    this._options = value;
    this.getChartInstance().then(
      (instance) => {
        instance.setOption(this._options);
        if (!this._elements.chart.classList.contains('loaded')) {
          this._elements.chart.classList.add('loaded');
        }
      }
    );
  }

  public get options() {
    return this._options;
  }

  private async getChartInstance(): Promise<EChartsInstance> {
    if (this._echartsInstance) {
      return this._echartsInstance;
    }
    const echarts = await getECharts();
    const instance = echarts.init(this._elements.chart);
    if (!instance) {
      throw new Error('Failed to initialize ECharts instance.');
    }
    this._echartsInstance = instance;
    return instance;
  }
}

async function getECharts(tries = 10) {
  if (window.echarts) {
    return window.echarts;
  } else if (tries > 0) {
    await delay(500);
    return getECharts(tries - 1);
  }
  throw new Error('Echarts not found.');
}
