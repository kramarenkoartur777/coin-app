import { GO_EXCHANGES_DETAILS, BACK_EXCHANGES, GO_TOP_COINS_SCREEN, GO_ALL_COINS_SCREEN, GO_CHART, BACK_TOP, BACK_ALL , GO_ALL_CHART, GO_DAILY, GO_EXCHANGES_SCREEN, GO_PAIRS_SCREEN } from './const';

export const goTopCoins = () => {
  return (dispatch) => {
    dispatch({type: GO_TOP_COINS_SCREEN})
  }
};
export const goAllCoins = () => {
  return (dispatch) => {
    dispatch({type: GO_ALL_COINS_SCREEN})
  }
};
export const goExchanges = () => {
  return (dispatch) => {
    dispatch({type: GO_EXCHANGES_SCREEN})
  }
};
export const goPairs = () => {
  return (dispatch) => {
    dispatch({type: GO_PAIRS_SCREEN})
  }
};
export const goChart = (name, url, price, percent_change_24h, market_cap, volume_usd_24, circulating_supply, total_supply, symbol) => {
  return (dispatch) => {
    dispatch({
      type: GO_CHART,
      payload: name,
      url: url,
      price: price,
      percent_change_24h: percent_change_24h,
      market_cap: market_cap,
      volume_usd_24: volume_usd_24,
      circulating_supply: circulating_supply,
      total_supply: total_supply,
      symbol: symbol
    })
  }
};
export const goExchangesDetails = (exchangename, tradingpairs, volumeinUSD24H, exchangeid) => {
  return (dispatch) => {
    dispatch({
      type: GO_EXCHANGES_DETAILS,
      exchangename: exchangename,
      tradingpairs: tradingpairs,
      volumeinUSD24H :volumeinUSD24H,
      exchangeid: exchangeid
    })
  }
};
export const backBtnExchanges = () => {
  return (dispatch) => {
    dispatch({type: BACK_EXCHANGES})
  }
};
export const backBtnTop = () => {
  return (dispatch) => {
    dispatch({type: BACK_TOP})
  }
};
export const backBtnAll = () => {
  return (dispatch) => {
    dispatch({type: BACK_ALL})
  }
};
export const goDaily = () => {
  return (dispatch) => {
    dispatch({type: GO_DAILY})
  }
};
export const goAllChart = () => {
  return (dispatch) => {
    dispatch({type: GO_ALL_CHART})
  }
};
