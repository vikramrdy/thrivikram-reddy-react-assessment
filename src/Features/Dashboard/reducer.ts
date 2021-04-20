import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Measurements = {
    at: any;
    metric: string;
    unit: string;
    value: string;
}

export type LiveMetricsTypes = {
    liveData: Array<Object>;
    metric: string;
    value: string;
    at: string;
    unit: string;
};

export type Metrics = {
    metric: string;
    measurements: Array<Measurements>;
};

export type ApiErrorAction = {
    error: string;
};

export type InitialState = {
    selectedMetricsWithMeasurements: Array<Metrics>;
    liveData: Measurements;
};

const initialState: InitialState = {
    selectedMetricsWithMeasurements: [],
    liveData: { at: "", metric: "", value: "", unit: "" },
};

const slice = createSlice({
    name: 'MetricsData',
    initialState,
    reducers: {
        metricsApiDataRecevied: (state, action: PayloadAction<Array<Metrics>>) => {
            state.selectedMetricsWithMeasurements = action.payload;
        },
        metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
        metricLiveDataRecevied: (state, action: PayloadAction<LiveMetricsTypes>) => {
            state.liveData = action.payload;
        },
    },
});

export const { reducer } = slice;
export const { actions } = slice;
