import Move from '../../actions/Move';
import Card from '../../objects/Card';
import Deck from '../../objects/Deck';
import GameState from '../../objects/GameState';
import MoveActionRule from './MoveActionRule';

class SameSuitAdjacentRankRule extends MoveActionRule {
  constructor(affectedDeckNames: string[]) {
    super(affectedDeckNames);
  }

  protected isMoveLegal(move: Move, sourceDeck: Deck, targetDeck: Deck, gameState: GameState): boolean {
    const sourceCard = move.getCardsToMove(gameState);
    if (!this.isCurrentPlayerAffected(gameState)) {
      return true;
    }
    if (sourceCard.length !== 1) {
      return false;
    }
    const topCard: Card = targetDeck.getTopCard();
    if (!topCard) {
      return false;
    }
    const range = Math.abs(sourceCard[0].getRank() - topCard.getRank());
    const isAdjacent = range === 1 || range === 12;
    return isAdjacent && sourceCard[0].getSuit() === topCard.getSuit();
  }
}

export default SameSuitAdjacentRankRule;
