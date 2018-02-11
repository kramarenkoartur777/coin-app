import { CLOSE_ALL_NEWS, GO_LATEST_NAV, GO_BITCOIN_NAV, GO_ALTCOIN_NAV, GO_ICO_NAV, GO_ANALYSYS, GO_SPONSORED_NAV, GO_DERIVATIVES_NAV, GO_BLOCKCHAIN_NAV, GO_CRYPTOTECH_NAV, GO_INDUSTRY_NAV } from './const';

export const goLatest = () => {
  return (dispatch) => {
    dispatch({type: GO_LATEST_NAV})
  }
};
export const goBitcoin = () => {
  return (dispatch) => {
    dispatch({type: GO_BITCOIN_NAV})
  }
};
export const goAltcoin = () => {
  return (dispatch) => {
    dispatch({type: GO_ALTCOIN_NAV})
  }
};
export const goIco = () => {
  return (dispatch) => {
    dispatch({type: GO_ICO_NAV})
  }
};
export const goAnalysys = () => {
  return (dispatch) => {
    dispatch({type: GO_ANALYSYS})
  }
};
export const goSponsored = () => {
  return (dispatch) => {
    dispatch({type: GO_SPONSORED_NAV})
  }
};
export const goDerivatives = () => {
  return (dispatch) => {
    dispatch({type: GO_DERIVATIVES_NAV})
  }
};
export const goBlockchain = () => {
  return (dispatch) => {
    dispatch({type: GO_BLOCKCHAIN_NAV})
  }
};
export const goCryptotech = () => {
  return (dispatch) => {
    dispatch({type: GO_CRYPTOTECH_NAV})
  }
};
export const goIndustry = () => {
  return (dispatch) => {
    dispatch({type: GO_INDUSTRY_NAV})
  }
};

export const closeAllNews = () => {
  return (dispatch) => {
    dispatch({type: CLOSE_ALL_NEWS})
  }
};
