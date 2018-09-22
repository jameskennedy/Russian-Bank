import Card from '../Card';

describe('Card', () => {
  test('verifies rank', () => {
    expect(() => new Card('non-numeric', Card.SUITS.HEARTS)).toThrowError();
    expect(() => new Card(0, Card.SUITS.HEARTS)).toThrowError();
    expect(() => new Card(14, Card.SUITS.HEARTS)).toThrowError();
  });

  test('verifies suit', () => {
    expect(() => new Card(1, 'hearts')).toThrowError();
    expect(() => new Card(13, null)).toThrowError();
  });

  test('is face-down by default', () => {
    expect(new Card(1, Card.SUITS.HEARTS).isFaceUp()).toBe(false);
  });

  test('can be face-up', () => {
    expect(new Card(1, Card.SUITS.HEARTS,true ).isFaceUp()).toBe(true);
  });

  test('has string representation', () => {
    expect(new Card(1, Card.SUITS.HEARTS).toString()).toEqual('A ♥');
    expect(new Card(11, Card.SUITS.SPADES).toString()).toEqual('J ♠');
    expect(new Card(12, Card.SUITS.CLUBS).toString()).toEqual('Q ♣');
    expect(new Card(13, Card.SUITS.DIAMONDS).toString()).toEqual('K ♦');
    expect(new Card(2, Card.SUITS.DIAMONDS).toString()).toEqual('2 ♦');
  });
});
