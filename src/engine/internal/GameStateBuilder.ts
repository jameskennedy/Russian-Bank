import Deck from '../objects/Deck';
import GameState from '../objects/GameState';


class GameStateBuilder {
  public createInitialState(gameId: number, decks: Deck[]): GameState {
    return new GameState(gameId, 0, decks);
  }

  public copyGameState(sourceState: GameState): GameState {
    const id = sourceState.getStateId() + 1;
    const oldNewMap = sourceState.getDecks().reduce((map, oldDeck) => {
      map.set(oldDeck.getName(), oldDeck.createCopy());
      return map;
    }, new Map<string, Deck>());

    const decks = Array.from(oldNewMap.values());
    sourceState.getDecks().forEach(deck => {
      if (deck.getStackdOnDeck()) {
        const oldFlipToDeck = deck.getStackdOnDeck()!;
        const newDeck = oldNewMap.get(deck.getName());
        if (newDeck) {
          const newFlipToDeck = oldNewMap.get(oldFlipToDeck.getName());
          newDeck.setStackdOnDeck(newFlipToDeck);
        }
      }
    });
    return new GameState(sourceState.gameId, id, decks);
  }
}

export default GameStateBuilder;
