import { GO_TOP_COINS_SCREEN, GO_ALL_COINS_SCREEN, GO_CHART, BACK_TOP, GO_ALL_CHART, BACK_ALL, GO_DAILY, GO_EXCHANGES_SCREEN, GO_PAIRS_SCREEN, GO_EXCHANGES_DETAILS, BACK_EXCHANGES } from '../actions/const';

const INITIAL_STATE = {
  isTopCoins: true,
  isAllCoins: false,
  isExchanges: false,
  isPairs: false,

  isDaily: true,
  isAllChart: false,
  isExchangesDetails: false,
  apiDaily: true,

  initBackBtn: true,

  isChart: false,
  coinName: '',
  coinUrl: '',
  price: '0',
  percent_change_24h: '',
  market_cap: '0',
  volume_usd_24: '0',
  circulating_supply: '0',
  total_supply: '0',
  symbol: '',

  exchangename: '',
  tradingpairs: '',
  volumeinUSD24H: '',
  exchangeid: ''
};

const CoinsNavReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case GO_TOP_COINS_SCREEN:
      return {
        ...state,
        isTopCoins: true,
        isAllCoins: false,
        isExchanges: false,
        isPairs: false,
        initBackBtn: true,
      }
    case GO_ALL_COINS_SCREEN:
      return {
        ...state,
        isAllCoins: true,
        isTopCoins: false,
        isExchanges: false,
        isPairs: false,
        initBackBtn: false
      }
    case GO_EXCHANGES_SCREEN:
      return {
        ...state,
        isAllCoins: false,
        isTopCoins: false,
        isExchanges: true,
        isPairs: false
      }
    case GO_PAIRS_SCREEN:
      return {
        ...state,
        isAllCoins: false,
        isTopCoins: false,
        isExchanges: false,
        isPairs: true
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
    case GO_EXCHANGES_DETAILS:
      return {
        ...state,
        isExchanges: false,
        isExchangesDetails: true,
        exchangename: action.exchangename,
        tradingpairs: action.tradingpairs,
        volumeinUSD24H: action.volumeinUSD24H,
        exchangeid: action.exchangeid
      }
    case BACK_TOP:
      return {
        ...state,
        isChart: false,
        isTopCoins: true
      }
    case BACK_ALL:
      return {
        ...state,
        isChart: false,
        isAllCoins: true
      }
    case BACK_EXCHANGES:
      return {
        ...state,
        isExchanges: true,
        isExchangesDetails: false
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
