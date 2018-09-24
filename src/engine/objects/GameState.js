// import assert from 'assert-js';

class GameState {
  constructor(decks) {
    this.decks = decks.slice();
  }

  getDecks() {
    return this.decks;
  }
}

export default GameState;
