import GameState from "../objects/GameState";

interface IGameEvent {
  beforeAction(gameState: GameState): void;
  afterAction(gameState: GameState): void;
}

export default IGameEvent;
