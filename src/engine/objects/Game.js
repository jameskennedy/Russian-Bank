import assert from 'assert-js';
import {
  List
} from 'immutable';
import GameState from './GameState';

class Game {
  constructor(gameId, players, initialState, rules) {
    assert.integer(gameId);
    assert.instanceOf(rules, List);
    assert.instanceOf(players, List);
    assert.instanceOf(initialState, GameState);
    this.gameId = gameId;
    this.players = players;
    this.rules = rules;
    this.gameHistory = [initialState];
    this.status = 'started';
  }

  getCurrentGameState() {
    return this.gameHistory[this.gameHistory.length - 1];
  }

  advanceState(newGameState) {
    assert.instanceOf(newGameState, GameState);
    this.gameHistory.push(newGameState);
  }
}

export default Game;
