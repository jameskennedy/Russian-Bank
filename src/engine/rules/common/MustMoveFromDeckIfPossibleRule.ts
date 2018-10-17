import Move from '../../actions/Move';
import { ActionPlayability } from '../../internal/RuleEngine';
import Deck from '../../objects/Deck';
import GameState from '../../objects/GameState';
import MoveActionRule from './MoveActionRule';

class MustMoveFromDeckIfPossibleRule extends MoveActionRule {
  constructor(private sourceDecks: string[], affectedDecks?: string[]) {
    super(affectedDecks)
  }

  protected isMoveLegal(move: Move, sourceDeck: Deck, targetDeck: Deck, gameState: GameState): ActionPlayability {
    if (this.sourceDecks.find(d => d === sourceDeck.getName())) {
      return ActionPlayability.EXCLUSIVE;
    }
    return ActionPlayability.LEGAL;
  }
}

export default MustMoveFromDeckIfPossibleRule;
