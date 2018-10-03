import Deck from '../Deck';
import GameState from '../GameState';
import { Action, ActionType } from './Action';

class Move extends Action {
  constructor(sourceDeckName: string, private targetDeckName: string) {
    super(ActionType.MOVE, sourceDeckName);
  }

  public isLegal(gameState: GameState) {
    const sourceDeck = this.getSourceDeck(gameState);
    const targetDeck = this.getTargetDeck(gameState);
    return sourceDeck.getCards().length > 0 && this.getSourceDeckName() !== this.targetDeckName
      && targetDeck.isAcceptingNewCards();
  }

  public execute(gameState: GameState) {
    const sourceDeck = gameState.getDeck(this.getSourceDeckName() || '');
    let targetDeck = this.getTargetDeck(gameState);
    const stackedDeck = gameState.getDecksByStack().get(targetDeck.getName());
    if (stackedDeck && stackedDeck.isEmpty()) {
      targetDeck = stackedDeck;
    }
    this.move(sourceDeck, targetDeck);
  }

  public getTargetDeckName() {
    return this.targetDeckName;
  }
  public getSourceDeck(gameState: GameState): Deck {
    const sourceDeck = gameState.getDeck(this.getSourceDeckName());
    if (!sourceDeck) {
      throw new Error(`Move action requires a source deck, ${this.getSourceDeckName()} not found`);
    }
    return sourceDeck;
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
