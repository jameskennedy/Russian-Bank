import GameFactory from '../GameFactory';
import GameState from '../objects/GameState';
import { Action, ActionType } from './Action';

class SkipTurn extends Action {
  constructor() {
    super(ActionType.SKIP, '');
  }

  public execute(gameState: GameState) {
    const service = GameFactory.getGameService(gameState.gameId);
    service.endTurn(gameState);
  }

  public isLegal(gameState: GameState): boolean {
    return true;
  }

  public toString() {
    return 'Skip turn';
  }
}

export default SkipTurn;
