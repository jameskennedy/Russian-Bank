import Action from '../objects/actions/Action';
import GameState from '../objects/GameState';

class RuleEngine {
  public isLegal(action: Action, gameState: GameState) {
    return action.isLegal(gameState);
  }
}

export default RuleEngine;
