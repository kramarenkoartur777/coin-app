import { GO_TOP_COINS_SCREEN, GO_ALL_COINS_SCREEN, GO_CHART, BACK_TOP, GO_ALL_CHART, GO_DAILY } from '../actions/const';

const INITIAL_STATE = {
  isTopCoins: true,
  isAllCoins: false,
  isExchanges: false,
  isPairs: false,

  isLast1h: false,
  isDaily: true,
  isAllChart: false,
  apiDaily: true,

  isChart: false,
  coinName: 'Bitcoin',
  coinUrl: 'https://tools.newsbtc.com/icons/bitcoin.png',
  price: '',
  percent_change_24h: '',
  market_cap: '',
  volume_usd_24: '',
  circulating_supply: '',
  total_supply: '',
  symbol: 'BTC'
};

const CoinsNavReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case GO_TOP_COINS_SCREEN:
      return {
        ...state,
        isTopCoins: true,
        isAllCoins: false
      }
    case GO_ALL_COINS_SCREEN:
      return {
        ...state,
        isAllCoins: true,
        isTopCoins: false
      }
    case GO_CHART:
      return {
        ...state,
        isChart: true,
        isTopCoins: false,
        coinName: action.payload,
        coinUrl: action.url,
        price: action.price,
        percent_change_24h: action.percent_change_24h,
        market_cap: action.market_cap,
        volume_usd_24: action.volume_usd_24,
        circulating_supply: action.circulating_supply,
        total_supply: action.total_supply,
        symbol: action.symbol
      }
    case BACK_TOP:
      return {
        ...state,
        isChart: false,
        isTopCoins: true
      }
    case GO_DAILY:
      return {
        ...state,
        isDaily: true,
        isAllChart: false,
        apiDaily: true
      }
    case GO_ALL_CHART:
      return {
        ...state,
        isDaily: false,
        isAllChart: true,
        apiDaily: false
      }
    default:
      return state;
  }
};

export default CoinsNavReducer;
