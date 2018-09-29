import {
  START_GAME
} from '../actions/gameMenuActions';
import GameFactory from '../engine/GameFactory';

let gameService;

export const gameState = (state: any = null, action: any) => {
  switch (action.type) {
    case START_GAME:
      gameService = GameFactory.startRussianBankGame();
      return gameService.getCopyOfCurrentGameState();
    default:
      return state;
  }
};

export default gameState;
