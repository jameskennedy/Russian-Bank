import { combineReducers } from 'redux';
import { busyIndicator } from './ViewState';
import { gameState } from './GameState';

const connectorProfileStore = combineReducers({
  gameState,
  view: combineReducers({
    busyIndicator
  })
});

export default connectorProfileStore;
