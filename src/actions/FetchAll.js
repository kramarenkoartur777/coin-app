import axios from 'axios';
import { apiAllUSD } from './ApiConst';
import { FETCHING_COIN_DATA, FETCHING_COIN_DATA_SUCCESS, FETCHING_COIN_DATA_FAIL } from './const';

const FetchAll = () => {
  return (dispatch) => {
    dispatch({type: FETCHING_COIN_DATA});
    return axios.get(`${apiAllUSD}&limit=1000`).then((res) => {
      dispatch({ type: FETCHING_COIN_DATA_SUCCESS, payload: res.data.records})
    }).catch((err) => {
      dispatch({ type: FETCHING_COIN_DATA_FAIL, payload: err.data})
    })
  }
}

export default FetchAll;
