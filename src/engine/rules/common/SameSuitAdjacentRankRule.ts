import Move from '../../actions/Move';
import RuleEngine, { ActionPlayability } from '../../internal/RuleEngine';
import Card from '../../objects/Card';
import Deck from '../../objects/Deck';
import GameState from '../../objects/GameState';
import MoveActionRule from './MoveActionRule';

class SameSuitAdjacentRankRule extends MoveActionRule {
  constructor(affectedDeckNames: string[]) {
    super(affectedDeckNames);
  }

  protected isMoveLegal(move: Move, sourceDeck: Deck, targetDeck: Deck, gameState: GameState): ActionPlayability {
    const sourceCard = move.getCardsToMove(gameState);
    if (!this.isCurrentPlayerAffected(gameState)) {
      return ActionPlayability.LEGAL;
    }
    if (sourceCard.length !== 1) {
      return ActionPlayability.ILLEGAL;
    }
    const topCard: Card = targetDeck.getTopCard();
    if (!topCard) {
      return ActionPlayability.ILLEGAL;
    }
    const range = Math.abs(sourceCard[0].getRank() - topCard.getRank());
    const isAdjacent = range === 1 || range === 12;
    return RuleEngine.legalIf(isAdjacent && sourceCard[0].getSuit() === topCard.getSuit());
  }
}

export default SameSuitAdjacentRankRule;
