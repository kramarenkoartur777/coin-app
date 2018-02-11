import { BACK_TOOLS, GO_HEATMAP, GO_MARGIN, GO_PROFIT, GO_PIVOT, GO_FIBONNACI, GO_AIRDROP,
GO_EVENTS, GO_ECONOMIC, BACK_CALENDARS } from '../actions/const';

const INITIAL_STATE = {
  initTools: false,
  heatmap: false,
  margin: false,
  profit: false,
  pivot: false,
  fibonnaci: false,
  airdrop: false,

  economic: false,
  events: false
};

const ToolsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case BACK_TOOLS:
      return {
        ...state,
        initTools: true,
        heatmap: false,
        margin: false,
        profit: false,
        pivot: false,
        fibonnaci: false,
        airdrop: false
      }
    case GO_HEATMAP:
      return {
        ...state,
        heatmap: true,
        initTools: false,
      }
    case GO_MARGIN:
      return {
        ...state,
        margin: true,
        initTools: false,
      }
    case GO_PROFIT:
      return {
        ...state,
        profit: true,
        initTools: false,
      }
    case GO_PIVOT:
      return {
        ...state,
        pivot: true,
        initTools: false,
      }
    case GO_FIBONNACI:
      return {
        ...state,
        fibonnaci: true,
        initTools: false,
      }
    case GO_AIRDROP:
      return {
        ...state,
        airdrop: true,
        initTools: false,
      }
    case GO_ECONOMIC:
      return {
        ...state,
        initTools: false,
        economic: true,
      }
    case GO_EVENTS:
      return {
        ...state,
        initTools: false,
        events: true
      }
    case BACK_CALENDARS:
      return {
        ...state,
        initTools: true,
        economic: false,
        events: false
      }
    default:
      return state;
  }
};

export default ToolsReducer;
