import assert from 'assert-js';
import GameState from './objects/GameState';
import GameStateBuilder from './internal/GameStateBuilder';
import RuleEngine from './internal/RuleEngine';
import Move from './objects/actions/Move';

class GameService {
  constructor(game) {
    this.game = game;
    this.gameStateBuilder = new GameStateBuilder();
    this.ruleEngine = new RuleEngine();
  }

  getCopyOfCurrentGameState() {
    return this.gameStateBuilder.copyGameState(this.game.getCurrentGameState());
  }

  getLegalActions(gameState = this.game.getCurrentGameState()) {
    assert.instanceOf(gameState, GameState);
    const moves = [];
    const decks = gameState.getDecks();
    decks.forEach((sourceDeck) => {
      decks.forEach((targetDeck) => {
        if (sourceDeck !== targetDeck) {
          const move = new Move(sourceDeck.getName(), targetDeck.getName());
          if (this.ruleEngine.isLegal(move, gameState)) {
            moves.push(move);
          }
        }
      });
    });

    return moves;
  }

  executeMove(move) {
    assert.instanceOf(move, Move);
    assert.isTrue(this.ruleEngine.isLegal(move, this.game.getCurrentGameState()));
    const newState = this.getCopyOfCurrentGameState();
    move.execute(newState);
    this.game.advanceState(newState);
    return this.game.getCurrentGameState();
  }
}

export default GameService;
