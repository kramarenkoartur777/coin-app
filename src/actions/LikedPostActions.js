import { DISLIKES_POST, LIKED_POST } from './const';

export const likedPost = (data) => {
  return (dispatch) => {
    dispatch({type: LIKED_POST, data: data})
  }
};
export const disLikesPost = () => {
  return (dispatch) => {
    dispatch({type: DISLIKES_POST})
  }
};
