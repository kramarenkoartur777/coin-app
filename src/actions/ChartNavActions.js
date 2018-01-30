import { GO_CHART_INFO, GO_MARKETS_INFO } from './const';

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
