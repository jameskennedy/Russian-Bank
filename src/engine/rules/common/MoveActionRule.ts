import Action, { ActionType } from '../../actions/Action';
import Move from '../../actions/Move';
import TapDeck from '../../actions/TapDeck';
import { ActionPlayability } from '../../internal/RuleEngine';
import Deck from '../../objects/Deck';
import GameState from '../../objects/GameState';
import Rule from '../Rule';

class MoveActionRule extends Rule {
  constructor(affectedDecks?: string[]) {
    super(affectedDecks)
  }

  public isLegal(inAction: Action, gameState: GameState): ActionPlayability {
    let action = inAction;
    if (action.getType() === ActionType.TAP) {
      action = (action as TapDeck).getTapAction();
    }
    if (action instanceof Move) {
      const move = action as Move;
      const sourceDeck = move.getSourceDeck(gameState);
      const targetDeck = move.getTargetDeck(gameState);
      if (
        !this.isAffectedDeck(targetDeck) ||
        !this.isCurrentPlayerAffected(gameState)) {
        return ActionPlayability.LEGAL;
      }
      return this.isMoveLegal(move, sourceDeck, targetDeck, gameState);
    }
    return ActionPlayability.LEGAL;
  }

  protected isMoveLegal(move: Move, sourceDeck: Deck, targetDeck: Deck, gameState: GameState): ActionPlayability {
    return ActionPlayability.LEGAL;
  }

}

export default MoveActionRule;
