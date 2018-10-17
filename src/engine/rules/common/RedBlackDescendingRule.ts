import Move from '../../actions/Move';
import RuleEngine, { ActionPlayability } from '../../internal/RuleEngine';
import Card from '../../objects/Card';
import Deck from '../../objects/Deck';
import GameState from '../../objects/GameState';
import MoveActionRule from './MoveActionRule';

class RedBlackDescendingRule extends MoveActionRule {
  constructor(affectedDeckNames: string[]) {
    super(affectedDeckNames);
  }

  protected isMoveLegal(move: Move, sourceDeck: Deck, targetDeck: Deck, gameState: GameState): ActionPlayability {
    const topCard: Card = targetDeck.getTopCard();
    let sourceCard = sourceDeck.getCards().find(c => c.getName() === move.getSourceCardName());
    if (!sourceCard) {
      sourceCard = sourceDeck.getTopCard();
    }
    if (!topCard) {
      return ActionPlayability.LEGAL;
    }
    return RuleEngine.legalIf(sourceCard.getRank() === topCard.getRank() - 1 &&
      sourceCard.getSuit().getColor() !== topCard.getSuit().getColor());
  }
}

export default RedBlackDescendingRule;
