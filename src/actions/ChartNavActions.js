import { GO_CHART_INFO, GO_MARKETS_INFO, BACK_CHART } from './const';

export const goChartInfo = () => {
  return (dispatch) => {
    dispatch({type: GO_CHART_INFO})
  }
};

export const goMarketsInfo = () => {
  return (dispatch) => {
    dispatch({type: GO_MARKETS_INFO})
  }
};

export const backChart = () => {
  return (dispatch) => {
    dispatch({type: BACK_CHART})
  }
};
