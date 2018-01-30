import axios from 'axios';
import { apiMarkets } from './ApiConst';
import { FETCHING_MARKET_DATA, FETCHING_MARKET_DATA_SUCCESS, FETCHING_MARKET_DATA_FAIL } from './const';

const FetchMarkets = () => {
  return (dispatch) => {
    dispatch({type: FETCHING_MARKET_DATA});
    return axios.get(`${apiMarkets}&limit=1000`).then((res) => {
      dispatch({ type: FETCHING_MARKET_DATA_SUCCESS, payload: res.data.records})
    }).catch((err) => {
      dispatch({ type: FETCHING_MARKET_DATA_FAIL, payload: err.data})
    })
  }
}

export default FetchMarkets;
