export type StockChartPoint = {
  time: string;
  close: number;
};

export type ChartPointAddedUpdate = {
  type: 'CHART_POINT_ADDED';
  symbol: string;
  data: {
    interval: string;
    point: StockChartPoint;
  };
};

export type StockChartSocketUpdate = ChartPointAddedUpdate;
