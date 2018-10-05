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
      if (deck.getStackedOnDeck()) {
        map.set(deck.getStackedOnDeck()!.getName(), deck);
      }
      return map;
    }, new Map<string, Deck>());
  }

  public createCopy(): GameState {
    const id = this.getStateId() + 1;
    const oldNewMap = this.getDecks().reduce((map, oldDeck) => {
      map.set(oldDeck.getName(), oldDeck.createCopy());
      return map;
    }, new Map<string, Deck>());

    const decks = Array.from(oldNewMap.values());
    this.copyDeckReferences(oldNewMap);
    return new GameState(this.gameId, id, decks);
  }

  public toString(): string {
    let decks = '';
    this.decks.forEach(deck => {
      decks += `${deck.getName()}: ${deck.getCards()} \n`;
    });
    return `Game state ${this.getStateId()}:\n${decks}`;
  }

  private copyDeckReferences(oldNewMap: Map<string, Deck>) {
    this.getDecks().forEach(deck => {
      if (deck.getStackedOnDeck()) {
        const oldFlipToDeck = deck.getStackedOnDeck()!;
        const newDeck = oldNewMap.get(deck.getName());
        if (newDeck) {
          const newFlipToDeck = oldNewMap.get(oldFlipToDeck.getName());
          if (newFlipToDeck) {
            newDeck.setStackedOnDeck(newFlipToDeck);
          }
        }
      }
    });
  }
}

export default GameState;
