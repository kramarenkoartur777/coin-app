import { GO_DETAIL_NEWS, BACK_TOP } from './const';

export const goDetailNews = (item, num) => {
  return (dispatch) => {
    dispatch({type: GO_DETAIL_NEWS, item: item, num: num})
  }
};
export const backNews = () => {
  return (dispatch) => {
    dispatch({type: BACK_TOP})
  }
};
