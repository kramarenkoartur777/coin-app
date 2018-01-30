import { FETCHING_COIN_DATA, FETCHING_COIN_DATA_SUCCESS, FETCHING_COIN_DATA_FAIL } from '../actions/const';

const INITIAL_STATE = {
  isFetching: false,
  data: [],
  errorMessage: null
};

const CoinsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case FETCHING_COIN_DATA:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_COIN_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      }
    case FETCHING_COIN_DATA_FAIL:
      return {
        ...state,
        data: action.payload,
        errorMessage: action.err
      }
    default:
      return state;
  }
};

export default CoinsReducer;
