import { GO_CHART_INFO, GO_MARKETS_INFO, BACK_CHART } from '../actions/const';

const INITIAL_STATE = {
  isChartInfo: true,
  isMarketsInfo: false,

};

const ChartNavReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case GO_CHART_INFO:
      return {
        ...state,
        isChartInfo: true,
        isMarketsInfo: false,
      }
    case GO_MARKETS_INFO:
      return {
        ...state,
        isMarketsInfo: true,
        isChartInfo: false
      }
    case BACK_CHART:
      return {
        ...state,
        isMarketsInfo: false,
        isChartInfo: true
      }
    default:
      return state;
  }
};

export default ChartNavReducer;
