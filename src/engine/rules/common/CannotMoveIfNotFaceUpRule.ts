import Action, { ActionType } from '../../actions/Action';
import GameState from '../../objects/GameState';
import Rule from '../Rule';

class CannotMoveIfNotFaceUp extends Rule {
  public isLegal(action: Action, gameState: GameState): boolean {
    const sourceDeck = gameState.getDeck(action.getSourceDeckName());
    return action.getType() !== ActionType.MOVE || sourceDeck.isFaceUp();
  }
}

export default CannotMoveIfNotFaceUp;
