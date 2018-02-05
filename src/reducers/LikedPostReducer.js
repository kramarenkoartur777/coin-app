import { LIKED_POST, LIKED_POST_LENGTH, DISLIKES_POST } from '../actions/const';

const LikedPostReducer = (state = [], action) => {
  switch(action.type){
    case LIKED_POST:
      return [
          ...state,
          {
            key: action.data,
            completed: false
          }
        ]
    case DISLIKES_POST:
      return [
      ...state.slice(0, action.index),
      ...state.slice(action.index + 1)
    ]
    default:
      return state;
  }
};

export default LikedPostReducer;
