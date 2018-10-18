import GameFactory from "../GameFactory";
import GameState from "../objects/GameState";
import IGameEvent from "./GameEvent";

class SingleActionTurnEvent implements IGameEvent {
  public beforeAction(gameState: GameState): void {
    // do nothing
  }

  public afterAction(gameState: GameState): void {
    const service = GameFactory.getGameService(gameState.gameId);
    service.endTurn(gameState);
  }

}

export default SingleActionTurnEvent;
