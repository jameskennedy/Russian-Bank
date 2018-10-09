import Action from '../actions/Action';
import GameEvent from '../events/GameEvent';
import Player from '../players/Player';
import Rule from '../rules/Rule'
import GameState from "./GameState";

class Game {
  private gameHistory: GameState[];

  constructor(private gameId: number, initialState: GameState, private rules: Rule[], private actions: Action[], private players: Player[], private events: GameEvent[]) {
    this.gameHistory = [initialState];
  }

  public getGameId() {
    return this.gameId;
  }

  public getCurrentGameState() {
    return this.gameHistory[this.gameHistory.length - 1];
  }

  public advanceState(newGameState: GameState) {
    const previousGameState = this.getCurrentGameState();
    console.debug(`*** Game step ${newGameState.getStateId()}: ${previousGameState.getPlayerTurn()} ${newGameState.getPreviousAction()}`);
    this.gameHistory.push(newGameState);
  }

  public getRules() {
    return [...this.rules];
  }

  public getPlayers() {
    return [...this.players];
  }

  public getGameActions(): Action[] {
    return [...this.actions];
  }

  public getEvents(): GameEvent[] {
    return this.events;
  }
}

export default Game;
