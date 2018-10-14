import Deck from "../objects/Deck";
import GameState, { GameStatus } from "../objects/GameState";
import IGameEvent from "./GameEvent";

class NoCardsLeftCondition implements IGameEvent {
  public beforeAction(gameState: GameState): void {
    // do nothing
  }

  public afterAction(gameState: GameState): void {
    const playerDecks = this.getDecksOwnedByCurrentPlayer(gameState);
    if (playerDecks.map(d => d.isEmpty()).reduce((a, b) => a && b, playerDecks.length > 0)) {
      gameState.setStatus(GameStatus.FINISHED);
      gameState.setStatusMessage(`${gameState.getPlayerTurn().getName()} wins!`);
    }
  }

  private getDecksOwnedByCurrentPlayer(gameState: GameState): Deck[] {
    return gameState.getDecks().filter(d => d.getOwner() && d.getOwner().getName() === gameState.getPlayerTurn().getName()); // TODO
  }

}

export default NoCardsLeftCondition;
