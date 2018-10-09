import GameFactory from "../GameFactory";
import GameState from "../objects/GameState";
import IGameEvent from "./GameEvent";

class SingleActionTurnEvent implements IGameEvent {
  public beforeAction(gameState: GameState): void {
    // do nothing
  }

  public afterAction(gameState: GameState): void {
    const service = GameFactory.getGameService(gameState.gameId);
    const players = service.getPlayers();
    const index = players.findIndex(p => p === gameState.getPlayerTurn());
    const nextPlayer = players[(index + 1) % players.length];
    gameState.setPlayerTurn(nextPlayer);
  }

}

export default SingleActionTurnEvent;
