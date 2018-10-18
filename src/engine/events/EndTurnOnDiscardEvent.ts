import Action from "../actions/Action";
import Move from "../actions/Move";
import TapDeck from "../actions/TapDeck";
import GameFactory from '../GameFactory';
import GameState from "../objects/GameState";
import IGameEvent from "./GameEvent";

class EndTurnOnDiscardEvent implements IGameEvent {
  constructor(private discardDeckName: string) {

  }
  public beforeAction(gameState: GameState, action: Action): void {
    // do nothing
  }

  public afterAction(gameState: GameState, action: Action): void {
    if (action instanceof Move) {
      const move = action as Move;
      const targetDeck = move.getTargetDeck(gameState);
      if (targetDeck.getName() === this.discardDeckName &&
        targetDeck.getOwner() === gameState.getPlayerTurn()) {
        const service = GameFactory.getGameService(gameState.gameId);
        service.endTurn(gameState);
      }
    }
    if (action instanceof TapDeck) {
      const tap = action as TapDeck;
      this.afterAction(gameState, tap.getTapAction());
    }
  }
}

export default EndTurnOnDiscardEvent;
