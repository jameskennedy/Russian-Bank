import Action from '../../objects/actions/Action';
import Move from '../../objects/actions/Move';
import Card from '../../objects/Card';
import Deck from '../../objects/Deck';
import GameState from '../../objects/GameState';
import Rule from '../Rule';

class MaxDeckSize extends Rule {
  constructor(private maxSize: number, affectedDecks?: string[]) {
    super(affectedDecks)
  }

  public isLegal(action: Action, gameState: GameState): boolean {
    if (action instanceof Move) {
      const move = action as Move;
      const sourceCards = move.getCardsToMove(gameState);
      const targetDeck = move.getTargetDeck(gameState);
      return !this.isAffectedDeck(targetDeck) || this.isBelowMaxSize(targetDeck, sourceCards);
    }
    return true;
  }

  private isBelowMaxSize(deck: Deck, sourceCards: Card[]): boolean {
    return deck.getCards().length + sourceCards.length <= this.maxSize;
  }
}

export default MaxDeckSize;
