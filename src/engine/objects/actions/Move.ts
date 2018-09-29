import GameState from '../GameState';
import { Action, ActionType } from './Action';

class Move extends Action {
  constructor(sourceDeckName: string, private targetDeckName: string) {
    super(ActionType.MOVE);
    this.sourceDeckName = sourceDeckName;
  }

  public isLegal(gameState: GameState) {
    const sourceDeck = gameState.getDeck(this.sourceDeckName || '');
    return sourceDeck.getCards().length > 0;
  }

  public execute(gameState: GameState) {
    const sourceDeck = gameState.getDeck(this.sourceDeckName || '');
    const targetDeck = gameState.getDeck(this.targetDeckName);
    const card = sourceDeck.popCard();
    if (!card) {
      throw new Error(`Cannot ${this} because ${sourceDeck} is empty`);
    }
    targetDeck.pushCard(card);
  }

  public toString() {
    return `${super.toString()} card from ${this.sourceDeckName || 'no source'} to ${this.targetDeckName}`;
  }
}

export default Move;
