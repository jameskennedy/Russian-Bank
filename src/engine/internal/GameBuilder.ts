import Card from '../objects/Card';
import CardSuit from '../objects/CardSuit';
import { Deck, DeckMode } from '../objects/Deck';
import Game from '../objects/Game';
import CannotMoveIfNotFaceUp from '../rules/common/CannotMoveIfNotFaceUpRule';
import NoActionOnCoveredDeck from '../rules/fundamental/NoActionOnCoveredDeckRule';
import Rule from '../rules/Rule';

class GameBuilder {
  public newUniqueGameId(activeGames: Game[]) {
    for (let newId = 0; newId < 1000; newId += 1) {
      if (!activeGames.find(game => game.getGameId() === newId)) {
        return newId;
      }
    }
    throw new Error('Failed to assign a unique game id');
  }

  public createStandardCardDeck(name: string) {
    const cards = [];
    for (let i = 1; i <= 13; i += 1) {
      cards.push(new Card(i, CardSuit.HEARTS, false));
      cards.push(new Card(i, CardSuit.SPADES, false));
      cards.push(new Card(i, CardSuit.DIAMONDS, false));
      cards.push(new Card(i, CardSuit.CLUBS, false));
    }
    const deck = new Deck(name, DeckMode.FACE_DOWN, cards);
    deck.shuffle();
    return deck;
  }

  public createDiscardDeck(name: string) {
    return new Deck(name, DeckMode.FACE_UP, [], true);
  }

  public createHandDeck(name: string) {
    return new Deck(name, DeckMode.FAN_UP, [], true);
  }

  public createTopCardDeck(name: string, stackedOn: Deck): any {
    const deck = new Deck(name, DeckMode.FACE_UP, [], true);
    deck.setStackdOnDeck(stackedOn);
    return deck;
  }


  public createStandardRules(): Rule[] {
    return [new CannotMoveIfNotFaceUp(), new NoActionOnCoveredDeck()];
  }
}

export default GameBuilder;
