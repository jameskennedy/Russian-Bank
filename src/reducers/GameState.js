import GameFactory from '../engine/GameFactory';
import {
  START_GAME
} from '../actions/gameMenuActions';

let gameService;

export const gameState = (state = null, action) => {
  switch (action.type) {
    case START_GAME:
      gameService = GameFactory.startRussianBankGame(action.gameSetupParams);
      return gameService.getCopyOfCurrentGameState();
    default:
      return state;
  }
};

export default gameState;
