import assert from 'assert-js';
import GameFactory from '../engine/GameFactory';
import GameState from '../engine/objects/GameState';
import {
  START_GAME
} from '../actions/gameMenuActions';

let gameService;

export const gameState = (state = null, action) => {
  switch (action.type) {
    case START_GAME:
      gameService = GameFactory.startRussianBankGame(action.gameSetupParams);
      assert.instanceOf(gameService.getCurrentGameState(), GameState);
      return gameService.getCurrentGameState();
    default:
      return state;
  }
};

export default gameState;
