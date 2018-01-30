import { GO_BITCOIN_NAV, GO_ALTCOIN_NAV, GO_ICO_NAV, GO_ANALYSYS, GO_SPONSORED_NAV, GO_DERIVATIVES_NAV } from '../actions/const';

const INITIAL_STATE = {
  isBitcoin: true,
  isAltcoin: false,
  isIco: false,
  isAnalysys: false,
  isSponsored: false,
  isDerivatives: false,
  initMenu: true,
  fetchUrl: 'http://www.newsbtc.com/wp-json/wp/v2/posts/?categories=5651&per_page=10&page=1&_embed'
};

const MenuNavNewsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case GO_BITCOIN_NAV:
      return {
        ...state,
        initMenu: false,
        isBitcoin: true,
        isAltcoin: false,
        isIco: false,
        isAnalysys: false,
        isSponsored: false,
        isDerivatives: false,
        fetchUrl: 'http://www.newsbtc.com/wp-json/wp/v2/posts/?categories=5651&per_page=10&page=1&_embed'
      }
    case GO_ALTCOIN_NAV:
      return{
        ...state,
        isBitcoin: false,
        isAltcoin: true,
        isIco: false,
        isAnalysys: false,
        isSponsored: false,
        isDerivatives: false,
        initMenu: false,
        fetchUrl: 'http://www.newsbtc.com/wp-json/wp/v2/posts/?categories=3&per_page=10&page=1&_embed'
      }
    case GO_ICO_NAV:
      return{
        ...state,
        isBitcoin: false,
        isAltcoin: false,
        isIco: true,
        isAnalysys: false,
        isSponsored: false,
        isDerivatives: false,
        fetchUrl: ' http://www.newsbtc.com/wp-json/wp/v2/posts/?categories=10474&per_page=10&page=1&_embed'
      }
    case GO_ANALYSYS:
      return{
        ...state,
        isBitcoin: false,
        isAltcoin: false,
        isIco: false,
        isAnalysys: true,
        isSponsored: false,
        isDerivatives: false,
        fetchUrl: ' http://www.newsbtc.com/wp-json/wp/v2/posts/?categories=12039&per_page=10&page=1&_embed'
      }
      case GO_SPONSORED_NAV:
        return{
          ...state,
          isBitcoin: false,
          isAltcoin: false,
          isIco: false,
          isAnalysys: false,
          isSponsored: true,
          isDerivatives: false,
          fetchUrl: ' http://www.newsbtc.com/wp-json/wp/v2/posts/?categories=17&per_page=10&page=1&_embed'
        }
      case GO_DERIVATIVES_NAV:
        return{
          ...state,
          isBitcoin: false,
          isAltcoin: false,
          isIco: false,
          isAnalysys: false,
          isSponsored: false,
          isDerivatives: true,
          fetchUrl: 'http://www.newsbtc.com/wp-json/wp/v2/posts/?categories=12040&per_page=10&page=1&_embed'
        }
    default:
      return state;
  }
}

export default MenuNavNewsReducer;
