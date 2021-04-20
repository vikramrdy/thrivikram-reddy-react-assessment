import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';
import { useSelector } from 'react-redux';

import moment from "moment";

import { IState } from '../store';
import { COLORS } from '../colors';

const UNITS: any = {
  "PSI": "y1",
  "%": "y2",
  "F": "y3",
}

export type Measurement = {
  at: any;
  metric: string;
  unit: string;
  value: number;
}

export type Metrics = {
  metric: string;
  measurements: Array<Measurement>;
};


const getMetricsData = (state: IState) => {
  return state.metrics;
};

let chartData: any = [];

function assignMetricsData(metricsWithMeasurements: any): void {
  chartData = metricsWithMeasurements.map((metric: any) => ({
    x: [...metric.measurements].map((m) => moment(m.at).format('LTS')),
    y: [...metric.measurements].map((m) => m.value),
    name: metric.metric,
    yaxis: UNITS[metric.measurements[0].unit],
    type: 'scatter',
    mode: 'lines',
    line: { color: COLORS[metric.metric] },
  }))
}


const MetricGraph = () => {
  const { selectedMetricsWithMeasurements, liveData } = useSelector(getMetricsData);

  useEffect(() => {
    assignMetricsData(selectedMetricsWithMeasurements);
  }, [selectedMetricsWithMeasurements]);

  useEffect(() => {
    const existingMetric = chartData.find((d: any) => d.name === liveData.metric);
    if (existingMetric) {
      const newMeasurementsX = [...existingMetric.x, moment(liveData.at).format('LTS')];
      const newMeasurementsY = [...existingMetric.y, liveData.value];
      const newMetric = {
        ...existingMetric,
        x: newMeasurementsX,
        y: newMeasurementsY
      }
      chartData = chartData.filter((c: any) => c.name !== liveData.metric).concat(newMetric);
    }
  }, [liveData]);

  let range: Array<string> = [];

  if (selectedMetricsWithMeasurements.length) {
    const lastIndex = selectedMetricsWithMeasurements[0].measurements.length - 1;
    range = [moment(selectedMetricsWithMeasurements[0].measurements[0].at).format('LTS'), moment(selectedMetricsWithMeasurements[0].measurements[lastIndex].at).format('LTS')];
  }

  return (
    <Plot
      data={chartData}
      layout={{
        title: 'Metrics',
        width: 1400,
        height: 600,
        xaxis: { title: 'Time', dtick: 5 * 60, range, domain: [0.1, 0.9] },
        yaxis: {
          title: 'PSI',
          dtick: 200,
          titlefont: { color: '#1f77b4' },
          tickfont: { color: '#1f77b4' }
        },
        yaxis2: {
          title: '%',
          titlefont: { color: '#ff7f0e' },
          tickfont: { color: '#ff7f0e' },
          dtick: 10,
          anchor: 'free',
          overlaying: 'y',
          side: 'left'
        },
        yaxis3: {
          title: 'F',
          titlefont: { color: '#d62728' },
          tickfont: { color: '#d62728' },
          dtick: 200,
          anchor: 'x',
          overlaying: 'y',
          side: 'right'
        },
      }}
    />
  );
};

export default MetricGraph;
