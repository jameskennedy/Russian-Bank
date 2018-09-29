import Deck from '../objects/Deck';
import GameState from '../objects/GameState';


class GameStateBuilder {
  public createInitialState(gameId: number, decks: Deck[]): GameState {
    return new GameState(gameId, 0, decks);
  }

  public copyGameState(sourceState: GameState): GameState {
    const id = sourceState.getStateId() + 1;
    const decks = sourceState.getDecks().map((d: Deck) => d.createCopy());
    return new GameState(sourceState.gameId, id, decks);
  }
}

export default GameStateBuilder;
