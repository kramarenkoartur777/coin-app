import { GO_COINS_NAV, GO_NEWS_NAV, GO_TOOLS_NAV, GO_PORTFOLIO_NAV, GO_HAMBURGER, CLOSE_HAMBURGER, GO_MY_FAVORITES, CLOSE_MY_FAVORITES, CLOSE_MY_FAVORITES_NEWS, GO_MY_FAVORITES_NEWS } from '../actions/const';

const INITIAL_STATE = {
  isCoins: true,
  isNews: false,
  isTools: false,
  isPortfolio: false,
  hamburger: false,
  isFavorites: false,
  initFav: true
};

const MenuNavReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case GO_COINS_NAV:
      return {
        ...state,
        isCoins: true,
        isNews: false,
        isTools: false,
        isPortfolio: false,
        hamburger: false,
        isFavorites: false,
        initFav: true
      }
    case GO_NEWS_NAV:
      return {
        ...state,
        isCoins: false,
        isNews: true,
        isTools: false,
        isPortfolio: false,
        hamburger: false,
        isFavorites: false
      }
    case GO_TOOLS_NAV:
      return {
        ...state,
        isCoins: false,
        isNews: false,
        isTools: true,
        isPortfolio: false,
        hamburger: false,
        isFavorites: false
      }
    case GO_PORTFOLIO_NAV:
      return {
        ...state,
        isCoins: false,
        isNews: false,
        isTools: false,
        isPortfolio: true,
        hamburger: false,
        isFavorites: false
      }
    case GO_HAMBURGER:
      return Object.assign({}, state, {
        hamburger: true
      })
    case CLOSE_HAMBURGER:
      return Object.assign({}, state, {
        hamburger: false
      })
    case GO_MY_FAVORITES: {
      return Object.assign({}, state, {
        isCoins: false,
        isNews: false,
        isTools: false,
        isPortfolio: false,
        hamburger: false,
        isFavorites: true,
      })
    }
    case GO_MY_FAVORITES_NEWS: {
      return Object.assign({}, state, {
        isCoins: false,
        isNews: false,
        isTools: false,
        isPortfolio: false,
        hamburger: false,
        isFavorites: true,
        initFav: false
      })
    }
    case CLOSE_MY_FAVORITES: {
      return Object.assign({}, state, {
        isFavorites: false,
        isCoins: true,
      })
    }
    case CLOSE_MY_FAVORITES_NEWS:
      return Object.assign({}, state, {
        isFavorites: false,
        isNews: true
      })
    default:
      return state;
  }
};

export default MenuNavReducer;
