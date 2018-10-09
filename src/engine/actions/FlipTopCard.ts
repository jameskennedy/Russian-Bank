import Deck from '../objects/Deck';
import GameState from '../objects/GameState';
import { ActionType } from './Action';
import Move from './Move';

class FlipTopCard extends Move {
  constructor(sourceDeckName: string) {
    super(sourceDeckName, '', '');
    this.type = ActionType.FLIP;
  }

  public execute(gameState: GameState) {
    const sourceDeck = gameState.getDeck(this.getSourceDeckName() || '');
    const targetDeck = this.getTargetDeck(gameState);
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

  public getTargetDeckName(): string {
    throw new Error('FlipTopCard actions do not have a target deck name');
  }

  public toString() {
    return `Flip top card of ${this.getSourceDeckName()}`;
  }
}

export default FlipTopCard;
