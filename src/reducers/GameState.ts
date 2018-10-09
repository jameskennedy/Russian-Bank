import {
  EXECUTE_ACTION
} from '../actions/gameActions';
import {
  START_GAME
} from '../actions/gameMenuActions';
import GameFactory from '../engine/GameFactory';
import GameService from '../engine/GameService';

let gameService: GameService;

export const gameState = (state: any = null, action: any) => {
  switch (action.type) {
    case START_GAME:
      gameService = GameFactory.startSolitaireGame(action.gameParameters);
      return gameService.getCopyOfCurrentGameState();
    case EXECUTE_ACTION:
      return gameService.executeAction(action.action);
    default:
      return state;
  }
};

export default gameState;
