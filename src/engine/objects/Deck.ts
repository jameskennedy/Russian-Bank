import Card from './Card';

export enum DeckMode {
  FACE_DOWN = 'face-down',
  FACE_UP = 'face-up',
  FAN_UP = 'fan-up',
  SPREAD_RIGHT = 'face-up-spread-right',
  SPREAD_LEFT = 'face-up-spread-left'
}

export class Deck {
  private acceptsNewCards: boolean = false;
  constructor(private name: string, private mode: DeckMode, private cards: Card[]) {
    if (cards) {
      this.cards = [...cards];
    } else {
      this.cards = [];
    }
    this.setDeckMode(mode);
  }

  public getName() {
    return this.name;
  }

  public getCards() {
    return this.cards;
  }

  public getTopCard() {
    return this.cards[this.cards.length - 1];
  }

  public getMode() {
    return this.mode;
  }

  public setDeckMode(mode: DeckMode) {
    this.mode = mode;
    this.cards.forEach(card => card.setFaceUp(mode !== DeckMode.FACE_DOWN));
  }

  public pushCard(card: Card) {
    if (!this.acceptsNewCards) {
      throw new Error(`Illegal attempt to add card to ${this}`);
    }
    this.cards.push(card);
  }

  public popCard() {
    return this.cards.pop();
  }

  public shuffle() {
    for (let i = this.cards.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  public createCopy() {
    return new Deck(this.name, this.mode, this.cards.map(c => c.createCopy()));
  }

  public toString() {
    return `${this.name} deck`;
  }
}

export default Deck;
