/* eslint-disable jsx-quotes */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable quotes */
import React, { useState, useEffect } from 'react';
import {
    GridListTile,
    GridListTileBar,
    makeStyles,
} from '@material-ui/core';

import { COLORS } from '../colors';

const useStyles = makeStyles({
    gridList: {
        width: "90%",
        margin: "10px !important",
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    tile: {
        width: '12% !important',
        margin: 10,
        height: 100,
        padding: "0px !important",
        backgroundColor: "palevioletred"
    },
});

const MetricCard = (props: any) => {
    const classes = useStyles();
    const [metric, setMetric] = useState({ metric: '', unit: '', value: '' });
    const filterByMetric = [props.liveData].find((m) => m.metric === props.info.metric);
    const newValue = filterByMetric !== undefined ? filterByMetric : metric;

    useEffect(() => {
        if (newValue !== undefined) {
            setMetric(newValue);
        }
    }, [newValue]);

    return (
        <GridListTile classes={{ root: classes.tile }} style={{ backgroundColor: COLORS[props.info.metric] }} key={props.info.metric}>
            <p style={{ textAlign: "center", verticalAlign: "middle" }}>{props.info.metric}</p>
            <GridListTileBar title={`${metric.value} - ${metric.unit}`} />
        </GridListTile>
    );
};

export default MetricCard;
