import assert from 'assert-js';

class DeckMode {
  constructor(name) {
    assert.toString(name);
    this.name = name;
  }
}

DeckMode.FACE_DOWN = new DeckMode('face-down');
DeckMode.FACE_UP = new DeckMode('face-up');
DeckMode.SPREAD = new DeckMode('spread');

class Deck {
  constructor(name, mode, cards) {
    assert.string(name);
    if (cards) {
      assert.array(cards);
      this.cards = cards;
    } else {
      this.cards = [];
    }
    this.name = name;
    this.setDeckMode(mode);
  }

  getCards() {
    return this.cards;
  }

  getTopCard() {
    return this.cards[this.cards.length - 1];
  }

  setDeckMode(mode) {
    assert.instanceOf(mode, DeckMode);
    this.mode = mode;
  }

  toString() {
    return `${this.name} Deck`;
  }
}

Deck.DeckMode = DeckMode;

export default Deck;
