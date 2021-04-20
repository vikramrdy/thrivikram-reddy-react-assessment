/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Theme,
  GridList,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import { IState } from '../store';
import MetricCard from './MetricCard';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: "100%",
      margin: "20px !important",
    },
  }),
);

const getMetricsData = (state: IState) => {
  return state.metrics;
};

const MetricsGridView = () => {
  const classes = useStyles();

  const { selectedMetricsWithMeasurements, liveData } = useSelector(getMetricsData);

  return (
    <div className={classes.root}>
      <GridList cellHeight={100} spacing={16} className={classes.gridList}>
        {selectedMetricsWithMeasurements.map((metricObj) =>
          <MetricCard info={metricObj} liveData={liveData} />
        )}
      </GridList>
    </div>
  );
};

export default MetricsGridView;
