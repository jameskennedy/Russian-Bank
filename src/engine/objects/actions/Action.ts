import GameState from "../GameState";

export enum ActionType {
  MOVE = 'move'
}

export class Action {
  protected sourceDeckName?: string;
  constructor(private type: ActionType) {
  }

  public execute(gameState: GameState) {
    // change the game state
  }

  public getSourceDeckName() {
    return this.sourceDeckName;
  }

  public getType(): ActionType {
    return this.type;
  }

  public isLegal(gameState: GameState) {
    return true;
  }

  public toString() {
    return `${this.type}`;
  }
}

export default Action;
