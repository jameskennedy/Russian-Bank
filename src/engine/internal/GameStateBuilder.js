import assert from 'assert-js';
import GameState from '../objects/GameState';

class GameStateBuilder {
  createInitialState(gameId, decks) {
    return new GameState(gameId, 0, decks);
  }

  copyGameState(sourceState) {
    assert.instanceOf(sourceState, GameState);
    const id = sourceState.id + 1;
    const decks = sourceState.getDecks().map(d => d.deepClone());
    return new GameState(sourceState.gameId, id, decks);
  }
}

export default GameStateBuilder;
