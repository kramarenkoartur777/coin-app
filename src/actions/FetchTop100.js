import axios from 'axios';
import { apiTop100USD } from './ApiConst';
import { FETCHING_COIN_DATA, FETCHING_COIN_DATA_SUCCESS, FETCHING_COIN_DATA_FAIL } from './const';

const FetchTop100 = () => {
  return (dispatch) => {
    dispatch({type: FETCHING_COIN_DATA});
    return axios.get(`${apiTop100USD}`).then((res) => {
      dispatch({ type: FETCHING_COIN_DATA_SUCCESS, payload: res.data.records})
    }).catch((err) => {
      dispatch({ type: FETCHING_COIN_DATA_FAIL, payload: err.data})
    })
  }
}

export default FetchTop100;
