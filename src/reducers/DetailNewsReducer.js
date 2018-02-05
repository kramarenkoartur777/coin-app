import { GO_DETAIL_NEWS, BACK_TOP, LIKED_DETAIL_NEWS, FETCH_DATA } from '../actions/const';

const INITIAL_STATE = {
  isDetail: false,
  detailOut: true,
  isLiked: false,
  data: [],
  data2: []
};

const DetailNewsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case GO_DETAIL_NEWS:
      return {
        ...state,
        isDetail: true,
        detailOut: !state.isDetail,
        data: action.item,
      }
    case FETCH_DATA:
      return {
        ...state,
        data2: action.data2
      }
    case LIKED_DETAIL_NEWS:
      return {
        ...state,
        isLiked: action.isLiked
      }
    case BACK_TOP:
      return {
        ...state,
        isDetail: false,
        data: [],
      }
    default:
      return state;
  }
};

export default DetailNewsReducer;
