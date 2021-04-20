import { Paper, Grid, makeStyles } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery, useSubscription } from 'urql';

import SelectMetrics from '../../components/SelectMetrics';
import MetricsGridView from '../../components/MetricsGridView';
import { actions } from './reducer';
import MetricGraph from '../../components/MetricGraph';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
  root: {
    margin: 20,
    height: '100%',
  },
});

const query = `query ($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
    value
    metric
    unit
       }
       }
  }
`;

const queryMetricSubscription = `
  subscription {
    newMeasurement{
      metric
      at
      value
      unit
    }
  }
`;

const currentDateTimeStamp = new Date().getTime();
const timeStampBefore30Minutes = Math.floor((currentDateTimeStamp - 30 * 60 * 1000) / 1000.0);

const Dashboard = () => {
  const [metrics, setMetrics] = useState([] as Array<{ title: String }>);
  const classes = useStyles();

  const inputVariables = metrics.map((m) => ({ metricName: m.title, after: timeStampBefore30Minutes }));

  const dispatch = useDispatch();

  const [result] = useQuery({
    query,
    variables: { input: inputVariables },
  });

  const [resultsLiveMetrics] = useSubscription({
    query: queryMetricSubscription,
  });


  const { data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMultipleMeasurements } = data;
    dispatch(actions.metricsApiDataRecevied(getMultipleMeasurements));
  }, [dispatch, data, error]);

  useEffect(() => {
    const { data, error } = resultsLiveMetrics;
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    dispatch(actions.metricLiveDataRecevied(data.newMeasurement));
  }, [dispatch, resultsLiveMetrics]);

  return (
    <div className={classes.root}>
      <Paper elevation={1}>
        <Grid direction="column" container>
          <Grid item xs={12}>
            <SelectMetrics onChange={(values: Array<{ title: String }>) => setMetrics(values)} />
          </Grid>
          <Grid item xs={12}>
            <MetricsGridView />
          </Grid>
          <Grid item xs={12}>
            <MetricGraph />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Dashboard;
