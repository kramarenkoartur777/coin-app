import { GO_COINS_NAV, GO_NEWS_NAV, GO_TOOLS_NAV, GO_PORTFOLIO_NAV } from './const';

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
