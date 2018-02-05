import { GO_COINS_NAV, GO_NEWS_NAV, GO_TOOLS_NAV, GO_PORTFOLIO_NAV, GO_HAMBURGER, CLOSE_HAMBURGER, GO_MY_FAVORITES, GO_MY_FAVORITES_NEWS, CLOSE_MY_FAVORITES, CLOSE_MY_FAVORITES_NEWS } from './const';

export const goCoins = () => {
  return (dispatch) => {
    dispatch({type: GO_COINS_NAV})
  }
};
export const goNews = () => {
  return (dispatch) => {
    dispatch({type: GO_NEWS_NAV})
  }
};
export const goTools = () => {
  return (dispatch) => {
    dispatch({type: GO_TOOLS_NAV})
  }
};
export const goPortfolio = () => {
  return (dispatch) => {
    dispatch({type: GO_PORTFOLIO_NAV})
  }
};
export const goHamburger = () => {
  return (dispatch) => {
    dispatch({type: GO_HAMBURGER})
  }
};

export const closeHamburger = () => {
  return (dispatch) => {
    dispatch({type: CLOSE_HAMBURGER})
  }
};
export const goMyFavorites = () => {
  return (dispatch) => {
    dispatch({type: GO_MY_FAVORITES})
  }
};
export const goMyFavoritesNews = () => {
  return (dispatch) => {
    dispatch({type: GO_MY_FAVORITES_NEWS})
  }
};
export const closeMyFavorites = () => {
  return (dispatch) => {
    dispatch({type: CLOSE_MY_FAVORITES})
  }
};
export const closeMyFavoritesNews = () => {
  return (dispatch) => {
    dispatch({type: CLOSE_MY_FAVORITES_NEWS})
  }
};
