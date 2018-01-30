import { GO_DETAIL_NEWS, BACK_TOP } from '../actions/const';

const INITIAL_STATE = {
  isDetail: false,
  items: [],
  num: []
};

const DetailNewsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case GO_DETAIL_NEWS:
      return {
        ...state,
        isDetail: true,
        data: action.item,
        num: action.num
      }
    case BACK_TOP:
      return {
        ...state,
        isDetail: false,
        items: [],
        num: []
      }
    default:
      return state;
  }
};

export default DetailNewsReducer;
