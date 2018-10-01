import GameState from '../GameState';
import { Action, ActionType } from './Action';

class FlipDeck extends Action {
  constructor(sourceDeckName: string, private targetDeckName: string) {
    super(ActionType.FLIP, sourceDeckName);
  }

  public execute(gameState: GameState) {
    const sourceDeck = gameState.getDeck(this.getSourceDeckName() || '');
    const targetDeck = gameState.getDeck(this.targetDeckName);

    while (!sourceDeck.isEmpty()) {
      targetDeck.pushCard(sourceDeck.popCard()!);
    }
  }

  public isLegal(gameState: GameState): boolean {
    const sourceDeck = gameState.getDeck(this.getSourceDeckName() || '');
    const targetDeck = gameState.getDeck(this.targetDeckName);
    return !sourceDeck.isEmpty() && sourceDeck.isFaceUp()
      && !targetDeck.isFaceUp() && targetDeck.isEmpty();
  }

  public toString() {
    return `Flip ${this.getSourceDeckName()}`;
  }
}

export default FlipDeck;
