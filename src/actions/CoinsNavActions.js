import { GO_TOP_COINS_SCREEN, GO_ALL_COINS_SCREEN, GO_CHART, BACK_TOP , GO_ALL_CHART, GO_DAILY} from './const';

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
export const backBtnTop = () => {
  return (dispatch) => {
    dispatch({type: BACK_TOP})
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
