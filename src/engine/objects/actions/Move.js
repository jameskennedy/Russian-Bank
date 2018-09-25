import assert from 'assert-js';
import Action from './Action';
import Deck from '../Deck';

class Move extends Action {
  constructor(sourceDeckName, targetDeckName) {
    super(Action.ActionType.MOVE);
    assert.string(sourceDeckName);
    assert.string(targetDeckName);
    this.sourceDeckName = sourceDeckName;
    this.targetDeckName = targetDeckName;
  }

  isLegal(gameState) {
    const sourceDeck = gameState.getDeck(this.sourceDeckName);
    const targetDeck = gameState.getDeck(this.targetDeckName);
    assert.instanceOf(sourceDeck, Deck);
    assert.instanceOf(targetDeck, Deck);
    return sourceDeck.getCards().length > 0;
  }

  execute(gameState) {
    const sourceDeck = gameState.getDeck(this.sourceDeckName);
    const targetDeck = gameState.getDeck(this.targetDeckName);
    assert.instanceOf(sourceDeck, Deck);
    assert.instanceOf(targetDeck, Deck);
    const card = sourceDeck.popCard();
    if (!card) {
      throw new Error(`Cannot ${this} because ${sourceDeck} is empty`);
    }
    targetDeck.pushCard(card);
  }

  toString() {
    return `${super.toString()} card from ${this.sourceDeck} to ${this.targetDeck}`;
  }
}

export default Move;
