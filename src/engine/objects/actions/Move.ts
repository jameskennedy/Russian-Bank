import Deck from '../Deck';
import GameState from '../GameState';
import { Action, ActionType } from './Action';

class Move extends Action {
  constructor(sourceDeckName: string, private targetDeckName: string) {
    super(ActionType.MOVE, sourceDeckName);
  }

  public isLegal(gameState: GameState) {
    const sourceDeck = gameState.getDeck(this.getSourceDeckName() || '');
    return sourceDeck.getCards().length > 0 && this.getSourceDeckName() !== this.targetDeckName;
  }

  public execute(gameState: GameState) {
    const sourceDeck = gameState.getDeck(this.getSourceDeckName() || '');
    this.move(sourceDeck, this.getTargetDeck(gameState));
  }

  public getTargetDeckName() {
    return this.targetDeckName;
  }

  public getTargetDeck(gameState: GameState): Deck {
    const targetDeck = gameState.getDeck(this.targetDeckName);
    if (!targetDeck) {
      throw new Error(`Move action requires a target deck, ${this.targetDeckName} not found`);
    }
    return targetDeck;
  }

  public toString() {
    return `${super.toString()} card from ${this.getSourceDeckName() || 'no source'} to ${this.targetDeckName}`;
  }

  protected move(sourceDeck: Deck, targetDeck: Deck) {
    const card = sourceDeck.popCard();
    if (!card) {
      throw new Error(`Cannot ${this} because ${sourceDeck} is empty`);
    }
    targetDeck.pushCard(card);
  }
}

export default Move;
