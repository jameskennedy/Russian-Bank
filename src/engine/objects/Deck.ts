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
  private positionX: number;
  private positionY: number;
  constructor(private name: string, private mode: DeckMode, private cards: Card[], private acceptsNewCards?: boolean) {
    this.setDeckMode(mode);
  }

  public getName(): string {
    return this.name;
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public getCard(cardName?: string): Card | undefined {
    return cardName ? this.getCards().find(c => c.getName() === cardName) : undefined;
  }

  public getMovableCards(): Card[] {
    if (this.isEmpty() || this.isSpreadDeck()) {
      return this.getCards();
    }
    return [this.getTopCard()];
  }


  public getCardsToMoveWith(sourceCard: Card): Card[] {
    if (this.isSpreadDeck()) {
      const index = this.cards.indexOf(sourceCard);
      return index === undefined ? [] : this.cards.slice(index);
    }
    return [sourceCard];
  }

  public removeCards(cards: Card[]) {
    this.cards = this.cards.filter(c => !cards.find(r => r === c));
  }

  public hasCard(cardName: string | undefined): boolean {
    return !!cardName && !!this.getCards().find(c => c.getName() === cardName);
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
  public getStackedOnDeck() {
    return this.stackedOnDeck;
  }

  public setStackedOnDeck(stackedOnDeck: Deck) {
    this.stackedOnDeck = stackedOnDeck;
    this.setPosition(stackedOnDeck.getPositionX(), stackedOnDeck.getPositionY());
  }

  public createCopy() {
    const deck = new Deck(this.name, this.mode, this.cards.map(c => c.createCopy()), this.acceptsNewCards);
    deck.setPosition(this.getPositionX(), this.getPositionY());
    return deck;
  }

  public setPosition(x: number, y: number) {
    this.positionX = x;
    this.positionY = y;
  }

  public getPositionX() {
    return this.positionX;
  }

  public getPositionY() {
    return this.positionY;
  }

  public toString() {
    return `${this.name} deck`;
  }

  private isSpreadDeck(): boolean {
    return this.mode === DeckMode.SPREAD_DOWN || this.mode === DeckMode.SPREAD_LEFT || this.mode === DeckMode.SPREAD_RIGHT;
  }
}

export default Deck;
