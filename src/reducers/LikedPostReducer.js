import { LIKED_POST, DISLIKES_POST } from '../actions/const';

const INITIAL_STATE = {
  isLiked: false,
  data: []
};

const LikedPostReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case LIKED_POST:
      return{
        ...state,
        isLiked: true,
        data: action.data
      }
    case DISLIKES_POST:
      return {
        ...state,
        isLiked: false
      }
    default:
      return state;
  }
};

export default LikedPostReducer;
