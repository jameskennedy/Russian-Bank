
import CardSuit from './CardSuit';

const RANK_MAP = {
  1: 'A',
  10: '➉',
  11: 'J',
  12: 'Q',
  13: 'K'
};

class Card {
  constructor(private rank: number, private suit: CardSuit, private faceUp: boolean = false) {
    if (rank < 1 || rank > 13) {
      throw new Error(`Invalid card value ${rank}`);
    }
  }

  public getName() {
    return `${this.getRankChar()}${this.suit.toString()}`;
  }

  public setFaceUp(faceUp: boolean) {
    this.faceUp = faceUp;
  }

  public isFaceUp() {
    return this.faceUp;
  }

  public getRank() {
    return this.rank;
  }

  public getRankChar() {
    const char = RANK_MAP[this.rank];
    if (char) {
      return char;
    }
    return this.rank.toString();
  }

  public getSuit() {
    return this.suit;
  }

  public createCopy() {
    return new Card(this.rank, this.suit, this.faceUp);
  }

  public toString() {
    return this.getName();
  }
}

export default Card;
