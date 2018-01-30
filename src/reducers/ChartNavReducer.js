import { GO_CHART_INFO, GO_MARKETS_INFO, FETCHING_MARKET_DATA, FETCHING_MARKET_DATA_SUCCESS, FETCHING_MARKET_DATA_FAIL } from '../actions/const';

const INITIAL_STATE = {
  isChartInfo: true,
  isMarketsInfo: false,

  isFetching: false,
  data: [],
  errorMessage: null,

  fetchLimit: 10
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
    case FETCHING_MARKET_DATA:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_MARKET_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      }
    case FETCHING_MARKET_DATA_FAIL:
      return {
        ...state,
        data: action.payload,
        errorMessage: action.err
      }
    default:
      return state;
  }
};

export default ChartNavReducer;
