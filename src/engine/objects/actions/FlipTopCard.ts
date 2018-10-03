import Deck from '../Deck';
import GameState from '../GameState';
import { ActionType } from './Action';
import Move from './Move';

class FlipTopCard extends Move {
  constructor(sourceDeckName: string) {
    super(sourceDeckName, '');
    this.type = ActionType.FLIP;
  }

  public execute(gameState: GameState) {
    const sourceDeck = gameState.getDeck(this.getSourceDeckName() || '');
    const targetDeck = gameState.getDecks().find(d => d.getStackedOnDeck() !== undefined && d.getStackedOnDeck()!.getName() === sourceDeck.getName());
    if (!targetDeck) {
      throw new Error(`Can't flip top card of ${this.getSourceDeckName()} since it has no deck stacked on it`);
    }
    this.move(sourceDeck, targetDeck);
  }

  public getTargetDeck(gameState: GameState): Deck {
    const targetDeck = gameState.getDecksByStack().get(this.getSourceDeckName());
    if (!targetDeck) {
      throw new Error(`FlipTopCard action requires source deck ${this.getSourceDeckName()} to have another stacked on it`);
    }
    return targetDeck;
  }

  public toString() {
    return `Flip top card of ${this.getSourceDeckName()}`;
  }
}

export default FlipTopCard;
