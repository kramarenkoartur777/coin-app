import { combineReducers } from 'redux';

import CoinsNavReducer from './reducers/CoinsNavReducer';
import ChartNavReducer from './reducers/ChartNavReducer';
import MenuNavReducer from './reducers/MenuNavReducer';
import MenuNavNewsReducer from './reducers/MenuNavNewsReducer';
import DetailNewsReducer from './reducers/DetailNewsReducer';
import LikedPostReducer from './reducers/LikedPostReducer';
import ToolsReducer from './reducers/ToolsReducer';

const rootReducer = combineReducers({
  coinsNav: CoinsNavReducer,
  chartInfo: ChartNavReducer,
  menuNav: MenuNavReducer,
  menuNews: MenuNavNewsReducer,
  detailNews: DetailNewsReducer,
  liked: LikedPostReducer,
  tools: ToolsReducer
});

export default rootReducer;
