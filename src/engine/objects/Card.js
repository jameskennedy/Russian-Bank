import assert from 'assert-js';
import CardSuit from './CardSuit';

const RANK_MAP = {
  1: 'A',
  10: '➉',
  11: 'J',
  12: 'Q',
  13: 'K'
};

class Card {
  constructor(rank, suit, faceUp) {
    assert.instanceOf(suit, CardSuit);
    assert.integer(rank);
    assert.greaterThanOrEqual(1, rank);
    assert.lessThanOrEqual(13, rank);
    if (faceUp) {
      assert.boolean(faceUp);
    }
    this.rank = rank;
    this.suit = suit;
    this.faceUp = !!faceUp;
  }

  setFaceUp(faceUp) {
    assert.boolean(faceUp);
    this.faceUp = faceUp;
  }

  isFaceUp() {
    return this.faceUp;
  }

  getRank() {
    return this.rank;
  }

  getRankChar() {
    const char = RANK_MAP[this.rank];
    if (char) {
      return char;
    }
    return this.rank.toString();
  }

  getSuit() {
    return this.suit;
  }

  deepClone() {
    return new Card(this.rank, this.suit, this.faceUp);
  }

  toString() {
    return `${this.getRankChar()} ${this.suit.toString()}`;
  }
}

Card.SUITS = CardSuit;


export default Card;
