import assert from 'assert-js';

class DeckMode {
  constructor(name) {
    assert.toString(name);
    this.name = name;
  }
}

DeckMode.FACE_DOWN = new DeckMode('face-down');
DeckMode.FACE_UP = new DeckMode('face-up');
DeckMode.FAN_UP = new DeckMode('spread');

class Deck {
  constructor(name, mode, cards) {
    assert.string(name);
    if (cards) {
      assert.array(cards);
      this.cards = [...cards];
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

  getMode() {
    return this.mode;
  }

  setDeckMode(mode) {
    assert.instanceOf(mode, DeckMode);
    this.mode = mode;
    this.cards.forEach(card => card.setFaceUp(mode !== DeckMode.FACE_DOWN));
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  toString() {
    return `${this.name} deck`;
  }
}

Deck.DeckMode = DeckMode;

export default Deck;
