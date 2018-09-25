class GameState {
  constructor(gameId, id, decks) {
    this.gameId = gameId;
    this.id = id;
    this.decks = decks.slice();
  }

  getGameId() {
    return this.gameId;
  }

  getDecks() {
    return this.decks;
  }

  getDeck(name) {
    const deck = this.decks.find(d => d.name === name);
    if (!deck) {
      throw new Error(`Deck ${name} not found`);
    }
    return deck;
  }
}

export default GameState;
