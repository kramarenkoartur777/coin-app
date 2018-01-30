import { GO_COINS_NAV, GO_NEWS_NAV, GO_TOOLS_NAV, GO_PORTFOLIO_NAV } from '../actions/const';

const INITIAL_STATE = {
  isCoins: false,
  isNews: true,
  isTools: false,
  isPortfolio: false
};

const MenuNavReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case GO_COINS_NAV:
      return {
        ...state,
        isCoins: true,
        isNews: false,
        isTools: false,
        isPortfolio: false
      }
    case GO_NEWS_NAV:
      return {
        ...state,
        isCoins: false,
        isNews: true,
        isTools: false,
        isPortfolio: false
      }
    case GO_TOOLS_NAV:
      return {
        ...state,
        isCoins: false,
        isNews: false,
        isTools: true,
        isPortfolio: false
      }
    case GO_PORTFOLIO_NAV:
      return {
        ...state,
        isCoins: false,
        isNews: false,
        isTools: false,
        isPortfolio: true
      }
    default:
      return state;
  }
};

export default MenuNavReducer;
