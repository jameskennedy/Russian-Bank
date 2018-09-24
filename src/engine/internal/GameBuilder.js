import Deck from '../objects/Deck';
import Card from '../objects/Card';

class GameBuilder {
  newUniqueGameId(activeGames) {
    for (let newId = 0; newId < 1000; newId += 1) {
      if (!activeGames.find(game => game.id === newId)) {
        return newId;
      }
    }
    throw new Error('Failed to assign a unique game id');
  }

  createStandardCardDeck() {
    const cards = [];
    for (let i = 1; i <= 13; i += 1) {
      cards.push(new Card(i, Card.SUITS.HEARTS));
      cards.push(new Card(i, Card.SUITS.SPADES));
      cards.push(new Card(i, Card.SUITS.DIAMONDS));
      cards.push(new Card(i, Card.SUITS.CLUBS));
    }
    const deck = new Deck('deck', Deck.DeckMode.FAN_UP, cards);
    deck.shuffle();
    return deck;
  }
}

export default GameBuilder;
