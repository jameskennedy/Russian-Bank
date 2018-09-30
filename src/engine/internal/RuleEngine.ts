import Action from '../objects/actions/Action';
import Game from '../objects/Game';
import GameState from '../objects/GameState';
import Rule from '../rules/Rule'

class RuleEngine {
  constructor(private game: Game) {
  }
  public isLegal(action: Action, gameState: GameState) {
    if (!action.isLegal(gameState)) {
      return false;
    }
    const rules: Rule[] = this.game.getRules();
    const illegalMove = rules.find(r => !r.isLegal(action, gameState));
    return !Boolean(illegalMove);
  }
}

export default RuleEngine;
