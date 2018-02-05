import { GO_DETAIL_NEWS, BACK_TOP, LIKED_DETAIL_NEWS, FETCH_DATA } from './const';

export const goDetailNews = (item, index) => {
  return (dispatch) => {
    dispatch({type: GO_DETAIL_NEWS, item: item, index: index, })
  }
};
export const fetchData2 = (data2) => {
  return (dispatch) => {
    dispatch({type: FETCH_DATA, data2: data2 })
  }
};
export const backNews = () => {
  return (dispatch) => {
    dispatch({type: BACK_TOP})
  }
};
export const likedDetailNews = () => {
  return (dispatch) => {
    dispatch({type: LIKED_DETAIL_NEWS, isLiked: isLiked})
  }
};
