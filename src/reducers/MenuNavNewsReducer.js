import { GO_LATEST_NAV, GO_BITCOIN_NAV, GO_ALTCOIN_NAV, GO_ICO_NAV, GO_ANALYSYS, GO_SPONSORED_NAV, GO_DERIVATIVES_NAV } from '../actions/const';

const INITIAL_STATE = {
  isLatest: true,
  isBitcoin: false,
  isAltcoin: false,
  isIco: false,
  isAnalysys: false,
  isSponsored: false,
  isDerivatives: false,
  initMenu: true,
};

const MenuNavNewsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case GO_LATEST_NAV:
      return {
        ...state,
        initMenu: false,
        isLatest: true,
        isBitcoin: false,
        isAltcoin: false,
        isIco: false,
        isAnalysys: false,
        isSponsored: false,
        isDerivatives: false,
      }
    case GO_BITCOIN_NAV:
      return {
        ...state,
        initMenu: false,
        isLatest: false,
        isBitcoin: true,
        isAltcoin: false,
        isIco: false,
        isAnalysys: false,
        isSponsored: false,
        isDerivatives: false,
      }
    case GO_ALTCOIN_NAV:
      return{
        ...state,
        isLatest: false,
        isBitcoin: false,
        isAltcoin: true,
        isIco: false,
        isAnalysys: false,
        isSponsored: false,
        isDerivatives: false,
        initMenu: false,
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
        isLatest: false,
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
        isLatest: false,
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
          isLatest: false,
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
          isLatest: false,
        }
    default:
      return state;
  }
}

export default MenuNavNewsReducer;
