import { GO_LATEST_NAV, GO_BITCOIN_NAV, GO_ALTCOIN_NAV, GO_ICO_NAV, GO_ANALYSYS, GO_SPONSORED_NAV, GO_DERIVATIVES_NAV, GO_BLOCKCHAIN_NAV, GO_CRYPTOTECH_NAV, GO_INDUSTRY_NAV, CLOSE_ALL_NEWS } from '../actions/const';

const INITIAL_STATE = {
  isLatest: true,
  isBitcoin: false,
  isAltcoin: false,
  isIco: false,
  isAnalysys: false,
  isSponsored: false,
  isDerivatives: false,
  isBlockchain: false,
  isCryptotech: false,
  isIndustry: false,
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
        isBlockchain: false,
        isCryptotech: false,
        isIndustry: false,
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
        isBlockchain: false,
        isCryptotech: false,
        isIndustry: false,
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
        isBlockchain: false,
        isCryptotech: false,
        isIndustry: false,
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
        isBlockchain: false,
        isCryptotech: false,
        isIndustry: false,
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
        isBlockchain: false,
        isCryptotech: false,
        isIndustry: false,
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
          isBlockchain: false,
          isCryptotech: false,
          isIndustry: false,
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
          isBlockchain: false,
          isCryptotech: false,
          isIndustry: false,
        }
    case GO_BLOCKCHAIN_NAV:
      return{
        ...state,
        isBitcoin: false,
        isAltcoin: false,
        isIco: false,
        isAnalysys: false,
        isSponsored: false,
        isDerivatives: false,
        isLatest: false,
        isBlockchain: true,
        isCryptotech: false,
        isIndustry: false,
      }
    case GO_CRYPTOTECH_NAV:
      return{
        ...state,
        isBitcoin: false,
        isAltcoin: false,
        isIco: false,
        isAnalysys: false,
        isSponsored: false,
        isDerivatives: false,
        isLatest: false,
        isBlockchain: false,
        isCryptotech: true,
        isIndustry: false,
      }
    case GO_INDUSTRY_NAV:
      return{
        ...state,
        isBitcoin: false,
        isAltcoin: false,
        isIco: false,
        isAnalysys: false,
        isSponsored: false,
        isDerivatives: false,
        isLatest: false,
        isBlockchain: false,
        isCryptotech: false,
        isIndustry: true,
      }
    case CLOSE_ALL_NEWS:
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
        isBlockchain: false,
        isCryptotech: false,
        isIndustry: false,
      }
    default:
      return state;
  }
}

export default MenuNavNewsReducer;
