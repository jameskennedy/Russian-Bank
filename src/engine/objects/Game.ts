import GameState from "./GameState";

class Game {
  private gameHistory: GameState[];

  constructor(private gameId: number, initialState: GameState) {
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
}

export default Game;
