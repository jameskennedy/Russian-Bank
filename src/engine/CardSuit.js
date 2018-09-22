
class CardSuit {
  constructor(name, symbol, color) {
    this.name = name;
    this.symbol = symbol;
    this.color = color;
  }

  getName() {
    return this.name;
  }

  toString() {
    return this.symbol;
  }
}


CardSuit.SPADES = new CardSuit('Spade', '♠', 'black');
CardSuit.HEARTS = new CardSuit('Heart', '♥', 'red');
CardSuit.DIAMONDS = new CardSuit('Diamond', '♦', 'black');
CardSuit.CLUBS = new CardSuit('Club', '♣', 'red');

export default CardSuit;
