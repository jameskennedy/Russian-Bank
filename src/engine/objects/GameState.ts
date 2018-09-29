import Deck from "./Deck";

class GameState {
  constructor(public gameId: number, private id: number, private decks: Deck[]) {
    this.decks = decks.slice();
  }

  public getStateId() {
    return this.id;
  }

  public getGameId() {
    return this.gameId;
  }

  public getDecks() {
    return this.decks;
  }

  public getDeck(name: string) {
    const deck = this.decks.find(d => d.getName() === name);
    if (!deck) {
      throw new Error(`Deck ${name} not found`);
    }
    return deck;
  }
}

export default GameState;
