import GameState from '../GameState';
import { Action, ActionType } from './Action';

class TapDeck extends Action {
  constructor(sourceDeckName: string, private tapAction: Action) {
    super(ActionType.TAP, sourceDeckName);
  }

  public execute(gameState: GameState) {
    this.tapAction.execute(gameState);
  }

  public isLegal(gameState: GameState): boolean {
    return this.tapAction.isLegal(gameState);
  }

  public toString() {
    return `Tap ${this.getSourceDeckName()} to ${this.tapAction}`;
  }
}

export default TapDeck;
