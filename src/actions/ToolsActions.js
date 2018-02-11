import { BACK_TOOLS, GO_HEATMAP, GO_MARGIN, GO_PROFIT, GO_PIVOT, GO_FIBONNACI, GO_AIRDROP,
GO_ECONOMIC, GO_EVENTS, BACK_CALENDARS } from './const';

export const backTools = () => {
  return (dispatch) => {
    dispatch({type: BACK_TOOLS})
  }
};
export const goHeatmap = () => {
  return (dispatch) => {
    dispatch({type: GO_HEATMAP})
  }
};
export const goMargin = () => {
  return (dispatch) => {
    dispatch({type: GO_MARGIN})
  }
};
export const goProfit = () => {
  return (dispatch) => {
    dispatch({type: GO_PROFIT})
  }
};
export const goPivot = () => {
  return (dispatch) => {
    dispatch({type: GO_PIVOT})
  }
};
export const goFibonnaci = () => {
  return (dispatch) => {
    dispatch({type: GO_FIBONNACI})
  }
};
export const goAirdrop = () => {
  return (dispatch) => {
    dispatch({type: GO_AIRDROP})
  }
};

export const goEconomic = () => {
  return (dispatch) => {
    dispatch({type: GO_ECONOMIC})
  }
};
export const goEvents = () => {
  return (dispatch) => {
    dispatch({type: GO_EVENTS})
  }
};
export const backCalendars = () => {
  return (dispatch) => {
    dispatch({type: BACK_CALENDARS})
  }
};
