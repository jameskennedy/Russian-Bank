import Card from './Card';

export enum DeckMode {
  FACE_DOWN = 'face-down',
  FACE_UP = 'face-up',
  FAN_UP = 'fan-up',
  SPREAD_RIGHT = 'face-up-spread-right',
  SPREAD_LEFT = 'face-up-spread-left',
  SPREAD_DOWN = 'face-up-spread-down'
}

export class Deck {
  private stackedOnDeck?: Deck;
  constructor(private name: string, private mode: DeckMode, private cards: Card[], private acceptsNewCards?: boolean) {
    this.setDeckMode(mode);
  }


  public getName() {
    return this.name;
  }

  public getCards() {
    return this.cards;
  }

  public isEmpty(): boolean {
    return this.cards.length === 0;
  }

  public isAcceptingNewCards(): boolean {
    return Boolean(this.acceptsNewCards);
  }

  public getTopCard() {
    return this.cards[this.cards.length - 1];
  }

  public getMode() {
    return this.mode;
  }

  public setDeckMode(mode: DeckMode) {
    this.mode = mode;
    this.cards.forEach(card => card.setFaceUp(this.isFaceUp()));
  }

  public isFaceUp() {
    return this.mode !== DeckMode.FACE_DOWN;
  }

  public pushCard(card: Card) {
    if (!this.acceptsNewCards) {
      throw new Error(`Illegal attempt to add card to ${this}`);
    }
    this.cards.push(card);
    card.setFaceUp(this.isFaceUp())
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
  public getStackdOnDeck() {
    return this.stackedOnDeck;
  }

  public setStackdOnDeck(stackedOnDeck?: Deck) {
    this.stackedOnDeck = stackedOnDeck;
  }

  public createCopy() {
    return new Deck(this.name, this.mode, this.cards.map(c => c.createCopy()), this.acceptsNewCards);
  }

  public toString() {
    return `${this.name} deck`;
  }
}

export default Deck;
