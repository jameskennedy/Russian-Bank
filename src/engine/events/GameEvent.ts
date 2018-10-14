import Action from "../actions/Action";
import GameState from "../objects/GameState";

interface IGameEvent {
  beforeAction(gameState: GameState, action: Action): void;
  afterAction(gameState: GameState, action: Action): void;
}

export default IGameEvent;
