import { DISLIKES_POST, LIKED_POST, LIKED_POST_LENGTH } from './const';

export const likedPost = (data) => {
  return (dispatch) => {
    dispatch({type: LIKED_POST, data: data})
  }
};
export const disLikesPost = (index) => {
  return (dispatch) => {
    dispatch({type: DISLIKES_POST, index: index})
  }
};
