import Action from '../actions/Action';
import Rule from '../rules/Rule'
import GameState from "./GameState";

class Game {
  private gameHistory: GameState[];

  constructor(private gameId: number, initialState: GameState, private rules: Rule[], private actions: Action[]) {
    this.gameHistory = [initialState];
  }

  public getGameId() {
    return this.gameId;
  }

  public getCurrentGameState() {
    return this.gameHistory[this.gameHistory.length - 1];
  }

  public advanceState(newGameState: GameState) {
    this.gameHistory.push(newGameState);
  }

  public getRules() {
    return [...this.rules];
  }

  public getGameActions(): any {
    return [...this.actions];
  }
}

export default Game;
