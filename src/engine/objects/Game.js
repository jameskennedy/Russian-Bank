import assert from 'assert-js';
import { List } from 'immutable';
import GameState from './GameState';

class Game {
  constructor(id, players, initialState, rules) {
    assert.integer(id);
    assert.instanceOf(rules, List);
    assert.instanceOf(players, List);
    assert.instanceOf(initialState, GameState);
    this.gameId = id;
    this.players = players;
    this.rules = rules;
    this.gameHistory = [initialState];
    this.status = 'started';
  }

  getCurrentGameState() {
    return this.gameHistory[this.gameHistory.length - 1];
  }
}

export default Game;
