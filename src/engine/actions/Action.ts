import GameState from "../objects/GameState";

export enum ActionType {
  MOVE = 'move',
  FLIP = 'Flip',
  TAP = 'Tap'
}

export class Action {
  constructor(protected type: ActionType, private sourceDeckName: string, private sourceCardName?: string) {
  }

  public execute(gameState: GameState) {
    // change the game state
  }

  public getSourceDeckName() {
    return this.sourceDeckName;
  }

  public getSourceCardName() {
    return this.sourceCardName;
  }

  public getType(): ActionType {
    return this.type;
  }

  public isLegal(gameState: GameState) {
    return gameState.getDeck(this.getSourceDeckName()).hasCard(this.getSourceCardName());
  }

  public toString() {
    return `${this.type}`;
  }
}

export default Action;
