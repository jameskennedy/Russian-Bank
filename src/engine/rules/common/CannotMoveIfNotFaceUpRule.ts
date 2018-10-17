import Action, { ActionType } from '../../actions/Action';
import RuleEngine, { ActionPlayability } from '../../internal/RuleEngine';
import GameState from '../../objects/GameState';
import Rule from '../Rule';

class CannotMoveIfNotFaceUp extends Rule {
  public isLegal(action: Action, gameState: GameState): ActionPlayability {
    const sourceDeck = gameState.getDeck(action.getSourceDeckName());
    return RuleEngine.legalIf(action.getType() !== ActionType.MOVE || sourceDeck.isFaceUp());
  }
}

export default CannotMoveIfNotFaceUp;
