import { GO_BITCOIN_NAV, GO_ALTCOIN_NAV, GO_ICO_NAV, GO_ANALYSYS, GO_SPONSORED_NAV, GO_DERIVATIVES_NAV } from './const';

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
