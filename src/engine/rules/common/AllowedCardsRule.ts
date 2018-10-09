import Action from '../../actions/Action';
import Move from '../../actions/Move';
import Card from '../../objects/Card';
import Deck from '../../objects/Deck';
import GameState from '../../objects/GameState';
import Rule from '../Rule';

class AllowedCardsRule extends Rule {
  constructor(private targetDeck: string, private cardFilter: (card: Card, targetDeck: Deck) => boolean) {
    super()
  }

  public isLegal(action: Action, gameState: GameState): boolean {
    if (action instanceof Move) {
      const move = action as Move;
      const sourceDeck = move.getSourceDeck(gameState);
      const targetDeck = move.getTargetDeck(gameState);
      if (targetDeck.getName() === this.targetDeck && targetDeck.getStackedOnDeck() !== sourceDeck) {
        const sourceCards = move.getCardsToMove(gameState);
        return sourceCards.length > 0 && sourceCards.filter(card => this.cardFilter(card, targetDeck)).length === sourceCards.length;
      }
    }
    return true;
  }
}

export default AllowedCardsRule;
