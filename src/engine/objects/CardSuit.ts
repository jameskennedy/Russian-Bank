
class CardSuit {

  public static readonly SPADES = new CardSuit('Spade', '♠', 'black');
  public static readonly HEARTS = new CardSuit('Heart', '♥', 'red');
  public static readonly DIAMONDS = new CardSuit('Diamond', '♦', 'red');
  public static readonly CLUBS = new CardSuit('Club', '♣', 'black');

  constructor(private readonly name: string, private readonly symbol: string, private readonly color: string) {
  }


  public getName() {
    return this.name;
  }

  public getColor() {
    return this.color;
  }

  public toString() {
    return this.symbol;
  }
}




export default CardSuit;
