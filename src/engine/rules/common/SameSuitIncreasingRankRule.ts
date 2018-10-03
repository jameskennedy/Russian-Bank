import Move from '../../objects/actions/Move';
import Card from '../../objects/Card';
import Deck from '../../objects/Deck';
import GameState from '../../objects/GameState';
import MoveActionRule from './MoveActionRule';

class SameSuitIncreasingRankRule extends MoveActionRule {
  constructor(affectedDeckNames: string[]) {
    super(affectedDeckNames);
  }

  protected isMoveLegal(move: Move, sourceDeck: Deck, targetDeck: Deck, gameState: GameState): boolean {
    const sourceCard = move.getCardsToMove(gameState);
    if (sourceCard.length !== 1) {
      return false;
    }
    const topCard: Card = targetDeck.getTopCard();
    if (!topCard) {
      return sourceCard[0].getRank() === 1;
    }
    return sourceCard[0].getRank() === topCard.getRank() + 1 && sourceCard[0].getSuit() === topCard.getSuit();
  }
}

export default SameSuitIncreasingRankRule;
