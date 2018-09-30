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

  public getDecksByStack(): Map<string, Deck> {
    return this.decks.reduce((map, deck) => {
      if (deck.getStackdOnDeck()) {
        map.set(deck.getStackdOnDeck()!.getName(), deck);
      }
      return map;
    }, new Map<string, Deck>());
  }

  public toString(): string {
    let decks = '';
    this.decks.forEach(deck => {
      decks += `${deck.getName()}: ${deck.getCards()} \n`;
    });
    return `Game state ${this.getStateId()}:\n${decks}`;
  }
}

export default GameState;
