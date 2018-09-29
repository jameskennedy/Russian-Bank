import { combineReducers } from 'redux';
import GameState from '../engine/objects/GameState';
import GameStateReducer from './GameState';

export interface IStore {
  gameState: GameState
}

const connectorProfileStore = combineReducers({
  gameState: GameStateReducer
});


export default connectorProfileStore;
